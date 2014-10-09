Template.popups.results = function() {
    return Session.get("results");
};

Template.popups.events({
    "keyup #command": function(e) {
        var input = e.target.value;
        Action.getRecommendation(input);
    },
    'click paper-item': function(e) {
        $("#command").val(this.example).focus();
        Session.set("results", []);
    },
    'change #webservice-url': function(e) {
        var url = Action.resolveLinks(e.target.value, mx.current.link);

        if (url.match('^http')) {
            var proxy = document.querySelector('#webservice-proxy').checked;

            if (proxy) {
                Meteor.call('proxy', url, function(error, response) {
                    Session.set('webservice-response', response.data);
                    if (response.data) {
                        document.querySelector('#webservice-mirror').value = JSON.stringify(response.data, 2, 2);
                    } else {
                        document.querySelector('#webservice-mirror').value = 'Loading...';
                    }
                });
            }
        } else {
            Session.set('webservice-response', '');
            Session.set('webservice-preview', '');
        }
    },
    'change #webservice-path': function(e) {
        var response = Session.get('webservice-response');
        var path = Action.resolveLinks(e.target.value, mx.current.link);

        if (response) {
            var newValue = _(response).valueForKeyPath(path, Random.id());
            if (newValue) {
                document.querySelector('#webservice-mirror').value = JSON.stringify(newValue, 2, 2);
            }
        }
    },
    'click #webservice-editor>[affirmative]': function() {
        var url = document.querySelector('#webservice-url').value;
        var path = document.querySelector('#webservice-path').value;
        var proxy = document.querySelector('#webservice-proxy').checked;
        var refresh = document.querySelector('#webservice-refresh').value;

        var webservice = {
            type: 'webservice',
            url: url,
            path: path,
            refresh: refresh,
            proxy: proxy,
            result: null
        };

        var id = mx.current._id;

        url = Action.resolveLinks(url, mx.current.link);
        path = Action.resolveLinks(path, mx.current.link);

        var callback = function() {
            mx.current.data = webservice;

            if (proxy) {
                Meteor.call('proxy', url, function(error, response) {
                    Squares.update(id, {
                        $set: {
                            text: 'webservice',
                            value: _(response.data).valueForKeyPath(webservice.path)
                        }
                    });
                });
            } else {
                $.getJSON(url, function(response) {
                    Squares.update(id, {
                        $set: {
                            text: 'webservice',
                            value: _(response).valueForKeyPath(webservice.path)
                        }
                    });
                });
            }
        };

        Squares.update(mx.current._id, {
            $set: {
                data: webservice
            }
        }, callback);

        var interval;
        // Meteor.clearInterval(interval);
        if (refresh > 0) {
            interval = Meteor.setInterval(callback, (refresh * 60 * 1000));
        }
    },
    'click #webservice-editor>[dismissive]': function() {
        return;
    },
    'click #css-editor>[affirmative]': function() {
        Squares.update(mx.current._id, {
            $set: {
                style: document.querySelector('#css-mirror').getValue()
            }
        });
    },
    'click #embed-editor>[affirmative]': function() {
        Squares.update(mx.current._id, {
            $set: {
                value: document.querySelector('#embed-mirror').getValue()
            }
        });
    },
    'click #function-editor>[affirmative]': function() {
        var statements = document.querySelector('#function-mirror').getValue();

        if (!statements) {
            return;
        }

        try {
            var fn = new Function(['$', 'link'], statements);
            mx.current.fn = statements;
            Squares.update(mx.current._id, {
                $set: {
                    fn: statements
                }
            }, function() {
                mx.current.refresh();
            });

        } catch (error) {
            document.querySelector('#toast').text = error.message;
            document.querySelector('#toast').show();
        }
    }
});
