var create = false;
var createDep = new Tracker.Dependency;

Template.todo.createReactive = function() {
    createDep.depend();
    return create;
};


Template.todo.events({
    'click a.create': function() {
        create = true;
        createDep.changed();
    },
    'click a.back': function() {
        create = false;
        createDep.changed();
    },
    'click #submit': function() {
        create = false;
        createDep.changed();
    }
});
