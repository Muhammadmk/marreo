Template.embed.rendered = function() {
    var input = this.findAll('textarea')[0];
    var that = this;

    $(input).on('input', function() {
        console.log(input.value);
        if (input.value.match(/\A(?:(?:https?):\/\/)?(?:\S+(?::\S*)?@)?(?:(?:([a-z0-9][a-z0-9\-]*)?[a-z0-9]+)(?:\.(?:[a-z0-9\-])*[a-z0-9]+)*(?:\.(?:[a-z]{2,})(:\d{1,5})?))(?:\/[^\s]*)?\z/i)) {
            //URL
            that.data.setData({
                type: 'url',
                value: input.value
            });
        } else {
            that.data.setData({
                type: 'embed',
                value: input.value
            });
        }
    })
}

Template.embed.dataIsEmbedable = function() {
    if (this.data.type == 'embed' || this.data.type == 'url') {
        return true;
    }
}
