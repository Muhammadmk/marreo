Template.layout.rendered = function() {
    App.init();
};

Template.login.rendered = function() {
    /*
     *  Jquery Validation, Check out more examples and documentation at https://github.com/jzaefferer/jquery-validation
     */

    /* Login form - Initialize Validation */
    $('#form-login').validate({
        errorClass: 'help-block animation-slideUp', // You can change the animation class for a different entrance animation - check animations page
        errorElement: 'div',
        errorPlacement: function(error, e) {
            e.parents('.form-group > div').append(error);
        },
        highlight: function(e) {
            $(e).closest('.form-group').removeClass('has-success has-error').addClass('has-error');
            $(e).closest('.help-block').remove();
        },
        success: function(e) {
            e.closest('.form-group').removeClass('has-success has-error');
            e.closest('.help-block').remove();
        },
        rules: {
            'login-email': {
                required: true,
                email: true
            },
            'login-password': {
                required: true,
                minlength: 5
            }
        },
        messages: {
            'login-email': 'Please enter your account\'s email',
            'login-password': {
                required: 'Please provide your password',
                minlength: 'Your password must be at least 5 characters long'
            }
        }
    });
};

Template.register.rendered = function() {
    /*
     *  Jquery Validation, Check out more examples and documentation at https://github.com/jzaefferer/jquery-validation
     */

    /* Register form - Initialize Validation */
    $('#form-register').validate({
        errorClass: 'help-block animation-slideUp', // You can change the animation class for a different entrance animation - check animations page
        errorElement: 'div',
        errorPlacement: function(error, e) {
            e.parents('.form-group > div').append(error);
        },
        highlight: function(e) {
            $(e).closest('.form-group').removeClass('has-success has-error').addClass('has-error');
            $(e).closest('.help-block').remove();
        },
        success: function(e) {
            if (e.closest('.form-group').find('.help-block').length === 2) {
                e.closest('.help-block').remove();
            } else {
                e.closest('.form-group').removeClass('has-success has-error');
                e.closest('.help-block').remove();
            }
        },
        rules: {
            'register-username': {
                required: true,
                minlength: 3
            },
            'register-email': {
                required: true,
                email: true
            },
            'register-password': {
                required: true,
                minlength: 5
            },
            'register-password-verify': {
                required: true,
                equalTo: '#register-password'
            },
            'register-terms': {
                required: true
            }
        },
        messages: {
            'register-username': {
                required: 'Please enter a username',
                minlength: 'Please enter a username'
            },
            'register-email': 'Please enter a valid email address',
            'register-password': {
                required: 'Please provide a password',
                minlength: 'Your password must be at least 5 characters long'
            },
            'register-password-verify': {
                required: 'Please provide a password',
                minlength: 'Your password must be at least 5 characters long',
                equalTo: 'Please enter the same password as above'
            },
            'register-terms': {
                required: 'Please accept the terms!'
            }
        }
    });
};

var pages = ['login', 'register', 'lock'];
_.each(pages, function(name) {
    Template[name].rendered = _.wrap(Template[name].rendered, function(func) {
        App.init();
        func();
    });
});


var filemap = {
    "page_app_email.html": "",
    "page_app_estore.html": "",
    "page_app_media.html": "",
    "page_app_social.html": "",
    "page_comp_animations.html": "",
    "page_comp_calendar.html": "",
    "page_comp_charts.html": "",
    "page_comp_gallery.html": "",
    "page_comp_maps.html": "",
    "page_comp_nestable.html": "",
    "page_forms_components.html": "",
    "page_forms_validation.html": "",
    "page_forms_wizard.html": "",
    "page_layout_alternative_sidebar_visible.html": "",
    "page_layout_fixed_bottom.html": "",
    "page_layout_fixed_sidebar_mini.html": "",
    "page_layout_fixed_top.html": "",
    "page_layout_static_fixed_width.html": "",
    "page_layout_static_sidebar_mini.html": "",
    "page_layout_static.html": "",
    "page_ready_article.html": "",
    "page_ready_blank.html": "",
    "page_ready_error.html": "",
    "page_ready_faq.html": "",
    "page_ready_invoice.html": "",
    "page_ready_lock_screen.html": "lock",
    "page_ready_login.html": "login",
    "page_ready_pricing_tables.html": "",
    "page_ready_register.html": "register",
    "page_ready_reminder.html": "",
    "page_ready_search_results.html": "",
    "page_ready_timeline.html": "",
    "page_ui_blocks_grid.html": "",
    "page_ui_buttons_dropdowns.html": "",
    "page_ui_icons_fontawesome.html": "",
    "page_ui_icons_glyphicons_pro.html": "",
    "page_ui_navigation_more.html": "",
    "page_ui_progress_loading.html": "",
    "page_ui_tables.html": "",
    "page_ui_typography.html": "",
    "page_ui_widgets.html": ""
}
