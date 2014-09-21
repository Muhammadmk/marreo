Template.toDoItem.events({
	'click .completedCheck': function(e) {
		e.preventDefault();
		console.log(this);
		Meteor.call('complete_fn', this._id, this.completed);
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