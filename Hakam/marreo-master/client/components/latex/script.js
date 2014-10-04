Template.latex.created = function() {
    this.edit = new ReactiveVar(true);
};

Template.latex.rendered = function() {
    $(this.$('.katex')).fitText();
};

Template.latex.helpers({
    edit: function() {
        return Template.instance().edit.get();
    }
});

Template.latex.events({
    'click .edit': function(event, template) {
        template.edit.set(false);
    },
    'blur textarea': function(event, template) {
        Squares.update(mx.current._id, {
            $set: {
                data: {
                    value: event.target.value
                }
            }
        });

        template.edit.set(true);
    }
});
