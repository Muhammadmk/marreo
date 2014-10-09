https://www.marinetraffic.com/img/pages/nautical-charts.png
"http://map.openseamap.org/weather.php"

<paper-dialog id="webservice-editor" backdrop>
    <h2>Web Service Call</h2>
    <div horizontal layout>
        <div>
            <paper-input id="webservice-url" floatinglabel label="Endpoint" type="url" error="Input is not a valid MMSI!" value="{{current.webservice.url}}"></paper-input>
            <br>
            <paper-input id="webservice-path" floatinglabel label="Key Path" type="text" value="{{current.webservice.path}}"></paper-input>

            <div center horizontal layout>
                <div>Refresh Interval (mins)</div>
                <paper-slider id="webservice-refresh" value="1" max="60" pin editable></paper-slider>
            </div>

            <br>
            <br>

            <div center horizontal layout>
                <div flex>Proxy</div>
                <paper-toggle-button id="webservice-proxy"></paper-toggle-button>
            </div>
        </div>

        <code-mirror id="webservice-mirror" mode="javascript" style="height:350px;width:400px;"></code-mirror>


    </div>
    <paper-button label="Decline" dismissive></paper-button>
    <paper-button label="Accept" affirmative autofocus></paper-button>
</paper-dialog>

<paper-dialog id="css-editor" backdrop>
    <code-mirror id="css-mirror" mode="css" style="height:320px;width:640px;"></code-mirror>
    <paper-button label="Decline" dismissive></paper-button>
    <paper-button label="Accept" affirmative autofocus></paper-button>
</paper-dialog>

<paper-dialog id="function-editor" backdrop>
    <code-mirror id="function-mirror" mode="javascript" style="height:320px;width:640px;"></code-mirror>
    <paper-button label="Decline" dismissive></paper-button>
    <paper-button label="Accept" affirmative autofocus></paper-button>
</paper-dialog>

<paper-dialog id="embed-editor" backdrop>
    <code-mirror id="embed-mirror" mode="html" style="height:320px;width:640px;"></code-mirror>
    <paper-button label="Decline" dismissive></paper-button>
    <paper-button label="Accept" affirmative autofocus></paper-button>
</paper-dialog>
 



<iframe width="100%" height="100%" scrolling="no" frameborder="0" seamless src="http://map.openseamap.org/weather.php"></iframe>

<iframe width="100%" height="100%" scrolling="no" frameborder="0" seamless src="http://www.marinetraffic.com/#vessel"></iframe>


<iframe width="100%" height="100%" scrolling="no" frameborder="0" seamless src="http://www.marinetraffic.com/#density"></iframe>


<iframe src="https://3dwarehouse.sketchup.com/embed.html?mid=f7f62b9657aecbe77f00b68989ad3ebc&width=400&height=300" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" width="400" height="300" allowfullscreen></iframe>


