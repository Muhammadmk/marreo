Template.toDoList.helpers({
	toDoItems: function() {
		return ToDoClient.find();
	}
});