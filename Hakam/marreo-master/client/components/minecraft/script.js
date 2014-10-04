//Initialize Data Structure in the Square
Template.minecraft.created = function() {
    var square = this.data;

    //Local reactive variable tied to the template instance.
    this.color = new ReactiveVar("#e67e22");
    this.dragged = false;

    if (!_.valueForKeyPath(square, 'data.value.boxes')) {
        square.setData({
            value: {
                boxes: []
            }
        })
    }
};

//On rerender, reattach plugins
Template.minecraft.rendered = function() {
    x3dom.reload();
}

Template.minecraft.helpers({
    boxes: function() {
        //Read
        var square = Squares.findOne(this._id, {
            fields: {
                "data.value.boxes": 1
            }
        });

        return square.data.value.boxes;
    },
    active: function() {
        if (this.valueOf() === Template.instance().color.get()) {
        	return "active";
        }
    },
    colors: ["#95a5a6", "#40d47e", "#3498db",
        "#f1c40f", "#e67e22", "#34495e"
    ]
});

Template.minecraft.events({
    "click .swatch": function(e, template) {
        template.color.set(this.valueOf());
    },
    "mousedown x3d": function() {
        dragged = false;
    },
    "mousemove x3d": function() {
        dragged = true;
    },
    "mouseup shape": function(e, template) {
        console.log(e);

        if (!dragged && e.button === 1) {
            var square = Squares.findOne(this._id);

            //Create
            Squares.update(mx.current._id, {
                $push: {
                    'data.value.boxes': {
                        _id: Random.id(),
                        color: template.color.get(),
                        x: Math.floor(e.worldX + e.normalX / 2) + 0.5,
                        y: Math.floor(e.worldY + e.normalY / 2) + 0.5,
                        z: Math.floor(e.worldZ + e.normalZ / 2) + 0.5
                    }
                }
            });

        } else if (!dragged &&
            (e.button === 4 || e.button === 2)) {

            //Update/Delete
            Squares.update(mx.current._id, {
                $pull: {
                    'data.value.boxes': {
                        '_id': this._id
                    }
                }
            });
        }
    }
});