<template name="toolbox">
	<ul class="nav navmenu-nav">
		<li>
			{{#if currentUser}}
			<button class="btn btn-info logout-button">Logout: {{currentUser.profile.name}}</button>
			{{else}}
			<button class="btn btn-info login-button">Login with Facebook</button>
			{{/if}}
		</li>
		<li>
			<button class="btn btn-warning new-canvas-button">Create New Canvas</button>
		</li>
		<li>
			<button class="btn btn-danger clear-canvas-button">Clear All</button>
		</li>
		<li>
			<button class="btn btn-warning add-stencil-button">Add Stencil</button>
		</li>
		<li>
			<button class="btn btn-warning"><a href="{{pathFor 'admin'}}">Add Stencil</a></button>
		</li>
		{{#each stencils}}
		<li>
			<div class="square" style="position:relative;">
				{{title}}
			</div>
		</li>
		{{/each}}
	</ul>
</template>




<!-- <div style="position:absolute; top:{{ypos}}px;left:{{xpos}}px" class="btn-group">
		<button class="btn btn-grid btn-xs dropdown-toggle" type="button" data-toggle="dropdown" tabindex="1">
			<span class="caret"></span>
		</button>

		<ul class='dropdown-menu'>
			{{#if isPage 1}}
			<li class='edit-button'>
				<i class="glyphicon glyphicon-pencil"></i> Text (↵)    
			</li>
			<li class='function-button'>
				<i class="fa fa-code"></i> ƒ(x) (F)
			</li>
			<li class='url-button'>
				<i class="fa fa-link"></i> URL (U) 
			</li>
			<li class='style-button'>
				<i class="fa fa-css3"></i> CSS (C) 
			</li>
			<li class='next-page-button'>
				<i class="glyphicon glyphicon-forward"></i> Next
			</li>
			{{/if}} {{#if isPage 2}}
			<li class='merge-button'>
				<i class="fa fa-compress"></i> Merge (M)
			</li>
			<li class='link-button'>
				<i class="fa fa-external-link"></i> Link (L)
			</li>
			<li class='pin-button'>
				<i class="fa fa-bookmark"></i> Bookmark
			</li>
			<li class='delete-button'>
				<i class="glyphicon glyphicon-trash"></i> Delete (Del)
			</li>
			<li class='previous-page-button'>
				<i class="glyphicon glyphicon-backward"></i> Prev
			</li>
			<li class='next-page-button'>
				<i class="glyphicon glyphicon-forward"></i> Next
			</li>
			{{/if}} {{#if isPage 3}}
			<li class='cut-button'>
				<i class="fa fa-scissors"></i> Cut (Ctrl + X)
			</li>
			<li class='copy-button'>
				<i class="fa fa-files-o"></i> Copy (Ctrl + C)
			</li>
			<li class='paste-button'>
				<i class="fa fa-clipboard"></i> Paste (Ctrl + V)
			</li>
			<li class='previous-page-button'>
				<i class="glyphicon glyphicon-backward"></i> Prev
			</li>
			{{/if}}
		</ul>
	</div> -->




	// Session.set('menu.page', 1);



// Template.menu.isPage = function(p) {
// 	return Session.get('menu.page') == p;
// };

// Template.menu.nextPage = function() {
// 	Session.set('menu.page', Session.get('menu.page') + 1);
// 	_.defer(function() {
// 		$('.caret').click()
// 	});
// };

// Template.menu.prevPage = function() {
// 	Session.set('menu.page', Session.get('menu.page') - 1);
// 	_.defer(function() {
// 		$('.caret').click();
// 	});
// };


// Template.menu.events = {
// 	// //Page 1
// 	// 'click .edit-button': Action.edit,
// 	// 'click .function-button': Action.editFunction,
// 	// 'click .url-button': Action.editURL,
// 	// 'click .style-button': Action.editStyle,
// 	// 'click .next-page-button': Template.menu.nextPage,

// 	// //Page 2
// 	// 'click .previous-page-button': Template.menu.prevPage,
// 	// 'click .link-button': Action.editLinks,
// 	// 'click .merge-button': Action.merge,
// 	// 'click .pin-button': Action.addStencil,
// 	// 'click .delete-button': Action.delete,

// 	// //Page 3
// 	// 'click .cut-button': Action.cut,
// 	// 'click .copy-button': Action.copy,
// 	// 'click .paste-button': Action.paste
// };



                        /* Deprecate
                        if (command.match(/^me$/)) {
                            var v = _.extend(Meteor.user().services.facebook, {
                                _type: 'fb_user'
                            });

                            Squares.update(mx.current._id, {
                                $set: {
                                    value: v
                                }
                            });
                            return;
                        }

                        //TESTING FACEBOOK
                        _.each(FUNCTION_BANK, function(value, key) {
                            var re = new RegExp(key, 'i');

                            if (command.match(re)) {
                                var query = command.replace(re, '');
                                var statements = 'var query = "' + query + '";\n' + value;

                                try {
                                    var fn = new Function(['$', 'link', 'id'], statements);

                                    Squares.update(mx.current._id, {
                                        $set: {
                                            fn: statements
                                        }
                                    }, function() {
                                        Action.refresh(mx.current);
                                    });
                                } catch (error) {
                                    console.log(error.message);
                                }
                                return;
                            }
                        });
*/

                        // try {
                        //  command = JSON.parse(command);
                        // } catch (e) {
                        //  console.log(command)
                        //  console.warn("Cannot parse value as JSON: " + e.message);
                        // }





        // promises[1] = new Promise(function(resolve, reject) {
        //  //Ask Duckduckgo
        //  var request = URI(API.duck.endpoint).query({
        //      q: query,
        //      format: "json",
        //      skip_disambig: 1
        //  }).toString();

        //  HTTP.get(request.toString(), function(error, result) {
        //      var duckduckgoResult = JSON.parse(result.content);
        //      resolve(duckduckgoResult);
        //  });
        // });                        





    // //Priority for resolving Links
    // value = Action.resolveLinks(value, this.link);

    // if (typeof value == 'string' && value.match(/^'.+'$/)) {
    //  return value.substr(1, value.length - 2);
    // }

    // //Render Images
    // if (typeof value == 'string' && value.match(/^https?:\/\/.+\.(?:jpe?g|gif|png)$/i)) {
    //  return new Handlebars.SafeString('<img src='' + value + ''>');
    // }

    // //Keyword based static render
    // if (typeof value == 'string' && value.match(/^(map|map of) /i)) {
    //  query = value.replace(/^(map|map of) /, '');
    //  return new Handlebars.SafeString('<img src='http://maps.googleapis.com/maps/api/staticmap?center=' + query + '&markers=color:green|' + query + '&zoom=14&size=' + this.width * 100 + 'x' + this.height * 100 + '&sensor=false'>');
    // }


    // //# Detect Array and build List UI
    // //Expected format ['London' ,'Tokyo' ,'Paris']
    // //Alternate format [{text:'Appple', href:'http://apple.com'} , {text:'Amazon',href:'http://amazon.com'}]
    // if (Array.isArray(value)) {

    //  result = '<ul class='objectarray ' + _.sample(['cards', 'wave', 'curl', 'papercut']) + ''>\n';
    //  _.each(value, function(row) {
    //      if (typeof row == 'object') {

    //          if (row.name) { //This is an FB user result
    //              result += '<li><img src='http://graph.facebook.com/' + row.id + '/picture'/><a target='_blank' href='http://www.facebook.com/' + row.id + ''>' + row.name + '</a></li>\n'
    //          } else if (typeof row.href == 'string' && typeof row.text == 'string') {
    //              result += '<li><a href='' + row.href + ''>' + row.text + '</a></li>\n'
    //          }

    //      } else {
    //          result += '<li>' + row + '</li>\n'
    //      }
    //  })

    //  result += '</ul>'

    //  _.defer(function() {
    //      stroll.bind('.square ul');
    //  });

    //  return new Handlebars.SafeString(result);

    // }


    // //Render object TODO
    // if (value._type == 'fb_user' || value._type == 'fb_event' || value._type == 'fb_music') {
    //  return new Handlebars.SafeString('<img src='http://graph.facebook.com/' + value.id + '/picture?type=large' width='' + this.width * 100 + '' height='' + this.height * 100 + '' ><div class='overlay'>' + value.name + '</div>');
    // }

    // return value;        




    ===========

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

        // var functionMap = {
        //     'mx.sketch': function() {
        //         console.log("sketch");
        //         return "";
        //     },
        //     'mx.card': function() {
        //         console.log("card");
        //     },
        //     MX_DATA: function() {
        //         console.log("data");

        //     },
        //     'static_map': function(data, input) {
        //         var query, input = _.find(input, function(d) {
        //             return d.location;
        //         });

        //         if (data && data.location && data.location[0]) {
        //             query = data.location[0].value;
        //         } else if (input && input.location && input.location[0]) {
        //             query = input.location[0].value;
        //         }
        //         return 'map';
        //     },
        //     'map': function(data, input) {

        //         var url = URI(API.google.endpoint.maps.embed + "place").query({
        //             q: data.location[0].value,
        //             key: API.google.token
        //         }).toString();

        //         return "<iframe seamless fit src='" + url + "'>"
        //     },
        //     'direction': function(data, input) {

        //         var origin, destination;

        //         console.log(data, input);

        //         if (data && data.origin && data.origin[0] && data.destination && data.destination[0]) {
        //             origin = data.origin[0].value;
        //             destination = data.destination[0].value;
        //         } else {
        //             origin = input[0].location[0].value;
        //             destination = input[1].location[0].value;
        //         }

        //         var url = URI(API.google.endpoint.maps.embed + "directions").query({
        //             origin: origin,
        //             destination: destination,
        //             key: API.google.token
        //         }).toString();

        //         // return '<mx-direction startAddress="'+origin+'" endAddress="'+destination+'"></mx-direction>';
        //         return "<iframe seamless fit src='" + url + "'>"
        //     }
        // };
        // _.extend(Formula, functionMap);


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





====



    //Dev Events
    // 'dblclick .objectarray > li': function(e) {
    //     if (e.shiftKey) {

    //         var next, link;

    //         var direction = 'down';
    //         var offset = 0;

    //         while (true) {

    //             next = Action.findNextSquare(mx.current, direction, offset);

    //             var payload = _.pick(mx.current, 'fn', 'value', 'style', 'url');

    //             payload.link = [];

    //             for (var i = 0; i < mx.current.link.length; i++) {
    //                 link = Squares.findOne(mx.current.link[i]);
    //                 nextLink = Action.findNextSquare(link, direction, offset);

    //                 //If cell is blank
    //                 if (!nextLink.value || typeof nextLink.value !== typeof link.value) {
    //                     return;
    //                 }

    //                 payload.link.push(nextLink._id);
    //             }

    //             Squares.update(next._id, {
    //                 $set: payload
    //             }, (function(id) {
    //                 return function() {
    //                     Action.refresh(Squares.findOne(id));
    //                 };
    //             })(next._id));

    //             offset++;
    //         }

    //     } else {

    //         var $li = $(e.currentTarget);
    //         var arrItem = this.value[$li.index()];
    //         var newItem;

    //         //HARDCODED
    //         if (arrItem.href) {
    //             if (arrItem.href.match(/spotify:track:(.+)/)) {
    //                 var trackID = arrItem.href.match(/spotify:track:(.+)/)[1];
    //                 url = 'https://play.spotify.com/track/' + trackID;

    //                 Squares.update(this._id, {
    //                     $unset: {
    //                         fn: null
    //                     },
    //                     $set: {
    //                         url: url
    //                     }
    //                 }, (function(id) {
    //                     return function() {
    //                         Action.refresh(Squares.findOne(id));
    //                     };
    //                 })(this._id));
    //             }

    //         } else {

    //             newItem = {
    //                 '_type': 'fb_user',
    //                 'id': arrItem.id,
    //                 'name': arrItem.name
    //             };

    //             Squares.update(this._id, {
    //                 $unset: {
    //                     fn: null
    //                 },
    //                 $set: {
    //                     value: newItem
    //                 }
    //             }, (function(id) {
    //                 return function() {
    //                     Action.refresh(Squares.findOne(id));
    //                 };
    //             })(this._id));

    //         }
    //     }
    // },

    // 'mouseover .objectarray > li': function(e) {
    //     var $li = $(e.currentTarget);

    //     $li.draggable({
    //         appendTo: 'body',
    //         containment: $('body'),
    //         helper: 'clone'
    //     });

    //     return false;
    // }


    // Squares.find({
    //     link: mx.current._id
    // }).forEach(function(tile) {
    //     Action.refresh(tile);
    // });

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


    // Action.edit();
        // if (e.shiftKey) {
        //     //Shift Click
        //     mx.state.endSelect = this;
        //     Action.multiselect(mx.current, mx.state.endSelect);
        //     Session.set('current', this);
        // } else if (e.metaKey || e.ctrlKey) {
        //     // Control Click
        //     Squares.update(this._id, {
        //         $set: {
        //             selected: true
        //         }
        //     });
        // } else {
        //     //Default Click
        //     Action.deselect();

        //     Session.set('current', this);
        // }



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



    Move cursor


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





    ======


// Template.toolbox.stencils = function() {
//  return Stencils.find({});
// };

// Template.toolbox.events = {
//  'click button.login-button': Action.login,
//  'click button.logout-button': Action.logout,
//  'click button.new-canvas-button': Action.newCanvas,
//  'click button.add-stencil-button': Action.addStencil,
//  'click button.clear-canvas-button': Action.resetCanvas,
//  'click .square': Action.copyStencil,
//  'dblclick .square': Action.deleteStencil
// };




    // "result spotify-search": function(e) {
    //  Session.set("spotify-search-result", e.target.result);
    // },
    // "result freebase-search": function(e) {
    //  Session.set("freebase-search-result", e.originalEvent.detail);
    // }


    
// Template.background.color = function() {
//     var list = [{
//         a: '#5C258D',
//         b: '#4389A2'
//     }, {
//         a: "#757F9A",
//         b: "#D7DDE8"
//     }, {
//         a: "#283048",
//         b: "#859398"
//     }, {
//         a: "#ED4264",
//         b: "#FFEDBC"
//     }, {
//         a: "#EC6F66",
//         b: "#F3A183"
//     }, {
//         a: "#a73737",
//         b: "#7a2828"
//     }]
//     var c = Canvases.findOne();
//     var value;

//     return _.sample(list);
// }



====



Graph Paper reimagines Excel for the web. It introduces a new concept of linking cells together and enables users to input custom JavaScript functions as a cell's formula. It also allows you to call various web services/APIs by invoking keywords and providing the required parameters.

This project was extended for a proof of concept built for the Facebook Singapore Hackathon held from 15th to 16th Feb 2014. Click <a href="#facebook-singapore-hackathon">here</a> for more information about the prototype.

## Supported Web Services/APIs
* Facebook Graph API
* Spotify
* Google Maps
* YouTube

### Use Kimono to import any websites data into Graph Paper
https://www.kimonolabs.com/ is the recommended way of turning websites into structured APIs.

## Facebook Singapore Hackathon
We built a prototype to demonstrate how Facebook's Graph search (search box on top of the Facebook page) could be extended to provide more meaningful information to users and allow them do interesting things with it. For the hackathon, we built two examples/use cases around Facebook events.



### Demo Use Case 1: Music Preferences Amongst Event Attendees
We allowed people to find out the favourite music artists/bands amongst all the people attending a particular event. Once they know the artists, we gave them an option to play songs from those artists through Spotify.

1. Enter `Facebook Singapore Hackathon` in a cell of your choice
2. In another cell, type in `event called` and link it to the cell used in step 1 (Cmd/Ctrl + click)
3. The cell will load the event picture and title. This cell can now be used to identify the event in future API calls
4. In any blank cell, type in `people going to` and link it to the cell used in step 3 (Cmd/Ctrl + click)
5. A list of all the people attending the event will be rendered in the chosen cell. This cell can be used to identify the event attendees in future API calls
6. In yet another blank cell, enter `favourite music of` and then link it to the list of people created in step 5
7. A list of the most popular artists amongst all the attendees will be rendered within the cell (in descending order)

### Demo Use Case 2: Mutual Friends Amongst Event Attendees
Second, we built an example from the point of view of an attendee. We allowed people to search for mutual friends amongst all the people attending an event.

1. Enter `Facebook Singapore Hackathon` in a cell of your choice
2. In another cell, type in `event called` and link it to the cell used in step 1 (Cmd/Ctrl + click)
3. The cell will load the event picture and title. This cell can now be used to identify the event in future Facebook Graph API calls
4. In any blank cell, type in `people going to` and link it to the cell used in step 3 (Cmd/Ctrl + click)
5. A list of all the people attending the event will be rendered in the chosen cell. This cell can be used to identify the event attendees in future API calls
6. In yet another blank cell, enter `mutual friends of` and then link it to the list of people created in step 5
7. A list of people you share mutual friends with will be rendered within the cell (in descending order)

==

### Demo
http://graphpaper.meteor.com

### How to run the app on your own machine

Step 1: Install Meteor

`curl https://install.meteor.com | /bin/sh`


Step 2: download this repository, unzip, and navigate to the directory


Step 3: Start the server

`meteor`


#### Demo 1: (Move cursor, Menu, Hotkeys, Merge Cell, Copy, Paste)

Hello World!


#### Demo 2: (Function, Links, Remove Links)

Window height

X^2

Fibonacci



#### Demo 3: Full Example

map of London bridge

map of Tokyo Station

streetview stencil

music search


Features Overview
-----------------
* Realtime sync across multiple clients

* `Click` to select a cell
* `Shift + Click` to select multiple cells

* `Enter` to edit value
* `f` to edit function
* `r` to re-compute value
* `c or s` to edit css/style
* `l` to edit links
* `u` to edit url
* `m` to merge multiple selected cells
* `m` again to unmerge the single selected cell

* `Cmd + C` to Copy
* `Cmd + V` to Paste
* `Cmd + X` to Cut
* `Backspace` to clear cell's value
* `Backspace` again on a empty big merged cell will split the cell

* Arrow keys to move cursor

### Value field
* Accept natural language values e.g. "map of tokyo station"
* Accept Youtube URL
* Accept links to other cells e.g. "Hello link[0], welcome to link[1]."
* Accept Array object and automatically renders a List in flat UI

### Function field
* Accept javascript code as input. (requires 'return' statement)
* Javascript can access Underscore (_), jQuery ($), linked cells as an array (link)
* Accept HTML string as return value
* Accpet Array object as return value


## Advanced Function examples
`
    //Use underscore defer to delay a function's execution
    _.defer(function() {
        var bryantPark = new google.maps.LatLng(37.869260, -122.254811);
        var panoramaOptions = {
            position: bryantPark,
            pov: {
                heading: 165,
                pitch: 0
            },
            zoom: 1
        };

        var myPano = new google.maps.StreetViewPanorama(
            $('#streetview-' + ID)[0], //reference to an element that 
            panoramaOptions);
        myPano.setVisible(true);
    });

    return '<div id="streetview-' + ID + '"></div>'
`

### Style
* Accept special CSS style for each individual cell
* Accept Server side web crawling using input URL and Javascript function
* Toolbox to save a cell for later use

* Pan the canvas using mouse drag

## In the pipeline
* Multiple canvas instance (pastebin style)
* Option for password protected canvas
* Increase canvas size (1024 * 1024)?
* Intro Tour
* More sidebar features
* Auto parsing of objects
* Add full Google Maps Javascript features

## Architecture and Technology Stack
Magic Square is a web application running on top of the Meteor Framework http://meteor.com 
Client and Server share the same database API (MongoDB). Every client includes an in-memory database cache (minimongo). To manage the client cache, the server publishes sets of JSON documents, and the client subscribes to those sets. As documents in a set change, the server patches each client's cache. Details of how Meteor works can be found on http://docs.meteor.com/


## Security
Magic Square makes use of multiple javascript techniques that are considered insecure. The author is well aware of the security issues with allowing eval(), new Function(), and user generated HTML. However, as the dynamic modifiability of javascript functions, css, and HTML is a core feature of this application, it does not make sense to enforce strict browser policy. Hacking techniques like cross-site scripting and clickjacking are likely to occur on the publicly hosted version of this app. Infact, users are encouraged to utilize these techniques to augment the application's functionalities. Do not use this site for sensitive transactions.





=====

// fetch: function(url, statements, _id) {
            // var cheerio = Meteor.npmRequire('cheerio');
            // Meteor.http.get(url, function(error, response) {
            //     var $, data, fn;

            //     if (response.headers['content-type'].match(/text\/html/)) {

            //         $ = cheerio.load(response.content);
            //         fn = new Function(['$', 'ID'], statements);

            //     } else if (response.headers['content-type'].match(/application\/json/)) {

            //         $ = JSON.parse(response.content)
            //         fn = new Function(['data', 'ID'], statements);

            //     }

            //     var result = fn($, _id);

            //     if (result === undefined || result === null) return;

            //     Squares.update(_id, {
            //         $set: {
            //             value: result,
            //         }
            //     });
            // });
        // }