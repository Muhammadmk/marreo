Template.people.events({
    'submit form': function(e, template) {
        e.preventDefault();

        var rawName = template.$('[name=rawName]').val();
        var email = template.$('[name=email]').val();
        var username = template.$('[name=username]').val();
        console.log(email, rawName, username);
        template.find('mx-pipl').search(email, username, rawName)
    },
    'result mx-pipl': function(e, template) {


        var records = e.originalEvent.detail.value.records;
        var square = this;
        records = _.filter(records, function(value, key, list) {
            return value['@query_person_match'] > 0.8;
        });

        console.log(records);

        records = _.map(records, function(r) {
            var profile = {};
            profile.name = _.first(_.pluck(r.names, 'display')) || _.last(_.pluck(r.usernames, 'content'));
            profile.avatar = _.first(_.pluck(r.images, 'url'));
            profile.url = r.source.url;
            profile.source = _.last(r.source.domain.match(/\w+(?=\.)/g))
            return profile;
        });

        _.each(records, function(value, i) {
            Action.spawn(square, {
                x: square.width + 1 + (i % 2) * 2,
                y: Math.floor(i / 2) * 2
            }, {
                height: 2,
                width: 2
            }, {
                value: value
            }, 'people')
        });

        // square.setData(square.data);
    }
});

Template.people.helpers({
    wide: function() {
        return this.height < this.width;
    },
    bigger: function (height, width) {
    	return this.height > height && this.width > width;
    },
    size: function (height, width) {
    	return this.height == height && this.width == width;
    },
});
