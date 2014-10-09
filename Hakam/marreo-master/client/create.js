Template.create.events({
    'click div[name=submit-button]': function(event, template) {
        event.preventDefault();

        var submitButton = template.$('button[name=submit-button]');
        var title = template.$('#canvas-title').val();

        if (title.length === 0) {
            template.$('#canvas-title').focus()
            template.$('#canvas-title').parents('.form-group').addClass('has-error');
            return;
        }
        var height = template.$('.table-pricing.table-featured').data('height');
        var width = template.$('.table-pricing.table-featured').data('width');

        submitButton.val('creating...');
        submitButton.addClass('disabled');

        check(title, Match.NonEmptyString);
        check(height, Match.Integer);
        check(width, Match.Integer);

        Meteor.call('create', title, width, height, function(error, _id) {
            if (error) {
                console.error(error);
                document.getElementById('toast').text = 'Name already taken. Please choose another name.';
                document.getElementById('toast').show();
            } else {
                Router.go('/canvas/' + _id);
                submitButton.val('Create');
                submitButton.removeClass('disabled');
                template.$('#canvas-title').parents('.form-group').removeClass('has-error');
                
                $('.table-pricing').removeClass('table-featured table-muted');
                var dialog = document.getElementById('create-canvas');
                if (dialog.opened) {
                    dialog.toggle();
                }
            }
        });
    },
    'click .table-pricing': function(e) {
        $('.table-pricing').addClass('table-muted');
        $('.table-pricing.table-featured').removeClass('table-featured');
        $(e.currentTarget).addClass('table-featured').removeClass('table-muted');;
    }
});
