Template.layout.helpers({
    canvases: function() {
        return Canvases.find();
    },
    favouriteCanvases: function() {
        return Canvases.find({
            star: true
        });
    },
    autoenhance: function() {
        if (UserSession.get('autoenhance') === true) {
            return 'checked';
        }
    },
    lock: function() {
        if (currentCanvas.get().lock === true) {
            return 'checked'
        } else {
            return;
        }
    }
});

Template.layout.events({
    'click i[name=addFavourite]': function() {
        Canvases.update(currentCanvas.get()._id, {
            $set: {
                star: true
            }
        });
        console.log('addFavourite');
    },
    'click i[name=removeFavourite]': function() {
        Canvases.update(currentCanvas.get()._id, {
            $set: {
                star: false
            }
        });
        console.log('removeFavourite');
    },
    'click i[name=deleteCanvas]': function(e) {
        var canvas = this;
        bootbox.confirm("Once you delete a workspace, there is no going back. Please be certain.", function(confirm) {
            console.log(confirm, canvas._id);
            if (confirm) {
                Meteor.call('delete', canvas._id, function(error, result) {
                    console.log(error, result);
                });
            }
        });

        e.stopPropagation();
        e.preventDefault();
    },
    'click input[name=autoenhance]': function(event) {
        UserSession.set('autoenhance', !UserSession.get('autoenhance'));
    },
    'click a[name=lock]': function(event, template) {
        currentCanvas.get().toggleLock();
    },
    'click a[name=fullscreen]': function(event, template) {
        $('#canvas-container').parent().css({
            'position': 'fixed',
            'left': 0,
            'height': '100%',
            'width': '100%',
            'z-index': 9000
        }).attr('id', '');

        $('#canvas-container').css({
            'min-width': '100%',
            'min-height': '100%'
        });

        $('button[name=fullscreen-off]').show();
    },
    'click button[name=fullscreen-off]': function() {
        $('#canvas-container').parent().css({
            'position': 'relative',
            'height': 'auto',
            'width': 'auto',
            'z-index': 0
        }).attr('id', 'page-content');

        $('#canvas-container').css({
            'min-width': 'initial',
            'min-height': 'initial'
        });

        $('button[name=fullscreen-off]').hide();
    },
    'click .sidebar-themes a': function(event) {
        var color = $(event.currentTarget).data('color')
        console.log(color);
        currentCanvas.setBackground(color);
    },
    'click a[name=create]': function() {
        document.getElementById('create-canvas').toggle();
        $('#canvas-title').focus();
    }
});
