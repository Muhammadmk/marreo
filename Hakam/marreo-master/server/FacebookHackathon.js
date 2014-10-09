// Facebook Singapore Hackathon": 574877579268704
// HACKATHON_EVENTID = "504311396358169"
// FUNCTION_BANK = {
//     "^(favourite music of)[ ]?": "if (query == '') {\n\tif (link[0].value._type == 'fb_user') {\n\t\tquery = link[0].value.id\n\t} else if (Array.isArray(link[0].value)) {\n\t\tvar array = link[0].value;\n\t\tvar aggIdArray = _.map(array, function(element) {\n\t\t\treturn element.id;\n\t\t});\n\t} else {\n\t\tquery = link[0].value;\n\t}\n}\nif (aggIdArray) {\n\tMeteor.call('aggregateMusicLikes', aggIdArray, function(err, result) {\n\t\tif (err) console.log(err);\n\t\tSquares.update(id, {\n\t\t\t$set: {\n\t\t\t\tvalue: result\n\t\t\t}\n\t\t});\n\t});\n} else {\n\tMeteor.call('getFavouriteMusic', query, function(err, result) {\n\t\tif (err) console.log(err);\n\t\tSquares.update(id, {\n\t\t\t$set: {\n\t\t\t\tvalue: result\n\t\t\t}\n\t\t});\n\t});\n}",
//     "^(mutual friends of)[ ]?": "if (query == '') {\n\tif (link[0].value._type == 'fb_user') {\n\t\tvar aggUserArray = [{'id': link[0].value.id, 'name':link[0].value.name}];\n\t} else if (Array.isArray(link[0].value)) {\n\t\tvar aggUserArray = link[0].value;\n\t} else {\n\t\tquery = link[0].value;\n\t}\n}\nif (aggUserArray) {\n\tMeteor.call('aggregateMutualFriends', aggUserArray, function(err, result) {\n\t\tif (err) console.log(err);\n\t\tSquares.update(id, {\n\t\t\t$set: {\n\t\t\t\tvalue: result\n\t\t\t}\n\t\t});\n\t});\n}",
//     "^(these people who like)[ ]?": "if (query == '') {\tif (Array.isArray(link[0].value) && link[0].value._type == 'fb_user') {\t\tvar data = {\t\t\t'users': link[0].value,\t\t\t'artistId': link[0].value.id\t\t};\t}}if (data) {\tMeteor.call('getPeopleWhoLike', data, function(err, result) {\t\tif (err) console.log(err);\t\tSquares.update(id, {\t\t\t$set: {\t\t\t\tvalue: result\t\t\t}\t\t});\t});}",
//     "^(people attending)[ ]?": "if (query == '') {\tif (link[0].value._type == 'fb_event') {\t\tquery = link[0].value.id\t} else {\t\tquery = link[0].value;\t}}Meteor.call('getEventAttendees', query, function(err, result) {\tif (err) console.log(err);\tSquares.update(id, {\t\t$set: {\t\t\tvalue: result\t\t}\t});});",
//     "^(user called)[ ]?": "if (query == '') {\n\tif (link[0].value._type == 'fb_user' || link[0].value._type == 'fb_event' || link[0].value._type == 'fb_music') {\n\t\tquery = link[0].value.id\n\t} else {\n\t\tquery = link[0].value;\n\t}\n}\nvar data = {\n\tq: query,\n\ttype: 'user'\n};\nMeteor.call('search-fb', data, function(err, searchReturn) {\n\tif (err) console.log(err);\n\tif (searchReturn && searchReturn.data.data.length > 1) {\n\t\tSquares.update(id, {\n\t\t\t$set: {\n\t\t\t\tvalue: searchReturn.data.data\n\t\t\t}\n\t\t});\n\t} else if (searchReturn && searchData.data.data.length == 1) {\n\t\tconsole.log('Logging sinle object...');\n\t\tconsole.log(searchReturn);\n\t\tSquares.update(id, {\n\t\t\t$set: {\n\t\t\t\tvalue: {\n\t\t\t\t\t'_type': 'fb_user',\n\t\t\t\t\t'id': searchReturn.data.data[0].id,\n\t\t\t\t\t'name': searchReturn.data.data[0].name\n\t\t\t\t}\n\t\t\t}\n\t\t});\n\t}\n});",
//     "^(event called)[ ]?": "if (query == '') {\n\tif (link[0].value._type == 'fb_event') {\n\t\tquery = link[0].value.id\n\t} else {\n\t\tquery = link[0].value;\n\t}\n}\nvar data = {\n\tq: query,\n\ttype: 'event'\n};\nMeteor.call('search-fb', data, function(err, searchReturn) {\n\tif (err) console.log(err);\n\tif (searchReturn && searchReturn.data.data.length > 1) {\n\t\tSquares.update(id, {\n\t\t\t$set: {\n\t\t\t\tvalue: searchReturn.data.data\n\t\t\t}\n\t\t});\n\t} else if (searchReturn && searchReturn.data.data.length == 1) {\n\t\tSquares.update(id, {\n\t\t\t$set: {\n\t\t\t\tvalue: {\n\t\t\t\t\t'_type': 'fb_event',\n\t\t\t\t\t'id': searchReturn.data.data[0].id,\n\t\t\t\t\t'name': searchReturn.data.data[0].name\n\t\t\t\t}\n\t\t\t}\n\t\t});\n\t}\n});",
//     "^(count)": "if (Array.isArray(link[0].value)) {\n\treturn link[0].value.length;\n}",
//     "^(spotify)[ ]?": "if (query == '') {if (Array.isArray(link[0].value)) {query = link[0].value[0].name;} else if (typeof link[0].value == 'string') {query = link[0].value;} else if (link[0].value.name != undefined) {query = link[0].value.name;}}Meteor.http.get('http://ws.spotify.com/search/1/track.json?q=' + query, function(err, data) {var array = _.map(data.data.tracks, function(element) {return {_type: 'spotify_track',text: element.name,href: element.href}});Squares.update(id, {$set: {value: array}});});"
// };

