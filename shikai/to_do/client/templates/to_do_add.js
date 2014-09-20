Template.toDoAdd.events({
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