Background = new Mongo.Collection(null);
Squares = new Mongo.Collection('square', {
    transform: function(tile) {
        return new Square(tile);
    }
});

Canvases = new Mongo.Collection('canvas', {
    transform: function(canvas) {
        return new Canvas(canvas);
    }
});

if (Meteor.isClient) {
    Meteor.subscribe('userStatus');
    Meteor.subscribe('canvases');
}

if (Meteor.isServer) {
    Meteor.publish("userStatus", function() {
        return Meteor.users.find({
            "status.online": true
        });
    });
    Meteor.publish("canvases", function() {
        return Canvases.find({}, {
            fields: {
                secretInfo: 0
            }
        });
    });
    Meteor.publish('canvasAndSquares', function(canvasId) {
        check(canvasId, Match.ID);

        return [Canvases.find({
            _id: canvasId
        }), Squares.find({
            canvasId: canvasId
        })];
    });
}