// /*********************************************************************
//     FACEBOOK API METHODS
// *********************************************************************/
// Meteor.methods({
//     'test': function() {
//         // var attendees = Meteor.call("getEventAttendees", "574877579268704");
//         // var aggregatedMutualFriends = Meteor.call("aggregateMutualFriends", attendees);
//         console.dir(HTTP.get("https://graph.facebook.com/" + 504311396358169 + "/attending" + "?access_token=" + Meteor.user().services.facebook.accessToken));

//         return;
//     },
//     'search-fb': function(input) {
//         var result = Meteor.http.call("GET",
//             'https://graph.facebook.com/search?' +
//             'q=' + input.q +
//             '&type=' + input.type +
//             '&limit=' + 20 +
//             '&access_token=' + Meteor.user().services.facebook.accessToken
//         );

//         console.log(result);
//         return result;
//     },
//     getEventAttendees: function(eventID) {
//         // if (!eventName || eventName.length === 0) return null; //No event name found
//         // //Search for the ID of the event
//         // var eventIDquery = "SELECT eid FROM event WHERE name='" + eventName + "'";
//         // var eventIDresponse = HTTP.get("https://graph.facebook.com/fql?q=" + eventIDquery
//         //     + "&access_token=" + Meteor.user().services.facebook.accessToken);
//         // var eventsFound = eventIDresponse.data.data;
//         // var eventID = eventsFound[0].eid;
//         // console.log("Event ID: " + eventID);

//         //Get the attendees for the event
//         var eventAttendeesResponse = HTTP.get("https://graph.facebook.com/" + 504311396358169 + "/attending" + "?access_token=" + Meteor.user().services.facebook.accessToken);
//         var eventAttendeesArray = eventAttendeesResponse.data.data;
//         return eventAttendeesArray;
//     },
//     getEventAttendeesByEventName: function(eventName) {
//         if (!eventName || eventName.length === 0) return null; //No event name found
//         //Search for the ID of the event
//         var eventIDquery = "SELECT eid FROM event WHERE name='" + eventName + "'";
//         var eventIDresponse = HTTP.get("https://graph.facebook.com/fql?q=" + eventIDquery + "&access_token=" + Meteor.user().services.facebook.accessToken);
//         var eventsFound = eventIDresponse.data.data;
//         var eventID = eventsFound[0].eid;
//         console.log("Event ID: " + eventID);

