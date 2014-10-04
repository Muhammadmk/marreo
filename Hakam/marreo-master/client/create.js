Template.create.events({
    'click #submit-button': function() {
        var title = document.getElementById('canvas-title').value;
        var password = document.getElementById('canvas-password').value;

        document.getElementById('submit-button').value = 'creating...';
        document.getElementById('submit-button').disabled = true;

        console.log(title, password);

        Meteor.call('create', title, password, function(error) {
            if (error) {
                console.error(error);
                document.getElementById('toast').text = 'Name already taken. Please choose another name.';
                document.getElementById('toast').show();

                document.getElementById('canvas-title').focus();

                document.getElementById('submit-button').value = 'Create';
                document.getElementById('submit-button').disabled = false;
            } else {
                Router.go('/' + title);

                var dialog = document.getElementById('create-canvas');
                if (dialog.opened) {
                    dialog.toggle();
                }
            }
        });
    }
});
