Background = new Meteor.Collection(null);
Squares = new Meteor.Collection('square', {
    transform: function(tile) {
        return new Square(tile);
    }
});

Canvases = new Meteor.Collection('canvas', {
    transform: function(canvas) {
        return new Canvas(canvas);
    }
});

// Stencils = new Meteor.Collection('stencil');


API = _.indexBy([{
    name: "wit",
    description: "A natural language interface to turn user commands into actionable data",
    provider: "Wit",
    docs: "https://wit.ai/docs/api",
    endpoint: "https://api.wit.ai/message",
    token: "IZ7P43BJT2YDKM4A6NWX5KGB7YHAJ225",
    account: {
        oauth: "github"
    }
}, {
    name: "pipl",
    description: "People search",
    docs: "http://dev.pipl.com/docs/search_api/",
    endpoint: "http://api.pipl.com/search/v3/json/",
    token: "qfwkyz49gvmc6ezzh7mv4r52"
}, {
    name: "duck",
    description: "open search engine (instant API)",
    provider: "DuckDuckGo",
    docs: "http://api.duckduckgo.com/api",
    endpoint: "http://api.duckduckgo.com/",
    account: {
        t: "graphpaper"
    }
}, {
    name: "parse",
    description: "The web's most powerful content parsing engine",
    provider: "Readability",
    docs: "https://www.readability.com/developers/api/parser",
    endpoint: "https://readability.com/api/content/v1/parser",
    token: "5a5f0fa387c2876796267223b5740dc397f99cb0",
    account: {
        username: "gpaper",
        password: "6Eg-QzT-bcR-Zu2"
    }
}, {
    name: "embedly",
    description: "Convert URL into embed code",
    docs: "http://embed.ly/docs/embed/api/endpoints/1/oembed",
    endpoint: "http://api.embed.ly/1/oembed",
    token: "1b7350d8cb894d1f9b5fffd18cc0ba56",
    account: {}
}, {
    name: "google",
    description: "Google Cloud Platform",
    docs: "http://developers.google.com",
    endpoint: {
        maps: {
            embed: "https://www.google.com/maps/embed/v1/"
        }
    },
    token: "AIzaSyDGmBHD9EALhYO40E7fdkY9Bc2BWrScxiU",
    account: {
        username: "deepthought@gmail.com"
    }
}], 'name');

// Basic Router
Router.map(function() {
    //Need to Lock to access right
    this.route('admin', {
        path: '/admin'
    });

    this.route('test', {
        path: '/test/:id',
        data: function() {
            return this.params
        }
    });

    this.route('create', {
        path: '/create',
        layoutTemplate: 'layout'
    });

    this.route('login', {
        path: '/login'
    });

    this.route('dev', {
        path: '/canvas',
        waitOn: function() {
            Session.set('canvasId', 'dev');
            return Meteor.subscribe('canvas', 'dev');
        }
    })

    this.route('lock', {
        path: '/lock'
    });

    this.route('register', {
        path: '/register'
    });

    this.route('canvas', {
        path: '/:canvasId',
        template: 'canvas',
        layoutTemplate: 'layout',
        onBeforeAction: function() {
            if (!Meteor.user()) {
                // render the login template but keep the url in the browser the same
                // Router.go('login');

                // pause this rendering of the rest of the before hooks and the action function 
                // pause();
            } else {
                this.render('loading');
            }
        },
        waitOn: function() {
            var reservedNames = ['about', 'canvas', 'create', 'admin'];

            if (_.contains(reservedNames, this.params.canvasId)) {
                console.error('reserved name');
            }

            Session.set('canvasId', this.params.canvasId);
            return Action.trySubscribe();
        }
    });

    this.route('home', {
        path: '/'
    });
});