//         //Get the attendees for the event
//         var eventAttendeesResponse = HTTP.get("https://graph.facebook.com/" + eventID + "/attending" + "?access_token=" + Meteor.user().services.facebook.accessToken);
//         var eventAttendeesArray = eventAttendeesResponse.data.data;
//         return eventAttendeesArray;
//     },
//     getMutualFriends: function(facebookUserID) {
//         var response = HTTP.get("https://graph.facebook.com/" + facebookUserID + "/mutualfriends" + "?access_token=" + Meteor.user().services.facebook.accessToken);
//         var friendsFound = response.data.data;
//         return friendsFound;
//     },
//     getMutualFriendsBatched: function(usersArray) {
//         if (usersArray.length > 50) {
//             console.log("Batch query limit exceeded. Max 50 only.");
//             return;
//         }

//         var batchJSONArray = new Array();

//         _.each(usersArray, function(userID) {
//             var requestObj = {
//                 method: "GET",
//                 relative_url: userID + "/mutualfriends"
//             };
//             batchJSONArray.push(requestObj);
//         });

//         var batchRequestURL = "https://graph.facebook.com/" + "?batch=" + JSON.stringify(batchJSONArray) + "&access_token=" + Meteor.user().services.facebook.accessToken;

//         var batchResponse = HTTP.post(batchRequestURL);
//         var dataChunk = batchResponse.data;
//         var dataParts = new Array();
//         _.each(dataChunk, function(dataChunk) {
//             var dataChunkBody = _.pick(dataChunk, "body");
//             var bodyContent = JSON.parse(dataChunkBody.body);
//             dataParts.push(bodyContent.data);
//         });
//         return dataParts;
//     },
//     getFavouriteMusic: function(facebookUserID) {
//         var response = HTTP.get("https://graph.facebook.com/" + facebookUserID + "/music" + "?access_token=" + EXPLORER_ACCESS_TOKEN + "&limit=100");
//         var artistsFound = response.data.data;
//         return artistsFound;
//     },
//     getFavouriteMoviesAndTVShows: function(facebookUserID) {
//         var tvResponse = HTTP.get("https://graph.facebook.com/" + facebookUserID + "/television" + "?access_token=" + Meteor.user().services.facebook.accessToken);
//         var tvShowsFound = tvResponse.data.data;

//         var movieResponse = HTTP.get("https://graph.facebook.com/" + facebookUserID + "/movies" + "?access_token=" + Meteor.user().services.facebook.accessToken);
//         var moviesFound = movieResponse.data.data;
//         var mergedArr = _.union(tvShowsFound, moviesFound);
//         return mergedArr;
//     },
//     getFavouriteMusicBatched: function(usersArray) { //Method to get music likes for all users through batching
//         if (usersArray.length > 50) {
//             console.log("Batch query limit exceeded. Max 50 only.");
//             return;
//         }

//         var batchJSONArray = new Array();

//         _.each(usersArray, function(userID) {
//             var requestObj = {
//                 method: "GET",
//                 relative_url: userID + "/music"
//             };
//             batchJSONArray.push(requestObj);
//         });

//         var batchRequestURL = "https://graph.facebook.com/" + "?batch=" + JSON.stringify(batchJSONArray) + "&access_token=" + EXPLORER_ACCESS_TOKEN;

