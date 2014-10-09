Template.embed.rendered = function() {
    var input = this.$('textarea');
    var save = this.$('.save');
    var square = this.data;

    var embed = function(value) {
        if (value.length == 0) return;

        if (mx.regexp.url.test(value)) {
            var url = value;

            HTTP.get(API.iframely.endpoint, {
                params: {
                    url: url,
                    api_key: API.iframely.token
                }
            }, function(error, response) {
                if (response.data) {
                    console.log(response.data);

                    square.setData({
                        type: 'embed',
                        value: response.data.html
                    });
                }
            });
        } else {
            square.setData({
                type: 'embed',
                value: value
            });
        }
    }

    if (_(square).valueForKeyPath("data.params.url")) {
        embed(square.data.params.url);
    }

    var handler = function() {
        embed(input.val().trim());
    }

    $(input).on('blur', handler);
    $(save).click(handler);
}

Template.embed.dataIsEmbedable = function() {
    if (this.data.type == 'embed') {
        return true;
    }
}
