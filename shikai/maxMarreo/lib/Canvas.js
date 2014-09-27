Canvas = function(canvas) {
    _.extend(this, canvas);
};

Canvas.prototype.setBackground = function(color) {
    if (typeof color == "string") {
        Canvases.update(this._id, {
            $set: {
                background: color
            }
        });
    }
};
