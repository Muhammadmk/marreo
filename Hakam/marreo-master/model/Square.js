Square = function(tile) {
    _.extend(this, tile);
};

Square.prototype.setSize = function(height, width) {
    check(height, Match.Integer);
    check(width, Match.Integer);

    if (height > 0 && width > 0) {
        Squares.update(this._id, {
            $set: {
                height: height,
                width: width
            }
        });
    } else {
        console.warn("Invalid size in Square.setSize");
    }
}
Square.prototype.setText = function(text) {
    this.text = text;
    this.data = {
        value: Action.resolveLinks(text, this.link)
    }

    Squares.update(this._id, {
        $set: {
            text: this.text,
            intent: null,
            command: null,
            data: this.data,
            view: 'text'
        }
    });


    this.propagate();
};

Square.prototype.toIntent = function(text) {
    var query = text || this.text;
    query = Action.resolveLinks(query, this.link);

    // var localIntentMap = {
    //     'static map': 'static_map',
    // };
    // } else if (_.contains(_.keys(localIntentMap), query)) {
    //     this.setCommand(this.toCommand(localIntentMap[query]));

    if (query[0] == "=") {
        this.setIntent("evaluate");
    } else if (mx.regexp.url.test(query)) {
        this.setData({
            params: {
                url: query
            }
        });

        this.setView("embed", 3, 4);
    } else {
        // var array = query.trim().split(' ');
        var widget = _.find(Widgets, function(d) {
            return _.contains(d.names, query)
        });

        if (widget) {
            // var view = array.shift();
            this.setData({
                // params: array
            });
            this.setView(widget.view, widget.height, widget.width);

        } else {
            // local match
            var that = this;
            var promises = [];

            promises[0] = new Promise(function(resolve, reject) {
                //Ask wit.ai
                var request = URI(API.wit.endpoint).query({
                    q: query
                }).toString();

                Meteor.call('proxy', request.toString(), {
                    headers: {
                        'Authorization': 'Bearer ' + API.wit.token
                    }
                }, function(error, result) {
                    if (!_.isEmpty(result.data.outcomes)) {
                        resolve(result.data.outcomes);
                    } else {
                        console.log("No wit result");
                    }
                });
            });

            Promise.all(promises).then(function(results) {
                var wit = results[0][0];
                console.log(wit);
                that.setIntent(wit.intent, wit.entities);
            }, function() {
                console.warn("unresolved promises");
            });
        }
    }
};

Square.prototype.setIntent = function(intent, entities) {
    this.intent = intent;
    Squares.update(this._id, {
        $set: {
            intent: intent,
            command: null,
            data: null,
            view: null
        }
    });

    if (intent == "evaluate") {
        this.setCommand(this.text);
    } else {
        this.setCommand(this.toCommand(this.intent));
        this.setData(entities);
    }
};

Square.prototype.toCommand = function(intent) {
    var query = '!' + intent;
    return query;
};

Square.prototype.setCommand = function(command) {
    this.command = command;
    Squares.update(this._id, {
        $set: {
            command: command
        }
    });

    this.setData(this.evaluate());
    this.setView("text", 1, 2);
    this.propagate();
};

Square.prototype.setData = function(data) {
    this.data = data;
    Squares.update(this._id, {
        $set: {
            data: this.data
        }
    });
};

// Square.prototype.toData = function(command) {
//     command = command || this.command;
//     return Action.evaluate(command, this);
// };

Square.prototype.evaluate = function(externalData) {
    if (this.command) {
        command = Action.resolveLinks(this.command, this.link);
        if (command[0] == '!') {
            var fn = Formula[command.substring(1)];
            if (typeof fn == "function") {
                return {
                    value: _.bind(fn, this, this.data, externalData)()
                };
            } else {
                console.warn('Intent not found', command);
                this.setView(command.substring(1).trim());
            }
        } else if (command[0] == '=') {
            var fun = command.substring(1).replace(/(\w+\()/g, function(v) {
                return "Formula." + v.toUpperCase();
            });

            console.log(fun);
            var result = eval(fun);
            if (result !== null || result !== undefined) {
                return {
                    value: result
                };
            }
        }
    }
}

Square.prototype.toView = function() {
    var result;

    // if (this.command) {
    //     result = this.evaluate(this.dataLinks());
    // }

    // if (result) {
    //     switch (typeof result) {
    //         case "string":
    //             return result;
    //         case "number":
    //             if (result > 0) {
    //                 return '<span style="color:#80ff00">' + result + '</span>';
    //             } else {
    //                 return '<span style="color:#ff0000">' + result + '</span>';
    //             }
    //             break;
    //         default:
    //             return JSON.stringify(result, null, 2);
    //     }
    // } else {
    //     //Fallback
    //     if (this.data) {
    //         return this.data.value;
    //     } else if (this.command) {
    //         this.command;
    //     } else if (this.intent) {
    //         return this.intent;
    //     } else if (this.text) {
    //         return this.text;
    //     } else {
    //         return null;
    //     }
    // }
};

Square.prototype.setView = function(view, height, width) {
    this.view = view;
    var changes = {}

    // check(height, Match.Integer);
    // check(width, Match.Integer);

    if (view) changes.view = view;
    if (height) changes.height = height;
    if (width) changes.width = width;

    Squares.update(this._id, {
        $set: changes
    }, function() {
        Session.set('current', Squares.findOne(this._id));
    });
};

Square.prototype.dataLinks = function() {
    var linkArray = _.map(this.link, function(link) {
        var source = Squares.findOne(link);
        return source.data;
    });
    return linkArray;
};

Square.prototype.propagate = function() {
    //Propagate changes
    Squares.find({
        link: this._id
    }).forEach(function(tile) {
        tile.refresh();
    });
};

Square.prototype.refresh = function() {
    console.log('refreshing ', this._id)
    if (this.command) {
        this.data = this.evaluate();
    } else {
        this.data = {
            value: Action.resolveLinks(this.text, this.link)
        }
    }

    this.setData(this.data);
    this.propagate();
}

Square.prototype.enhance = Square.prototype.toIntent;
