Action = {
    //System Actions
    login: function() {
        Meteor.loginWithFacebook({
            requestPermissions: [
                'user_events',
                'user_friends'
            ]
        }, function(err) {
            if (err) console.log(err);
            else console.log('Logged in!');
        });
    },
    logout: function() {
        Meteor.logout();
    },
    trySubscribe: function(error) {
        var password = null;

        if (error) {
            console.error(error);
            bootbox.prompt('Password', function(p) {
                if (p === null) {
                    bootbox.alert('Unable to view canvas because it is secured by a canvas password.');
                    return;
                } else {
                    password = p;

                    Meteor.subscribe('canvas', Session.get('canvasId'), password, {
                        onError: Action.trySubscribe,
                        onReady: Action.subscribeReady
                    });
                }
            });
        } else {

            Meteor.subscribe('canvas', Session.get('canvasId'), password, {
                onError: Action.trySubscribe,
                onReady: Action.subscribeReady
            });
        }
    },
    subscribeReady: function() {
        Squares.find({
            selected: true
        }).forEach(function(tile) {
            Squares.update(tile._id, {
                $set: {
                    selected: false
                }
            });
        });
    },

    //Canvas Actions
    test_spawn: function(n) {
        _.times(n, function(i) {
            Action.spawn(mx.current, {
                x: 1,
                y: i
            }, {
                height: 1,
                width: 3
            }, {
                type: "string",
                value: "OS X 10." + i + 5
            });
        });
    },
    spawn: function(current, offset, size, data, view) {
        current = Action.get(current);

        var tile = {};

        //Default values for offset
        if (!offset || offset.x === 0 && offset.y === 0) {
            offset = {
                x: 0,
                y: current.height
            };
        }

        //Default values for size
        if (!size) {
            size = {
                height: current.height,
                width: current.width
            };
        }

        tile.x = current.x + offset.x;
        tile.y = current.y + offset.y;
        tile.height = (size.height > 0) ? size.height : 1;
        tile.width = (size.height > 0) ? size.width : 1;
        tile.link = [current._id];
        tile.data = data;
        tile.view = view;

        Action.materialize(tile);
    },
    materialize: function(tile) {
        var newSquare = {
            x: tile.x,
            y: tile.y,
            z: 0,

            height: tile.height || 1,
            width: tile.width || 1,
            link: tile.link || [],

            text: tile.text || null,
            intent: tile.intent || null,
            command: tile.command || null,
            data: tile.data || null,
            view: tile.view || null,

            canvasId: Session.get('canvasId'),
            owner: Meteor.userId()
        };

        return Squares.insert(newSquare);
    },

    moveCursor: function(direction, shiftKey) {
        var newX = mx.current.x,
            newY = mx.current.y;

        if (!(direction == 'up' || direction == 'down' || direction == 'left' || direction == 'right')) {
            return;
        }

        switch (direction) {
            case 'up':
                newY--;
                break;
            case 'down':
                newY++;
                break;
            case 'left':
                newX--;
                break;
            case 'right':
                newX++;
                break;
        }

        var newSquare = Background.findOne({
            x: newX,
            y: newY
        });

        // var candidate, offset = 1,
        //     found = false;

        // if (!newSquare) {
        //     switch (direction) {
        //         case 'up':
        //             candidate = Squares.findOne({
        //                 x: mx.current.x,
        //                 y: {
        //                     $lt: mx.current.y
        //                 }
        //             }, {
        //                 sort: {
        //                     y: -1
        //                 }
        //             });

        //             //Edge Cases
        //             if (!candidate) {
        //                 candidate = {
        //                     x: mx.current.x,
        //                     y: -1
        //                 };
        //             }

        //             if (candidate && candidate.height == mx.current.y - candidate.y) {
        //                 newSquare = candidate;
        //             } else {
        //                 while (!found) {
        //                     c = Squares.findOne({
        //                         x: {
        //                             $lt: mx.current.x
        //                         },
        //                         y: candidate.y + offset
        //                     }, {
        //                         sort: {
        //                             x: -1
        //                         }
        //                     });

        //                     if (c && c.height == mx.current.y - c.y) {
        //                         found = true;
        //                         newSquare = c;
        //                     }

        //                     offset++;
        //                 }
        //             }

        //             break;
        //         case 'down':
        //             newSquare = Squares.findOne({
        //                 x: {
        //                     $lte: mx.current.x
        //                 },
        //                 y: mx.current.y + mx.current.height
        //             }, {
        //                 sort: {
        //                     x: -1
        //                 }
        //             });

        //             break;
        //         case 'left':
        //             candidate = Squares.findOne({
        //                 x: {
        //                     $lt: mx.current.x
        //                 },
        //                 y: mx.current.y
        //             }, {
        //                 sort: {
        //                     x: -1
        //                 }
        //             });

        //             //Edge Cases
        //             if (!candidate) {
        //                 candidate = {
        //                     x: -1,
        //                     y: mx.current.y
        //                 };
        //             }
        //             if (candidate.width == mx.current.x - candidate.x) {
        //                 newSquare = candidate;
        //             } else {
        //                 while (!found) {
        //                     c = Squares.findOne({
        //                         y: {
        //                             $lt: mx.current.y
        //                         },
        //                         x: candidate.x + offset
        //                     }, {
        //                         sort: {
        //                             y: -1
        //                         }
        //                     });

        //                     if (c && c.width == mx.current.x - c.x) {
        //                         found = true;
        //                         newSquare = c;
        //                     }

        //                     offset++;
        //                 }
        //             }
        //             break;

        //         case 'right':
        //             newSquare = Squares.findOne({
        //                 y: {
        //                     $lte: mx.current.y
        //                 },
        //                 x: mx.current.x + mx.current.width
        //             }, {
        //                 sort: {
        //                     y: -1
        //                 }
        //             });
        //             break;
        //     }
        // }

        if (newSquare) {
            if (shiftKey) {
                if (mx.state.startSelect === null) {
                    mx.state.startSelect = mx.current;
                }
                Action.multiselect(mx.state.startSelect, newSquare);
            } else {
                mx.state.startSelect = null;
            }

            //Set menu position to lower right
            Session.set('current', newSquare);
        } else {
            console.log("not found");
        }
    },
    startSelect: function() {
        mx.state.startSelect = mx.current;
    },
    deselect: function() {
        Squares.find({
            selected: true
        }).forEach(function(tile) {
            Squares.update(tile._id, {
                $set: {
                    selected: false
                }
            });
        });
    },
    multiselect: function(start, end) {
        var largerX, largerY, smallerX, smallerY;
        //What is the purpose of multi select?

        if (end.x > start.x) {
            largerX = end.x;
            smallerX = start.x;
        } else {
            smallerX = end.x;
            largerX = start.x;
        }

        if (end.y > start.y) {
            largerY = end.y;
            smallerY = start.y;
        } else {
            smallerY = end.y;
            largerY = start.y;
        }

        Action.deselect();

        Squares.find({
            x: {
                $gte: smallerX,
                $lte: largerX,
            },
            y: {
                $gte: smallerY,
                $lte: largerY,
            },
            selected: false
        }).forEach(function(tile) {
            Squares.update(tile._id, {
                $set: {
                    selected: true
                }
            });
        });
    },
    merge: function() {

        var toMerge = Squares.find({
            selected: true
        }, {
            sort: {
                x: 1,
                y: 2
            }
        }).fetch();

        var result = _.reduce(toMerge, function(memo, e) {
            //Memo [maxX, maxY, minX, minY]
            if (memo[0] === null || e.x > memo[0]) {
                memo[0] = e.x;
            }
            if (memo[1] === null || e.y > memo[1]) {
                memo[1] = e.y;
            }

            if (memo[2] === null || e.x < memo[2]) {
                memo[2] = e.x;
            }
            if (memo[3] === null || e.y < memo[3]) {
                memo[3] = e.y;
            }

            return memo;
        }, [null, null, null, null]);

        var width = result[0] - result[2] + 1;
        var height = result[1] - result[3] + 1;
        var newSquare;

        _.each(toMerge, function(square) {
            if (square.x == result[2] && square.y == result[3]) {
                square.height = height;
                square.width = width;
                square.selected = false;
                newSquare = square;

                Squares.update(square._id, newSquare);
            } else {
                Squares.remove(square._id);
            }
        });

        Session.set('current', newSquare);
    },
    split: function() {
        var height = mx.current.height;
        var width = mx.current.width;

        if (height > 1 || width > 1) {

            var x = mx.current.x
            var y = mx.current.y

            var id = mx.current._id;

            for (yoffset = 0; yoffset < height; yoffset++) {
                for (xoffset = 0; xoffset < width; xoffset++) {

                    if (xoffset == 0 && yoffset == 0) {
                        Squares.update(id, {
                            $set: {
                                height: 1,
                                width: 1
                            }
                        });
                    } else {
                        Squares.insert({
                            x: x + xoffset,
                            y: y + yoffset,
                            height: 1,
                            width: 1,
                            link: [],
                            selected: false,
                            canvasId: Session.get('canvasId')
                        });
                    }
                }
            }

            Session.set('current', Squares.findOne({
                x: x,
                y: y
            }));
        }
    },
    edit: function() {
        if ($('#popup').is(":hidden")) {
            $('#popup').show();
            Session.set("results", []);
            $('#command').val(mx.current.text || mx.current.command).focus();
        } else {
            $('#popup').hide();
            $('#command').val('');
        }
    },
    moveResultSelection: function(direction) {
        $('#command').blur();
        var results = Session.get("results");
        var newTarget;
        for (var i = 0; i < results.length; i++) {
            if (results[i].selected === true) {
                if (direction == "up") {
                    newTarget = results[i - 1];
                    if (newTarget) {
                        results[i].selected = false; //Deselect
                        newTarget.selected = true; //Select new row
                    } else {
                        results[i].selected = false; //Deselect
                        $('#command').focus();
                    }
                } else if (direction == "down") {
                    newTarget = results[i + 1];
                    if (newTarget) {
                        results[i].selected = false; //Deselect
                        newTarget.selected = true; //Select new row
                    } else {
                        results[i].selected = false; //Deselect
                        results[0].selected = true; //Select new row
                    }
                }

                break; //No need to continue searching
            }
        }

        if (!newTarget) {
            results[0].selected = true;
        }

        Session.set("results", results);
    },
    copy: function() {
        mx.state.copy = _.pick(mx.current, 'text', 'intent', 'command', 'data', 'view', 'height', 'width', 'link');
    },
    paste: function() {
        if (mx.current.isTile) {
            mx.current = _.extend(mx.current, mx.state.copy);
            Action.materialize(mx.current);
        } else {
            Squares.update(mx.current._id, {
                $set: mx.state.copy
            }, function() {
                mx.current.refresh();
            });
        }
    },
    cut: function() {
        Action.copy();
        Action.delete(mx.current);
    },
    delete: function(tile) {
        tile = Action.get(tile);

        if (tile) {
            Squares.remove(tile._id, function() {
                tile.propagate();
                Session.set('current', null);
            });
        }

        //  else {
        //     var toDelete = Squares.find({
        //         selected: true
        //     });

        //     if (toDelete.count() > 1) {
        //         toDelete.forEach(Action.delete);
        //     } else if (mx.current.value !== null) {
        //         Action.delete(mx.current);
        //     } else {
        //         Action.split();
        //     }
        // }
    },
    deleteLink: function() {
        $('.arrow[selected=true]').each(function(index, element) {
            var source = element.getAttribute('source');
            var target = element.getAttribute('target');

            Squares.update(target, {
                $pull: {
                    link: source
                }
            }, function() {
                target.refresh();
            });
        });
    },
    escape: function() {
        Action.deselect();

        if (Session.get('edit')) {
            Action.editLinks();
        }

        if ($('#popup').is(":visible")) {
            $('#popup').hide();
            $('#command').val('');
            Session.set("results", []);
        }
    },


    editWebservice: function() {
        // var webservice = mx.current.webservice;

        // document.querySelector('#webservice-url').value = webservice ? webservice.url : "";
        // document.querySelector('#webservice-path').value = webservice ? webservice.path : "";
        // document.querySelector('#webservice-refresh').value = webservice ? webservice.refresh : "";
        document.querySelector('#webservice-editor').toggle();
    },
    editLinks: function() {
        if (Session.get('edit')) {
            $('.main-container .square').css('cursor', 'default');

            Squares.find({
                highlight: true
            }).forEach(function(tile) {
                Squares.update(tile._id, {
                    $set: {
                        highlight: false
                    }
                });
            });

            Session.set('edit', false);
        } else {
            $('.main-container .square').css('cursor', 'cell');

            Squares.find({
                _id: {
                    $in: mx.current.link
                }
            }).forEach(function(tile) {
                Squares.update(tile._id, {
                    $set: {
                        highlight: true
                    }
                });
            });

            Session.set('edit', true);
        }
    },
    editURL: function() {
        // bootbox.prompt({
        //     title: 'What is the URL to call?',
        //     inputType: 'text',
        //     instruction: $('<div class="well">If this URL points to a standard HTML page, the result will be wrapped in a $ object. You can then use the standard jQuery style CSS selector and traversal to extract the information you are interested in. If the URL points to a RESTful webservice endpoint, the JSON response will be wrapped in an object named as "data". <br><b>You can try these examples:</b><br><ul><li>map of singapore management university</li><li>http://www.youtube.com/watch?v=tqgO-SwnIEY</li><li>http://mozorg.cdn.mozilla.net/media/img/firefox/new/header-firefox.png</li></ul></div>'),
        //     value: mx.current.url,
        //     callback: function(input) {

        //         if (input == null) {
        //             return;
        //         }

        //         if (input.match(/^www/)) {
        //             input = 'http://' + input;
        //         }

        //         if (input.match(/^(http|https):\/\/[^"]+$/)) {
        //             if (input != mx.current.url) {
        //                 Squares.update(mx.current._id, {
        //                     $set: {
        //                         url: input
        //                     }
        //                 }, function() {
        //                     mx.current.url = input;
        //                     Action.refresh(mx.current);
        //                 });
        //             }
        //         } else {
        //             bootbox.alert('Invalid URL');
        //         }
        //     }
        // });
    },
    editFunction: function() {
        // document.querySelector('#function-editor').toggle();
        // _.defer(function() {
        //     document.querySelector('#function-mirror').value = mx.current.fn || "";
        //     document.querySelector('#function-mirror').valueChanged();
        // });

        // bootbox.prompt({
        //  title: 'Attach a Javascript Function',
        //  inputType: 'function',
        //  mode: 'javascript',
        //  instruction: $('<b>Objects available: </b><br><ul><li>$: jQuery Object</li><li>link: javascript array of linked cells</li><li>data: JSON response from webservice</li></ul>'),
        //  value: mx.current.fn || "return null;",
        //  callback: function(statements) {
        //      if (statements == null) {
        //          return;
        //      }

        //      try {
        //          var fn = new Function(['$', 'link'], statements);

        //          Squares.update(mx.current._id, {
        //              $set: {
        //                  fn: statements
        //              }
        //          }, function() {
        //              Action.valueChanged(mx.current);
        //          });

        //      } catch (error) {
        //          bootbox.alert(error.message);
        //      }
        //  }
        // });
    },
    editStyle: function() {
        document.querySelector('#css-editor').toggle();
        _.defer(function() {
            document.querySelector('#css-mirror').value = mx.current.style || "";
            document.querySelector('#css-mirror').valueChanged();
        });
    },
    editEmbed: function() {
        document.querySelector('#embed-editor').toggle();
        _.defer(function() {
            document.querySelector('#embed-mirror').value = mx.current.value || "";
            document.querySelector('#embed-mirror').valueChanged();
        });
    },

    //Utility Actions
    get: function(tile) {
        if (!tile) {
            return mx.current;
        } else if (Action.isID(tile)) {
            return Squares.findOne(tile);
        } else {
            return tile;
        }
    },
    isID: function(tile) {
        return (typeof tile == "string" && tile.length == 17);
    },
    isCycle: function() {
        return (Action.topologicalSort() === null);
    },
    findNextSquare: function(currentSquare, direction, offset) {
        if (offset === undefined) offset = 1;

        //Direction : up down left right
        switch (direction) {
            case 'up':
                return Squares.findOne({
                    x: currentSquare.x,
                    y: currentSquare.y - offset
                });

            case 'down':
                return Squares.findOne({
                    x: currentSquare.x,
                    y: currentSquare.y + offset
                });

            case 'left':
                return Squares.findOne({
                    x: currentSquare.x - offset,
                    y: currentSquare.y
                });

            case 'right':
                return Squares.findOne({
                    x: currentSquare.x + offset,
                    y: currentSquare.y
                });

            default:
                return Squares.findOne({
                    x: currentSquare.x,
                    y: currentSquare.y + offset
                });
        }
    },
    isCovered: function() {

    },
    emptyNeighbours: function() {
        return Squares.find({
            x: {
                $lte: mx.current.x + mx.current.width,
                $gte: mx.current.x - 1
            },
            y: {
                $lte: mx.current.y + mx.current.height,
                $gte: mx.current.y - 1
            }
        }).fetch();
    },
    resolveLinks: function(input, link) {
        //TODO Resolve Object Links
        if (typeof input == 'string' && input.match(/#[0-9]*/)) {

            var linkArray = _.map(link, function(link) {
                var source = Squares.findOne(link);
                return source.data.value || source.text;
            });

            _.each(input.match(/#[0-9]*/g), function(m) {
                var number = m.substring(1);
                if (number.length === 0) {
                    index = 0;
                } else {
                    index = parseInt(number) - 1;
                }

                if (!isNaN(index) &&
                    index >= 0 &&
                    index < linkArray.length &&
                    linkArray[index] !== null &&
                    linkArray[index] !== undefined) {

                    if (typeof linkArray[index] == "string") {
                        input = input.replace(m, linkArray[index]);
                    } else {
                        input = input.replace(m, JSON.stringify(linkArray[index]));
                    }
                }
            });
            return input;
        } else {
            return input;
        }
    },
    fillPartial: function(fn, input, link) {
        if (typeof fn == "function" && typeof input == 'string' && input.match(/#[0-9]*/)) {
            var linkArray = _.map(link, function(link) {
                var source = Squares.findOne(link);
                return source.data.value || source.text;
            });


            _.each(input.match(/#[0-9]*/g), function(m) {
                var number = m.substring(1);
                if (number.length === 0) {
                    index = 0;
                } else {
                    index = parseInt(number) - 1;
                }

                if (!isNaN(index) &&
                    index >= 0 &&
                    index < linkArray.length) {

                    fn = _.partial(fn, linkArray[index]);
                }
            });

            return fn;
        } else {
            console.warn("fillPartial Fails");
        }
    },
    topologicalSort: function() {
        // Algorithm Reference: http://en.wikipedia.org/wiki/Topological_sorting
        var m, n;
        var L = [];
        var T = Squares.find({
            'link.0': {
                $exists: true
            }
        }, {
            fields: {
                link: 1
            }
        }).fetch();

        var S = _.difference(
            _.unique(
                _.flatten(
                    _.pluck(T, 'link')
                )
            ),
            _.pluck(T, '_id')
        );

        var hasEdge = function(t) {
            return _.contains(t.link, n);
        };

        var removeEdge = function(t) {
            t.link = _.without(t.link, n);
            if (t.link.length === 0) {
                S.push(t._id);
            }
        };

        while (S.length > 0) {
            n = S.pop();
            L.push(n);

            m = _.filter(T, hasEdge);
            _.each(m, removeEdge);
        }

        if (_.flatten(_.pluck(T, 'link')).length > 0) {
            console.warn("Cycle Detected");
            return null;
        } else {
            return L;
        }
    },
    getRecommendation: function(input) {
        var key;
        console.time("recommendation");
        if (input[0] == "=") {
            key = input.substring(1);
            var results = _.map(
                _.first(
                    _.sortBy(_.filter(
                        _.keys(Formula),
                        function(d) {
                            return d.match(
                                new RegExp(
                                    RegExp.quote(key),
                                    "i"));
                        }
                    ), function(d) {
                        if (d.indexOf(key.toUpperCase()) === 0) {
                            return -1;
                        } else {
                            return d.charCodeAt(0);
                        }
                    }),
                    10
                ),
                function(d) {
                    return {
                        icon: "https://cdn1.iconfinder.com/data/icons/financial-data/100/Function-32.png",
                        example: "=" + d + "(#)"
                    };
                });

            Session.set("results", results);
            console.timeEnd("recommendation");
        } else if (input[0] == "!") {
            key = input.substring(1);
            var bangs = [{
                example: "background #1ABC9C",
                description: "customize the canvas background using hex color code."
            }, {
                example: "background http://subtlepatterns.com/patterns/restaurant.png",
                description: "customize the canvas background using a repeatable image tile."
            }, {
                example: "background white",
                description: "customize the canvas background using hex color code."
            }, {
                example: "clear",
                description: "Delete all tiles in the canvas"
            }, {
                example: "new canvas",
                description: "Create a new Canvas"
            }];

            var results = _.map(
                _.first(
                    _.sortBy(_.filter(bangs,
                        function(d) {
                            return d.example.match(
                                new RegExp(
                                    RegExp.quote(key),
                                    "i"));
                        }
                    ), function(d) {
                        if (d.example.match(
                            new RegExp(
                                '^' + RegExp.quote(key),
                                "i"))) {
                            return -1;
                        } else {
                            if (d.example == "=" || d.example == "!") return 100;
                            return d.example.charCodeAt(0);
                        }
                    }),
                    10
                ),
                function(d) {
                    d.example = "!" + d.example;

                    return _.defaults(d, {
                        icon: "/images/function-128.png",
                        description: "undocumented"
                    });
                });

            Session.set("results", results);
            console.timeEnd("recommendation");
        } else {
            key = input;
            var defaultRecommendation = [{
                example: "=<equation>",
                icon: "https://cdn1.iconfinder.com/data/icons/financial-data/100/Calculator_01-32.png",
                description: "Evaluate a equation or function using Excel syntax"
            }, {
                example: "!<action>",
                icon: "https://cdn0.iconfinder.com/data/icons/seo-smart-pack/128/grey_new_seo2-47-32.png",
                description: "Special actions and settings."
            }, {
                example: "people",
                icon: "https://cdn2.iconfinder.com/data/icons/seo-web-optomization-ultimate-set/512/market_research-32.png",
                description: "Search for people on the web."
            }, {
                example: "todo",
                icon: "https://cdn2.iconfinder.com/data/icons/business-office-icons/256/To-do_List-32.png",
                description: "Create a simply todo list to track your tasks."
            }, {
                example: "editor",
                icon: "https://cdn0.iconfinder.com/data/icons/line-file-type-icons/100/file_txt-32.png",
                description: "A rich text editor to quickly create documents."
            }, {
                example: "minecraft",
                description: "A realtime, multiplayer, minecraft like 3D environment."
            }, {
                example: "latex",
                description: "Quickly math typesetting using LaTeX."
            }];

            var results = _.map(
                _.first(
                    _.sortBy(_.filter(defaultRecommendation,
                        function(d) {
                            return d.example.match(
                                new RegExp(
                                    RegExp.quote(key),
                                    "i"));
                        }
                    ), function(d) {
                        if (d.example.match(
                            new RegExp(
                                '^' + RegExp.quote(key),
                                "i"))) {
                            return -1;
                        } else {
                            return d.example.charCodeAt(0);
                        }
                    }),
                    10
                ),
                function(d) {
                    return _.defaults(d, {
                        icon: "/images/function-128.png",
                        description: "undocumented"
                    });
                });

            Session.set("results", results);
            console.timeEnd("recommendation");
        }
    },

    resetCanvas: function() {
        var canvasId = Session.get('canvasId');
        if (canvasId) {
            Meteor.call('reset', canvasId);
        }
    },

    addStencil: function() {
        bootbox.prompt({
            title: 'Title for Stencil',
            inputType: 'text',
            callback: function(title) {
                if (title == null) return;
                var stencil = _.pick(mx.current, 'fn', 'value', 'style', 'url');
                stencil.title = title;

                Stencils.insert(stencil);
            }
        });
    },
    copyStencil: function() {
        mx.state.copy = _.pick(this, 'fn', 'value', 'style', 'url');
    },
    deleteStencil: function() {
        Stencils.remove(this._id);
    },

    //TODO think about how to reduce refresh
    // evaluate: function(command, data) {

    //     if (command[0] == "=") {
    //         try {
    //             return eval(command.substring(1).replace(/(\w+\()/g, function(v) {
    //                 return "Formula." + v.toUpperCase();
    //             }));
    //         } catch (error) {
    //             document.querySelector('#toast').text = "Syntax Error. Please check your formula.";
    //             document.querySelector('#toast').show();
    //             return null;
    //         }
    //     } else {
    //         return command(data);
    //     }
    // },
    checkOverlap: function(tile) {
        tile = Action.get(tile);
        if (tile) {
            var overlaps = Squares.find({
                $or: [{
                    x: {
                        $lt: tile.x,
                    },
                    y: {
                        $lt: tile.y + tile.height
                    },
                    $where: "this.height > " + tile.y + " - this.y && this.width > " + tile.x + " - this.x"
                }, {
                    y: {
                        $lt: tile.y,
                    },
                    x: {
                        $lt: tile.x + tile.width
                    },
                    $where: "this.height > " + tile.y + " - this.y && this.width > " + tile.x + " - this.x"
                }, {
                    x: {
                        $gte: tile.x,
                        $lt: tile.x + tile.width
                    },
                    y: {
                        $gte: tile.y,
                        $lt: tile.y + tile.height
                    },
                    _id: {
                        $ne: tile._id
                    }
                }]
            }).fetch();

            return overlaps;
        } else {
            return []
        }
    },
    resolveOverlap: function(anchor, pushes, verticalPush) {
        anchor = Action.get(anchor);
        if (anchor) {
            _.each(pushes, function(p) {
                p = Action.get(p);

                var push = {
                    x: 0,
                    y: 0
                }

                if (verticalPush) {
                    push.y = anchor.height - (p.y - anchor.y);
                } else {
                    push.x = anchor.width - (p.x - anchor.x);
                }

                Squares.update(p._id, {
                    $inc: push
                }, function() {
                    var newP = Squares.findOne(p._id);
                    Action.resolveOverlap(newP, Action.checkOverlap(newP))
                });
            });
        }
    },
    enhance: function(tile) {
        tile = Action.get(tile);
        tile.toIntent();
        console.warn("enhance Deprecate");
    },
    enrich: function(data) {
        if (data.location) {
            data.location = _.map(data.location, function(place) {
                if (!place.lat || !place.lon) {
                    console.log("TODO: Geocode location");
                }
            });
        }

        return data;
    },
    minesweep: function(target) {
        target = Action.get(target);

        _.each(Action.emptyNeighbours(), function(tile) {
            Squares.update(tile._id, {
                $set: {
                    value: target.value
                }
            });
        });
    },
    query: function(query) {
        console.count('query');
    },
    fetch: function(url) {
        Meteor.call('fetch', url, mx.current.fn, mx.current._id);
    }
};
