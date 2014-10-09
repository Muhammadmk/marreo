Template.twitter.created = function () {
    console.log(this.data);
};

Template.twitter.rendered = function() {
    twttr.widgets.load();
};

Template.twitter.events({
    'click [name=save]': function(event, template) {
        Squares.update(mx.current._id, {
            $set: {
                height: 4,
                width: 3,
                data: {
                    value: {
                        username: template.find('input.screen-name').value
                    }
                }
            }
        }, function () {

            twttr.widgets.load();
        });
    }
});
