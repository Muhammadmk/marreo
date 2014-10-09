// Kadira.connect("GgE2jAp2mghNviRzS", "e0e8e0e1-69a2-42d9-a10e-972636c4fbcc");

if (Meteor.isServer) {
    //Canvas Methods
    Meteor.methods({
        create: function(title, width, height) {
            check(title, Match.NonEmptyString);
            check(height, Match.Integer);
            check(width, Match.Integer);
            check(Meteor.user(), Match.Any);

            return Canvases.insert({
                title: title,
                height: height,
                width: width,
                created: new Date(),
                owner: Meteor.userId()
            });
        },
        delete: function(_id) {
            check(_id, Match.ID);
            
            Canvases.remove(_id);
            Squares.remove({
                canvasId: _id
            });
        },
        reset: function(canvasId) {
            Meteor.call('clear', canvasId);
            // Meteor.call('initialize', canvasId);
        },
        clear: function(canvasId) {
            Squares.remove({
                canvasId: canvasId
            });
        },
        initialize: function(canvasId) {
            //
        },
        clearAll: function() {
            Squares.remove({});
        },
        proxy: function(url, options) {
            return HTTP.get(url, options);
        }
    });
}
