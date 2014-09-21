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
};