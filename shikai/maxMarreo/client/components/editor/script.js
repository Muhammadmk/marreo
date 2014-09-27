Template.editor.rendered = function() {
    $(this.$('textarea')).wysihtml5({
        "font-styles": false,
        "blockquote": false,
        "size": "sm",
        "events": {
            "load": function() {
                console.log("Loaded!");
                $(this.toolbar.contsainer).hide();
                $(this.toolbar.container).find('.dropdown-toggle').dropdown();
            },
            focus: function() {
                $(this.toolbar.container).show();
            },
            "blur": function() {
                console.log("Blured");
                Squares.update(mx.current._id, {
                    $set: {
                        data: {
                            value: this.textareaElement.value
                        }
                    }
                });

                $(this.toolbar.container).hide();
            }
        }
    })
}
