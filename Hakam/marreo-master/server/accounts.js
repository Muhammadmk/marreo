//*
// Test Keys
// Change callback URL at 
// https://apps.twitter.com/app/6985190/settings
// https://developers.facebook.com/apps/726903517340062/settings/

var facebook = {
    appId: "726903517340062",
    secret: "d085baf22691cc4f59efaf0815162bb4"
};

var twitter = {
	appId: "8717852",
	consumerKey: "OhepzDdISKG9k4yxGVvuNXDzS",
	secret: "WcDa6mdsYVe9U9PPj4Ng4yslSnIZ1GLGPBPiRu0QFniI67IngO"
}

/*/

//Real Keys
// Change callback URL at 
// https://apps.twitter.com/app/7025233/settings
// https://developers.facebook.com/apps/400439816776877/settings/

var facebook = {
	appId: "400439816776877",
	secret: "262c886f935157dd696f3e0830751d98"
}

var twitter = {
	appId: "7025233",
	consumerKey: "vt83GUVKpIeKtpu4d1uvKCmQ4",
	secret: "nYpiSnLTKCL56fl73P5GLPCXn0RCuQOmlp1fSlhX4a0dBN6kfG"
}

//*/

ServiceConfiguration.configurations.remove({
	service: "facebook"
});

ServiceConfiguration.configurations.remove({
	service: "twitter"
});

ServiceConfiguration.configurations.insert({
	service: "facebook",
	appId: facebook.appId,
	secret: facebook.secret
});

ServiceConfiguration.configurations.insert({
	service: "twitter",
	appId: twitter.appId,
	consumerKey: twitter.consumerKey,
	secret: twitter.secret
});