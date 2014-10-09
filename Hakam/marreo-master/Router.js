Router.onBeforeAction(function(pause) {
    if (!Meteor.user()) {
        Router.go('/login');
    }
}, {
    only: ['home', 'canvas']
});

// Basic Router
Router.map(function() {
    //Need to Lock to access right
    this.route('admin', {
        path: '/admin'
    });

    this.route('home', {
        path: '/',
        layoutTemplate: 'layout'
    });

    this.route('canvas', {
        path: '/canvas/:_id',
        template: 'canvas',
        layoutTemplate: 'layout',
        onBeforeAction: function() {
            if (!Meteor.user()) {
                // render the login template but keep the url in the browser the same
                // this.redirect('login');

                // pause this rendering of the rest of the before hooks and the action function 
                // pause();
            } else {
                this.render('loading');
            }
        },
        waitOn: function() {
            var reservedNames = ['about', 'canvas', 'admin'];

            if (_.contains(reservedNames, this.params._id)) {
                console.error('reserved name');
            }

            currentCanvas.set(Canvases.findOne(this.params._id));
            return [Meteor.subscribe('canvasAndSquares', this.params._id)];
        }
    });

    this.route('widgets', {
        path: '/widgets',
        layoutTemplate: 'layout'
    });

    this.route('login', {
        path: '/login'
    });
});
