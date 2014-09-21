toDoByMonth = [[],[],[],[],[],[],[],[],[],[],[],[]];

Template.toDoList.helpers({
	toDoList: function() {
		var toDoList = ToDoClient.find().fetch();
		console.log(toDoList);
		_.each(toDoList, function(item) {
			console.log(item);
			var monthNum = item.date.getMonth();
			toDoByMonth[monthNum].push(item);
		});
		console.log(toDoByMonth);
		test = toDoByMonth;
		return toDoByMonth;
	},

	toDoItems: function() {
		console.log("WOOOOO");
		console.log(test);
		return test[0];
	}
});