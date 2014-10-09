Match.NonEmptyString = Match.Where(function(x) {
    check(x, String);
    return x.length > 0;
});

Match.ID = Match.Where(function(id) {
    check(id, String);
    return /[0-9a-zA-Z]{10,24}/.test(id);
});

AccountsTemplates.configure({
    // Behaviour
    confirmPassword: false,
    enablePasswordChange: true,
    forbidClientAccountCreation: false,
    overrideLoginErrors: true,
    sendVerificationEmail: false,

    // Appearance
    showAddRemoveServices: true,
    showForgotPasswordLink: true,
    showLabels: false,
    showPlaceholders: true,

    // Client-side Validation
    continuousValidation: true,
    negativeFeedback: false,
    negativeValidation: true,
    positiveValidation: true,
    positiveFeedback: true,

    // Privacy Policy and Terms of Use
    privacyUrl: 'privacy',
    termsUrl: 'terms-of-use',

    // Redirects
    homeRoutePath: '/',
    redirectTimeout: 4000,

    // Texts
    buttonText: {
        signUp: "Sign Up Now!"
    },
    title: {
        forgotPwd: "Recover Your Password"
    },
});

AccountsTemplates.configureRoute('signIn', {
    name: 'login',
    path: '/login',
    template: 'login',
    redirect: 'home',
});


AccountsTemplates.init();
