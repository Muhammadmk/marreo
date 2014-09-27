Template.toDoCard.helpers({
	toDoItems: function() {
		return ToDoClient.find();
	}
});

Template.toDoCard.events({

	// add item
	'click .addItemSubmit': function(e) {
		e.preventDefault();

		var item = {
			title: $("form").find('[name=title]').val(),
			description: $("form").find('[name=description]').val(),
			date: "",
			completed: false
		};

		// reset the input field
		$("form").find('[name=title]').attr("value", "");
		// insert into collection
		ToDoClient.insert(item);
	},

	// check box
	'click .completedCheck': function(e) {
		e.preventDefault();
		console.log(this.completed);
		ToDoClient.update(this._id, {"$set" : {completed: !this.completed}});
	},

	// delete to do
	'click .deleteItemBtn': function(e) {
		e.preventDefault();
		ToDoClient.remove(
			{_id : this._id}
			);
	},

	// edit to do
	'click .editItemBtn': function(e) {
		e.preventDefault();
		$("form").find('[name=title]').attr("value", this.title);
		$('.addItemSubmit').addClass('hide');
		$('.editItemSubmit').removeClass('hide');
		editItemId = this._id;
	},

	'click .editItemSubmit': function(e) {
		var newTitle = $("form").find('[name=title]').val();
		// reset the input field
		$("form").find('[name=title]').attr("value", "");
		$('.editItemSubmit').addClass('hide');
		$('.addItemSubmit').removeClass('hide');
		// update the title of the object
		ToDoClient.update(editItemId, { $set: {'title': newTitle}});
		editItemId = "";
	},

	'click .cancel': function(e) {
		// reset the input field
		$("form").find('[name=title]').attr("value", "");
		$('.editItemSubmit').addClass('hide');
		$('.addItemSubmit').removeClass('hide');
		// update the title of the object
		editItemId = "";
	}
});

Template.toDoCard.rendered = function () {
	$('.editItemSubmit').addClass('hide');
	 $('.content').on('scroll', function () {
        scrollFunction();
    });
};

function scrollFunction() {

    var sticky1 = $('#stickyHeader1');
    var sticky2 = $('#stickyHeader2');

    // sticky1.css({
    //     position: "static",
    //     top: 0
    // });
    // sticky2.css({
    //     position: "static",
    //     top: 0
    // });
    // $('body').css({
    //     "padding-top": 0
    // });

    var topOffset1 = sticky1.offset().top;
    var topOffset2 = sticky2.offset().top;

    console.log("STICKY 1 " + topOffset1);
    console.log("SCROLLING" + $('.content').scrollTop());

    var stickyHeight1 = sticky1.outerHeight();
    var stickyHeight2 = sticky2.outerHeight();

     var scrollHeight = $('.content').scrollTop();

    if (topOffset1 <= scrollHeight && scrollHeight < topOffset2 - stickyHeight1) {
        sticky1.css({
            position: "absolute",
            top: 0
        });
        sticky2.css({
            position: "static",
            top: 0
        });
        // $('body').css({
        //     "padding-top": stickyHeight1
        // });
    } else if (scrollHeight >= topOffset2 - stickyHeight1 && scrollHeight < topOffset2) {
        sticky1.css({
            position: "absolute",
            top: -(scrollHeight - (topOffset2 - stickyHeight1))
        });
        sticky2.css({
            position: "absolute",
            top: stickyHeight1 - (scrollHeight - (topOffset2 - stickyHeight1))
        });
        // $('body').css({
        //     "padding-top": stickyHeight1 + stickyHeight2
        // });
    } else if (scrollHeight >= topOffset2) {
        sticky1.css({
            position: "static"
        });
        sticky2.css({
            position: "absolute",
            top: 0
        });
        // $('body').css({
        //     "padding-top": stickyHeight2
        // });
    } else {
        sticky1.css({
            position: "static",
            top: 0
        });
        sticky2.css({
            position: "static",
            top: 0
        });
        // $('body').css({
        //     "padding-top": 0
        // });
    }

}