// Facebook Singapore Hackathon": 574877579268704
// HACKATHON_EVENTID = "504311396358169"
FUNCTION_BANK = {
    "^(favourite music of)[ ]?": "if (query == '') {\n\tif (link[0].value._type == 'fb_user') {\n\t\tquery = link[0].value.id\n\t} else if (Array.isArray(link[0].value)) {\n\t\tvar array = link[0].value;\n\t\tvar aggIdArray = _.map(array, function(element) {\n\t\t\treturn element.id;\n\t\t});\n\t} else {\n\t\tquery = link[0].value;\n\t}\n}\nif (aggIdArray) {\n\tMeteor.call('aggregateMusicLikes', aggIdArray, function(err, result) {\n\t\tif (err) console.log(err);\n\t\tSquares.update(id, {\n\t\t\t$set: {\n\t\t\t\tvalue: result\n\t\t\t}\n\t\t});\n\t});\n} else {\n\tMeteor.call('getFavouriteMusic', query, function(err, result) {\n\t\tif (err) console.log(err);\n\t\tSquares.update(id, {\n\t\t\t$set: {\n\t\t\t\tvalue: result\n\t\t\t}\n\t\t});\n\t});\n}",
    "^(mutual friends of)[ ]?": "if (query == '') {\n\tif (link[0].value._type == 'fb_user') {\n\t\tvar aggUserArray = [{'id': link[0].value.id, 'name':link[0].value.name}];\n\t} else if (Array.isArray(link[0].value)) {\n\t\tvar aggUserArray = link[0].value;\n\t} else {\n\t\tquery = link[0].value;\n\t}\n}\nif (aggUserArray) {\n\tMeteor.call('aggregateMutualFriends', aggUserArray, function(err, result) {\n\t\tif (err) console.log(err);\n\t\tSquares.update(id, {\n\t\t\t$set: {\n\t\t\t\tvalue: result\n\t\t\t}\n\t\t});\n\t});\n}",
    "^(these people who like)[ ]?": "if (query == '') {\tif (Array.isArray(link[0].value) && link[0].value._type == 'fb_user') {\t\tvar data = {\t\t\t'users': link[0].value,\t\t\t'artistId': link[0].value.id\t\t};\t}}if (data) {\tMeteor.call('getPeopleWhoLike', data, function(err, result) {\t\tif (err) console.log(err);\t\tSquares.update(id, {\t\t\t$set: {\t\t\t\tvalue: result\t\t\t}\t\t});\t});}",
    "^(people attending)[ ]?": "if (query == '') {\tif (link[0].value._type == 'fb_event') {\t\tquery = link[0].value.id\t} else {\t\tquery = link[0].value;\t}}Meteor.call('getEventAttendees', query, function(err, result) {\tif (err) console.log(err);\tSquares.update(id, {\t\t$set: {\t\t\tvalue: result\t\t}\t});});",
    "^(user called)[ ]?": "if (query == '') {\n\tif (link[0].value._type == 'fb_user' || link[0].value._type == 'fb_event' || link[0].value._type == 'fb_music') {\n\t\tquery = link[0].value.id\n\t} else {\n\t\tquery = link[0].value;\n\t}\n}\nvar data = {\n\tq: query,\n\ttype: 'user'\n};\nMeteor.call('search-fb', data, function(err, searchReturn) {\n\tif (err) console.log(err);\n\tif (searchReturn && searchReturn.data.data.length > 1) {\n\t\tSquares.update(id, {\n\t\t\t$set: {\n\t\t\t\tvalue: searchReturn.data.data\n\t\t\t}\n\t\t});\n\t} else if (searchReturn && searchData.data.data.length == 1) {\n\t\tconsole.log('Logging sinle object...');\n\t\tconsole.log(searchReturn);\n\t\tSquares.update(id, {\n\t\t\t$set: {\n\t\t\t\tvalue: {\n\t\t\t\t\t'_type': 'fb_user',\n\t\t\t\t\t'id': searchReturn.data.data[0].id,\n\t\t\t\t\t'name': searchReturn.data.data[0].name\n\t\t\t\t}\n\t\t\t}\n\t\t});\n\t}\n});",
    "^(event called)[ ]?": "if (query == '') {\n\tif (link[0].value._type == 'fb_event') {\n\t\tquery = link[0].value.id\n\t} else {\n\t\tquery = link[0].value;\n\t}\n}\nvar data = {\n\tq: query,\n\ttype: 'event'\n};\nMeteor.call('search-fb', data, function(err, searchReturn) {\n\tif (err) console.log(err);\n\tif (searchReturn && searchReturn.data.data.length > 1) {\n\t\tSquares.update(id, {\n\t\t\t$set: {\n\t\t\t\tvalue: searchReturn.data.data\n\t\t\t}\n\t\t});\n\t} else if (searchReturn && searchReturn.data.data.length == 1) {\n\t\tSquares.update(id, {\n\t\t\t$set: {\n\t\t\t\tvalue: {\n\t\t\t\t\t'_type': 'fb_event',\n\t\t\t\t\t'id': searchReturn.data.data[0].id,\n\t\t\t\t\t'name': searchReturn.data.data[0].name\n\t\t\t\t}\n\t\t\t}\n\t\t});\n\t}\n});",
    "^(count)": "if (Array.isArray(link[0].value)) {\n\treturn link[0].value.length;\n}",
    "^(spotify)[ ]?": "if (query == '') {if (Array.isArray(link[0].value)) {query = link[0].value[0].name;} else if (typeof link[0].value == 'string') {query = link[0].value;} else if (link[0].value.name != undefined) {query = link[0].value.name;}}Meteor.http.get('http://ws.spotify.com/search/1/track.json?q=' + query, function(err, data) {var array = _.map(data.data.tracks, function(element) {return {_type: 'spotify_track',text: element.name,href: element.href}});Squares.update(id, {$set: {value: array}});});"
};

