Template.toDoCard.helpers({
	toDoItems: function() {
		return ToDoClient.find();
	}
});

Template.toDoCard.events({
	'click #submit': function(e) {
		e.preventDefault();

		var item = {
			title: $("form").find('[name=title]').val(),
			description: $("form").find('[name=description]').val(),
			date: "",
			completed: false
		};

		console.log(item);
		ToDoClient.insert(item);
	}
});