mx = {
    current: null,
    state: {
        startSelect: null,
        endSelect: null,
        copy: null,
        cut: null
        // owner: Meteor.userId()
    },
    regexp: {
        email: /^(?:[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+\.)*[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+@(?:(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!\.)){0,61}[a-zA-Z0-9]?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!$)){0,61}[a-zA-Z0-9]?)|(?:\[(?:(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\.){3}(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\]))$/,
        url: /^(?:(?:ht|f)tp(?:s?)\:\/\/|~\/|\/)?(?:\w+:\w+@)?((?:(?:[-\w\d{1-3}]+\.)+(?:com|org|net|gov|mil|biz|info|mobi|name|aero|jobs|edu|co\.uk|ac\.uk|it|fr|tv|museum|asia|local|travel|[a-z]{2}))|((\b25[0-5]\b|\b[2][0-4][0-9]\b|\b[0-1]?[0-9]?[0-9]\b)(\.(\b25[0-5]\b|\b[2][0-4][0-9]\b|\b[0-1]?[0-9]?[0-9]\b)){3}))(?::[\d]{1,5})?(?:(?:(?:\/(?:[-\w~!$+|.,=]|%[a-f\d]{2})+)+|\/)+|\?|#)?(?:(?:\?(?:[-\w~!$+|.,*:]|%[a-f\d{2}])+=?(?:[-\w~!$+|.,*:=]|%[a-f\d]{2})*)(?:&(?:[-\w~!$+|.,*:]|%[a-f\d{2}])+=?(?:[-\w~!$+|.,*:=]|%[a-f\d]{2})*)*)*(?:#(?:[-\w~!$ |\/.,*:;=]|%[a-f\d]{2})*)?$/i,
        cc: /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/,
        color: /^([\#]{0,1}([a-fA-F0-9]{6}|[a-fA-F0-9]{3})|rgb\(([0-9]{1},|[1-9]{1}[0-9]{1},|[1]{1}[0-9]{2},|[2]{1}[0-4]{1}[0-9]{1},|25[0-5]{1},){2}([0-9]{1}|[1-9]{1}[0-9]{1}|[1]{1}[0-9]{2}|[2]{1}[0-4]{1}[0-9]{1}|25[0-5]{1}){1}\)|rgb\(([0-9]{1}%,|[1-9]{1}[0-9]{1}%,|100%,){2}([0-9]{1}%|[1-9]{1}[0-9]{1}%|100%){1}\))$/
    }
};

API = _.indexBy([{
    name: "wit",
    description: "A natural language interface to turn user commands into actionable data",
    provider: "Wit",
    docs: "https://wit.ai/docs/api",
    endpoint: "https://api.wit.ai/message",
    token: "IZ7P43BJT2YDKM4A6NWX5KGB7YHAJ225",
    account: {
        oauth: "github"
    }
}, {
    name: "iframely",
    description: "oembed",
    docs: "",
    endpoint: "http://iframe.ly/api/iframely",
    token: "369136f6100570fcf4ef0f"
}, {
    name: "pipl",
    description: "People search",
    docs: "http://dev.pipl.com/docs/search_api/",
    endpoint: "http://api.pipl.com/search/v3/json/",
    token: "qfwkyz49gvmc6ezzh7mv4r52"
}, {
    name: "duck",
    description: "open search engine (instant API)",
    provider: "DuckDuckGo",
    docs: "http://api.duckduckgo.com/api",
    endpoint: "http://api.duckduckgo.com/",
    account: {
        t: "graphpaper"
    }
}, {
    name: "parse",
    description: "The web's most powerful content parsing engine",
    provider: "Readability",
    docs: "https://www.readability.com/developers/api/parser",
    endpoint: "https://readability.com/api/content/v1/parser",
    token: "5a5f0fa387c2876796267223b5740dc397f99cb0",
    account: {
        username: "gpaper",
        password: "6Eg-QzT-bcR-Zu2"
    }
}, {
    name: "embedly",
    description: "Convert URL into embed code",
    docs: "http://embed.ly/docs/embed/api/endpoints/1/oembed",
    endpoint: "http://api.embed.ly/1/oembed",
    token: "1b7350d8cb894d1f9b5fffd18cc0ba56",
    account: {}
}, {
    name: "google",
    description: "Google Cloud Platform",
    docs: "http://developers.google.com",
    endpoint: {
        maps: {
            embed: "https://www.google.com/maps/embed/v1/"
        }
    },
    token: "AIzaSyDGmBHD9EALhYO40E7fdkY9Bc2BWrScxiU",
    account: {
        username: "deepthought@gmail.com"
    }
}], 'name');