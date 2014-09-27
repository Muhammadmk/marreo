//toDoServer is the syntax use in Mongo shell, ToDoClient is the syntax use in client browser
ToDoClient = new Meteor.Collection("toDoServer");

Meteor.methods({
	complete_fn : function(itemId, completed) {
		var c_boolean = !completed;
		console.log("Hello");
		ToDoClient.update(
			{_id : itemId}, 
			{"$set" : {completed: c_boolean}
		});
	}
});