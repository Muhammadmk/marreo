https://www.marinetraffic.com/img/pages/nautical-charts.png
"http://map.openseamap.org/weather.php"




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