if (Meteor.isClient) {
    // Meteor.subscribe('users');

    Meteor.startup(function() {
        // Session.setDefault('fb-result', '');
        // Deps.autorun(function() {
        //  var result = Session.get('fb-result');
        //  if (typeof result == 'object') {
        //      Squares.update(result.squareId, {
        //          $set: {
        //              value: result.value
        //          }
        //      });
        //  }
        // });

        // $('.main-container .square').droppable({
        //  drop: function(event, ui) {
        //      var newSquare = Squares.findOne($(this).attr('id'));
        //      var $li = $(ui.draggable); /////
        //      var oldSquare = Squares.findOne($li.closest('.square').attr('id'));
        //      var arrItem = oldSquare.value[$li.index()];
        //      var newItem = {
        //          "_type": 'fb_user', //HARDCODED
        //          "id": arrItem.id,
        //          "name": arrItem.name
        //      };
        //      Squares.update(newSquare._id, {
        //          $unset: {
        //              fn: null
        //          },
        //          $set: {
        //              value: newItem
        //          }
        //      }, (function(id) {
        //          return function() {
        //              Action.refresh(Squares.findOne(id));
        //          };
        //      })(newSquare._id));
        //      return false;
        //  }
        // });

        var functionMap = {
            'mx.sketch': function() {
                console.log("sketch");
                return "";
            },
            'mx.card': function() {
                console.log("card");
            },
            MX_DATA: function() {
                console.log("data");

            },
            'static_map': function(data, input) {
                var query, input = _.find(input, function(d) {
                    return d.location;
                });

                if (data && data.location && data.location[0]) {
                    query = data.location[0].value;
                } else if (input && input.location && input.location[0]) {
                    query = input.location[0].value;
                }
                return 'map';
            },
            'map': function(data, input) {

                var url = URI(API.google.endpoint.maps.embed + "place").query({
                    q: data.location[0].value,
                    key: API.google.token
                }).toString();

                return "<iframe seamless fit src='" + url + "'>"
            },
            'direction': function(data, input) {

                var origin, destination;

                console.log(data, input);

                if (data && data.origin && data.origin[0] && data.destination && data.destination[0]) {
                    origin = data.origin[0].value;
                    destination = data.destination[0].value;
                } else {
                    origin = input[0].location[0].value;
                    destination = input[1].location[0].value;
                }

                var url = URI(API.google.endpoint.maps.embed + "directions").query({
                    origin: origin,
                    destination: destination,
                    key: API.google.token
                }).toString();

                // return '<mx-direction startAddress="'+origin+'" endAddress="'+destination+'"></mx-direction>';
                return "<iframe seamless fit src='" + url + "'>"
            }
        };
        _.extend(Formula, functionMap);


        _.defer(function() {
            for (var i = 0; i < 10; i++) {
                for (var j = 0; j < 25; j++) {
                    Background.insert({
                        x: i,
                        y: j,
                        z: 0,
                        height: 1,
                        width: 1,
                        selected: false,
                        isTile: true
                    });
                }
            }
        });
    });
}
