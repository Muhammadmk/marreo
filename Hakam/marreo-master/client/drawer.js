Template.drawer.first = function(images) {
    if (images) return images[0];
};

Template.drawer.format = function(description) {
    var lines = description.split("\n");
    var formatted = _.reduce(lines, function(memo, text) {
        return memo + "<p>" + text + "</p>";
    }, "");

    //TODO Auto highlight links? and more style highlights
    return formatted;
};

Template.drawer.searchResult = function() {
    return Session.get("search-result");
};

Template.drawer.events = {
    "blur #search": function(e) {
        $('freebase-search').attr("value", e.target.value);
        // $('spotify-search').attr("query", e.target.value);
    },
    "result mx-search": function(e) {
        console.log(e);
        Session.set("search-result", e.originalEvent.detail);
    },
    'drag-start': function(e) {
        var that = this;
        var dragInfo = e.originalEvent.detail;
        console.log(dragInfo);
        console.log(that);

        // if ()
        dragInfo.drag = function() {};
        dragInfo.drop = function(e) {
            var dropID = e.event.relatedTarget.id || e.event.relatedTarget.parentElement.id;
            console.log("Drop on ", dropID);
            console.log(that);

            if (Squares.findOne(dropID)) {
                Squares.update(dropID, {
                    $set: {
                        command: null,
                        data: that
                    }
                });
            } else {
                dropID = Action.materialize(_.extend(Background.findOne(dropID), {
                    height: 3,
                    width: 3,
                    data: that
                }));
            }

            var tile = Squares.findOne(dropID);
            Session.set('current', tile);
            Action.resolveOverlap(tile, Action.checkOverlap(tile));
        };
    }
};