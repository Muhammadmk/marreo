Template.toDoItem.events({
	'click .completedCheck': function(e) {
		e.preventDefault();
		console.log(this);
		var c_boolean = !completed;
		ToDoClient.update(
			{_id : this._id}, 
			{"$set" : {completed: c_boolean}
		});
	},

	'click .deleteItem': function(e) {
		e.preventDefault();
		console.log(this);
		ToDoClient.remove(
			{_id : this._id}
		);
	},

	'click .editItem': function(e) {
		e.preventDefault();
		console.log(this);
		editItem: "MA MA";
	}
});

// Template.toDoItem.helper({
// 	isCompleted: function() {
// 		console.log(this);
// 		if (this.completed) {
// 			return "true";
// 		} 
// 	}
// });