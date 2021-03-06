if (Meteor.isServer) {
    var cheerio = Meteor.npmRequire('cheerio');
    var EXPLORER_ACCESS_TOKEN = "CAACEdEose0cBAD9KBXjC24tCZBhzZAH2l5pZB63gP8kxD4vgRb7ZAlUTZCkcaHWYSgOkPg7pqzXdxrcpGDuypffjhfSNYqKodJYjZB7BEH8PQ851C2jaI6R6cBJhIokbhIrQaRkvRZBBRr8uhfZBXnlORdtJ26qn6T8D67Px4lQWtEJDKv9CZBAoGnHENB3uooqZCR2omVPLVHfwZDZD";

    //Canvas Methods
    Meteor.methods({
        create: function(canvasId, password) {

            if (Canvases.findOne(canvasId) !== undefined) {

                return new Meteor.Error(null, "Canvas name already taken", null);

            } else {

                Canvases.insert({
                    _id: canvasId,
                    created: new Date(),
                    password: password
                });

                Meteor.call('initialize', canvasId);
            }
        },
        reset: function(canvasId) {
            Meteor.call('clear', canvasId);
            Meteor.call('initialize', canvasId);
        },
        clear: function(canvasId) {
            Squares.remove({
                canvasId: canvasId
            });
        },
        initialize: function(canvasId) {
            //
        },
        clearAll: function() {
            Squares.remove({});

            Stencils.update({}, {
                $set: {
                    canvasId: 'public'
                }
            });
        }
    });


    Meteor.methods({
        proxy: function(url, options) {
            return HTTP.get(url, options);
        },
        fetch: function(url, statements, _id) {

            Meteor.http.get(url, function(error, response) {
                var $, data, fn;

                if (response.headers['content-type'].match(/text\/html/)) {

                    $ = cheerio.load(response.content);
                    fn = new Function(['$', 'ID'], statements);

                } else if (response.headers['content-type'].match(/application\/json/)) {

                    $ = JSON.parse(response.content)
                    fn = new Function(['data', 'ID'], statements);

                }

                var result = fn($, _id);

                if (result === undefined || result === null) return;

                Squares.update(_id, {
                    $set: {
                        value: result,
                    }
                });
            });
        },

    });

    // Meteor.publish('users', function() {
    //     return Meteor.users.find({});
    // });

    Meteor.publish('canvas', function(canvasId, password) {

        var canvas = Canvases.findOne({
            _id: canvasId
        });

        if (canvas) {

            if (canvas.password == undefined || canvas.password === password) {

                return [Squares.find({
                    canvasId: canvasId
                }), Canvases.find({
                    _id: canvasId
                })];

                // ,Stencils.find({
                //     // canvasId: canvasId
                // })

            } else {
                this.error(new Meteor.Error(null, "Invalid Password", "Try again."));
            }

        } else {
            if (canvasId == "public") {

            }
            this.error(new Meteor.Error(null, "Canvas not found", "need to check pub/sub"));
        }
    })


    /*********************************************************************
        FACEBOOK API METHODS
    *********************************************************************/
    Meteor.methods({
        'test': function() {
            // var attendees = Meteor.call("getEventAttendees", "574877579268704");
            // var aggregatedMutualFriends = Meteor.call("aggregateMutualFriends", attendees);
            console.dir(HTTP.get("https://graph.facebook.com/" + 504311396358169 + "/attending" + "?access_token=" + Meteor.user().services.facebook.accessToken));

            return;
        },
        'search-fb': function(input) {
            var result = Meteor.http.call("GET",
                'https://graph.facebook.com/search?' +
                'q=' + input.q +
                '&type=' + input.type +
                '&limit=' + 20 +
                '&access_token=' + Meteor.user().services.facebook.accessToken
            );

            console.log(result);
            return result;
        },
        getEventAttendees: function(eventID) {
            // if (!eventName || eventName.length === 0) return null; //No event name found
            // //Search for the ID of the event
            // var eventIDquery = "SELECT eid FROM event WHERE name='" + eventName + "'";
            // var eventIDresponse = HTTP.get("https://graph.facebook.com/fql?q=" + eventIDquery
            //     + "&access_token=" + Meteor.user().services.facebook.accessToken);
            // var eventsFound = eventIDresponse.data.data;
            // var eventID = eventsFound[0].eid;
            // console.log("Event ID: " + eventID);

            //Get the attendees for the event
            var eventAttendeesResponse = HTTP.get("https://graph.facebook.com/" + 504311396358169 + "/attending" + "?access_token=" + Meteor.user().services.facebook.accessToken);
            var eventAttendeesArray = eventAttendeesResponse.data.data;
            return eventAttendeesArray;
        },
        getEventAttendeesByEventName: function(eventName) {
            if (!eventName || eventName.length === 0) return null; //No event name found
            //Search for the ID of the event
            var eventIDquery = "SELECT eid FROM event WHERE name='" + eventName + "'";
            var eventIDresponse = HTTP.get("https://graph.facebook.com/fql?q=" + eventIDquery + "&access_token=" + Meteor.user().services.facebook.accessToken);
            var eventsFound = eventIDresponse.data.data;
            var eventID = eventsFound[0].eid;
            console.log("Event ID: " + eventID);

            //Get the attendees for the event
            var eventAttendeesResponse = HTTP.get("https://graph.facebook.com/" + eventID + "/attending" + "?access_token=" + Meteor.user().services.facebook.accessToken);
            var eventAttendeesArray = eventAttendeesResponse.data.data;
            return eventAttendeesArray;
        },
        getMutualFriends: function(facebookUserID) {
            var response = HTTP.get("https://graph.facebook.com/" + facebookUserID + "/mutualfriends" + "?access_token=" + Meteor.user().services.facebook.accessToken);
            var friendsFound = response.data.data;
            return friendsFound;
        },
        getMutualFriendsBatched: function(usersArray) {
            if (usersArray.length > 50) {
                console.log("Batch query limit exceeded. Max 50 only.");
                return;
            }

            var batchJSONArray = new Array();

            _.each(usersArray, function(userID) {
                var requestObj = {
                    method: "GET",
                    relative_url: userID + "/mutualfriends"
                };
                batchJSONArray.push(requestObj);
            });

            var batchRequestURL = "https://graph.facebook.com/" + "?batch=" + JSON.stringify(batchJSONArray) + "&access_token=" + Meteor.user().services.facebook.accessToken;

            var batchResponse = HTTP.post(batchRequestURL);
            var dataChunk = batchResponse.data;
            var dataParts = new Array();
            _.each(dataChunk, function(dataChunk) {
                var dataChunkBody = _.pick(dataChunk, "body");
                var bodyContent = JSON.parse(dataChunkBody.body);
                dataParts.push(bodyContent.data);
            });
            return dataParts;
        },
        getFavouriteMusic: function(facebookUserID) {
            var response = HTTP.get("https://graph.facebook.com/" + facebookUserID + "/music" + "?access_token=" + EXPLORER_ACCESS_TOKEN + "&limit=100");
            var artistsFound = response.data.data;
            return artistsFound;
        },
        getFavouriteMoviesAndTVShows: function(facebookUserID) {
            var tvResponse = HTTP.get("https://graph.facebook.com/" + facebookUserID + "/television" + "?access_token=" + Meteor.user().services.facebook.accessToken);
            var tvShowsFound = tvResponse.data.data;

            var movieResponse = HTTP.get("https://graph.facebook.com/" + facebookUserID + "/movies" + "?access_token=" + Meteor.user().services.facebook.accessToken);
            var moviesFound = movieResponse.data.data;
            var mergedArr = _.union(tvShowsFound, moviesFound);
            return mergedArr;
        },
        getFavouriteMusicBatched: function(usersArray) { //Method to get music likes for all users through batching
            if (usersArray.length > 50) {
                console.log("Batch query limit exceeded. Max 50 only.");
                return;
            }

            var batchJSONArray = new Array();

            _.each(usersArray, function(userID) {
                var requestObj = {
                    method: "GET",
                    relative_url: userID + "/music"
                };
                batchJSONArray.push(requestObj);
            });

            var batchRequestURL = "https://graph.facebook.com/" + "?batch=" + JSON.stringify(batchJSONArray) + "&access_token=" + EXPLORER_ACCESS_TOKEN;

            var batchResponse = HTTP.post(batchRequestURL);
            var dataChunk = batchResponse.data;
            var dataParts = new Array();
            _.each(dataChunk, function(dataChunk) {
                var dataChunkBody = _.pick(dataChunk, "body");
                var bodyContent = JSON.parse(dataChunkBody.body);
                dataParts.push(bodyContent.data);
            });
            return dataParts;
        },
        getPeopleWhoLike: function(data) {
            var searchUsers = data.users;
            var artistId = data.id;
            var usersWhoLike = new Array();
            return usersWhoLike;
        },
        aggregateMusicLikes: function(userIDArray) {
            if (!userIDArray && userIDArray.length === 0) return null;

            var userMusicLikes = new Array();
            var batchUserIDs = new Array(); //Array to store the user IDs to make the batched API call

            //Get music likes for each individual user
            _.each(userIDArray, function(userID, index, list) {
                batchUserIDs.push(userID);

                if (batchUserIDs.length === 50 || index === (list.length - 1)) {
                    var musicLikes = Meteor.call("getFavouriteMusicBatched", batchUserIDs);

                    batchUserIDs = new Array(); //resetting the array to store new user IDs

                    _.each(musicLikes, function(likesPerUser) {
                        _.each(likesPerUser, function(like) {
                            userMusicLikes.push(like);
                        });
                    });
                }
            });

            var groupedMusicObj = _.groupBy(userMusicLikes, function(like) {
                return like.id;
            });

            var groupedMusicArray = new Array();

            _.each(_.keys(groupedMusicObj), function(key) {
                var aggrLikes = this[key];
                var aggrLikeObj = {
                    count: aggrLikes.length,
                    name: aggrLikes[0]["name"] + " (" + aggrLikes.length + ")",
                    id: aggrLikes[0]["id"]
                };
                groupedMusicArray.push(aggrLikeObj);
            }, groupedMusicObj);

            groupedMusicArray = _.sortBy(groupedMusicArray, function(artist) {
                return -artist.count;
            });

            groupedMusicArray = groupedMusicArray.slice(0, Math.min(groupedMusicArray.length, 10));

            return groupedMusicArray;
        },
        aggregateMutualFriends: function(userArray) {
            userArray = _.reject(userArray, function(user) {
                return user.id === Meteor.user().services.facebook.id;
            });
            if (!userArray && userArray.length === 0) return null;

            var userMutualFriends = new Array();
            var batchUserIDs = new Array(); //Array to store the user IDs to make the batched API call

            //Get mutual friends for each individual user
            _.each(userArray, function(user, index, list) {
                batchUserIDs.push(user.id);

                if (batchUserIDs.length === 50 || index === (list.length - 1)) {
                    var mutualFriendResults = Meteor.call("getMutualFriendsBatched", batchUserIDs);

                    _.each(mutualFriendResults, function(mutualFriendsForUser, index, list) {
                        //Hack to get the name
                        var userID = batchUserIDs[index];
                        var userObj = _.find(userArray, function(user) {
                            return user.id === batchUserIDs[index];
                        });
                        var mutualFriendObj = {
                            id: userID,
                            name: userObj.name + " (" + mutualFriendsForUser.length + ")",
                            count: mutualFriendsForUser.length
                        };

                        userMutualFriends.push(mutualFriendObj);
                    });

                    userMutualFriends = _.reject(userMutualFriends, function(userMutual) {
                        return userMutual.count === 0;
                    });

                    batchUserIDs = new Array(); //resetting the array to store new user IDs
                }
            });

            userMutualFriends = _.sortBy(userMutualFriends, function(userMutual) {
                return -userMutual.count;
            });

            return userMutualFriends;
        },
        getEventMetaData: function(eventID) {
            var response = HTTP.get("https://graph.facebook.com/" + eventID + "?access_token=" + Meteor.user().services.facebook.accessToken);
            var eventObj = response.data;
            var eventMeta = _.pick(eventObj, "id", "name", "owner", "start_time", "end_time", "location", "venue");
            return eventMeta;
        }
    });

    Meteor.startup(function() {
        // Meteor.call('clearAll');
        Meteor.call('create', 'public', null);
    });

}