//         var batchResponse = HTTP.post(batchRequestURL);
//         var dataChunk = batchResponse.data;
//         var dataParts = new Array();
//         _.each(dataChunk, function(dataChunk) {
//             var dataChunkBody = _.pick(dataChunk, "body");
//             var bodyContent = JSON.parse(dataChunkBody.body);
//             dataParts.push(bodyContent.data);
//         });
//         return dataParts;
//     },
//     getPeopleWhoLike: function(data) {
//         var searchUsers = data.users;
//         var artistId = data.id;
//         var usersWhoLike = new Array();
//         return usersWhoLike;
//     },
//     aggregateMusicLikes: function(userIDArray) {
//         if (!userIDArray && userIDArray.length === 0) return null;

//         var userMusicLikes = new Array();
//         var batchUserIDs = new Array(); //Array to store the user IDs to make the batched API call

//         //Get music likes for each individual user
//         _.each(userIDArray, function(userID, index, list) {
//             batchUserIDs.push(userID);

//             if (batchUserIDs.length === 50 || index === (list.length - 1)) {
//                 var musicLikes = Meteor.call("getFavouriteMusicBatched", batchUserIDs);

//                 batchUserIDs = new Array(); //resetting the array to store new user IDs

//                 _.each(musicLikes, function(likesPerUser) {
//                     _.each(likesPerUser, function(like) {
//                         userMusicLikes.push(like);
//                     });
//                 });
//             }
//         });

//         var groupedMusicObj = _.groupBy(userMusicLikes, function(like) {
//             return like.id;
//         });

//         var groupedMusicArray = new Array();

//         _.each(_.keys(groupedMusicObj), function(key) {
//             var aggrLikes = this[key];
//             var aggrLikeObj = {
//                 count: aggrLikes.length,
//                 name: aggrLikes[0]["name"] + " (" + aggrLikes.length + ")",
//                 id: aggrLikes[0]["id"]
//             };
//             groupedMusicArray.push(aggrLikeObj);
//         }, groupedMusicObj);

//         groupedMusicArray = _.sortBy(groupedMusicArray, function(artist) {
//             return -artist.count;
//         });

//         groupedMusicArray = groupedMusicArray.slice(0, Math.min(groupedMusicArray.length, 10));

//         return groupedMusicArray;
//     },
//     aggregateMutualFriends: function(userArray) {
//         userArray = _.reject(userArray, function(user) {
//             return user.id === Meteor.user().services.facebook.id;
//         });
//         if (!userArray && userArray.length === 0) return null;

//         var userMutualFriends = new Array();
//         var batchUserIDs = new Array(); //Array to store the user IDs to make the batched API call

//         //Get mutual friends for each individual user
//         _.each(userArray, function(user, index, list) {
//             batchUserIDs.push(user.id);

//             if (batchUserIDs.length === 50 || index === (list.length - 1)) {
//                 var mutualFriendResults = Meteor.call("getMutualFriendsBatched", batchUserIDs);

//                 _.each(mutualFriendResults, function(mutualFriendsForUser, index, list) {
//                     //Hack to get the name
//                     var userID = batchUserIDs[index];
//                     var userObj = _.find(userArray, function(user) {
//                         return user.id === batchUserIDs[index];
//                     });
//                     var mutualFriendObj = {
//                         id: userID,
//                         name: userObj.name + " (" + mutualFriendsForUser.length + ")",
//                         count: mutualFriendsForUser.length
//                     };

//                     userMutualFriends.push(mutualFriendObj);
//                 });

//                 userMutualFriends = _.reject(userMutualFriends, function(userMutual) {
//                     return userMutual.count === 0;
//                 });

//                 batchUserIDs = new Array(); //resetting the array to store new user IDs
//             }
//         });

//         userMutualFriends = _.sortBy(userMutualFriends, function(userMutual) {
//             return -userMutual.count;
//         });

//         return userMutualFriends;
//     },
//     getEventMetaData: function(eventID) {
//         var response = HTTP.get("https://graph.facebook.com/" + eventID + "?access_token=" + Meteor.user().services.facebook.accessToken);
//         var eventObj = response.data;
//         var eventMeta = _.pick(eventObj, "id", "name", "owner", "start_time", "end_time", "location", "venue");
//         return eventMeta;
//     }
// });