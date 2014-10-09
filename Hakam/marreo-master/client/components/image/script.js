Template.image.rendered = function() {
    var input = this.$('input');
    var save = this.$('.save');
    var square = this.data;

    var wrap = function(value) {
        if (value.length == 0) return;

        if (value.match(mx.regexp.url)) {
            square.setData({
                type: 'image',
                value: value
            });

            square.setSize(3, 3);
        }
    }

    if (_(square).valueForKeyPath("square.params.url")) {
        wrap(square.params.url);
    }

    var handler = function() {
        wrap(input.val().trim());
    }

    $(save).click(handler);
}
