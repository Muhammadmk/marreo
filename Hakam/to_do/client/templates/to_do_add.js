Template.toDoAdd.events({
	'click #submit': function(e) {
		e.preventDefault();

		var item = {
			title: $("form").find('[name=title]').val(),
			description: $("form").find('[name=description]').val(),
			date: new Date($("form").find('[name=date]').val()),
			completed: false
		};

		var dateObj = new Date(item.date);
		console.log(item);
		console.log(typeof item.date);
		console.log(typeof dateObj);
		console.log(dateObj.valueOf());
		
		ToDoClient.insert(item);
	}
});