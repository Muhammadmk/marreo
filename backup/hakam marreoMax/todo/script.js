var create = false;
var createDep = new Tracker.Dependency;
var editObjectDep = new Tracker.Dependency;
var editObject;

var title = "";
var description = "";
var date = "";

var arrayObjectIndexOf = function(myArray, searchTerm, property) {
    for(var i = 0, len = myArray.length; i < len; i++) {
        if (myArray[i][property] === searchTerm) return i;
    }
    return -1;
}

Template.todo.createReactive = function() {
    createDep.depend();
    return create;
};

Template.todo.editObjectReactive = function() {
    editObjectDep.depend();
    return editObject;
};

Template.todo.helpers({
    toDoList: function() {
        var toDoList = this.data.value.items;

        var groups = [{
            key: "overdue",
            items: []
        }, {
            key: "Days before",
            items: []
        }, {
            key: "Weeks before",
            items: []
        }, {
            key: "Months before",
            items: []
        }]


        _.reduce(toDoList, function(memo, value) {
            var endDate = moment();
            value.prettyDate = moment(value.date).from(endDate);

            if (moment(value.date).diff(endDate, 'months') >= 1) {
                memo[3].items.push(value);
            } else if (moment(value.date).diff(endDate, 'weeks') >= 1) {
                memo[2].items.push(value);
            } else if (moment(value.date).diff(endDate, 'days') >= 0) {
                memo[1].items.push(value);
            } else {
                memo[0].items.push(value);
            }

            return memo;
        }, groups);

        _.each(groups, function(value) {
            var countCompleted = _.countBy(value.items, function(i) {
                return i.completed;
            });

            value.progress = (countCompleted.true ? countCompleted.true : 0) + "/" + value.items.length;
            // body

        });
        // console.log(groups);
        return groups
    }
});


Template.todo.events({
    'click a.create': function() {
        create = true;
        createDep.changed();
    },
    'click a.back': function() {
        create = false;
        editObject = false;
        createDep.changed();
        editObjectDep.changed();
    },
    'click a.edit': function() {
        console.log("enter here");
        editObject = this;
        var date = editObject.date;
        editObject.date = moment(date).format('YYYY-MM-DD');
        create = true;
        createDep.changed();
        editObjectDep.changed();
    },
    'click .completedCheck': function(event, template) {
        // "this" is a todoItem
        // "that" is a todoSquare
        var that = template.data;
        console.log(that);
        var item = _.findWhere(that.data.value.items, {
            _id: this._id
        });

        item.completed = !item.completed;

        that.setData(that.data);
        console.log(that);
    },
    'click a.delete': function(event, template) {
        var index = arrayObjectIndexOf(template.data.data.value.items, this._id, "_id");
        template.data.data.value.items.splice(index, 1);
        template.data.setData(template.data.data);
    },
    'click #addToDo': function(e, template) {
        e.preventDefault();

        var item = {
            _id: Random.id(),
            title: template.$('[name=title]').val(),
            description: template.$('[name=description]').val(),
            date: new Date(template.$('[name=date]').val()),
            completed: false
        };

        var dateObj = new Date(item.date);

        //Initialize is there is no data
        if (this.data && this.data.value && this.data.value.items) {} else {
            this.data = {
                value: {
                    items: []
                }
            }
        }

        this.data.value.items.push(item);
        this.setData(this.data);

        create = false;
        createDep.changed();
    },
    'click #editToDo': function(e, template) {
        e.preventDefault();

        var newItem = {
            _id: editObject._id,
            title: template.$('[name=title]').val(),
            description: template.$('[name=description]').val(),
            date: new Date(template.$('[name=date]').val()),
            completed: false
        };

        var that = template.data;
        console.log(that);
        var oldItem = _.findWhere(that.data.value.items, {
            _id: editObject._id
        });
        console.log(oldItem);

        oldItem = newItem;

        //TODO make change to that data object
        that.setData(that.data);
        console.log(that);

        create = false;
        createDep.changed();
        editObject = false;
        editObjectDep.changed();
    }
});