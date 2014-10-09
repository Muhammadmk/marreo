Widgets = [{
    view: 'editor',
    description: 'A rich text editor to quickly create documents.',
    icon: 'https://cdn0.iconfinder.com/data/icons/line-file-type-icons/100/file_txt-32.png',
    names: ['text editor', 'editor', 'rich text', 'aloha', 'text'],
    height: 3,
    width: 3
}, {
    view: 'minecraft',
    description: 'A realtime, multiplayer, minecraft like 3D environment.',
    icon: 'http://www.chip.de/ii/1/2/8/4/2/4/1/8/minecraft-031b5f5e8bff1f9e.jpg',
    names: ['minecraft'],
    height: 6,
    width: 6
}, {
    view: 'todo',
    description: 'A simple todo list to track your tasks.',
    icon: 'https://cdn2.iconfinder.com/data/icons/business-office-icons/256/To-do_List-32.png',
    names: ['todo list', 'todo', 'todolist'],
    height: 4,
    width: 3
}, {
    view: 'twitter',
    description: 'Fetch twitter timeline from any public user.',
    icon: '/img/icons/twitter.png',
    names: ['twitter'],
    height: 2,
    width: 3
}, {
    view: 'embed',
    icon: '/img/icons/embed.png',
    description: 'Embed content from around the web.',
    names: ['embed'],
    height: 3,
    width: 3
}, {
    view: 'people',
    icon: 'https://cdn2.iconfinder.com/data/icons/seo-web-optomization-ultimate-set/512/market_research-32.png',
    description: 'Search for People using Pipl.com API',
    names: ['people search', 'people'],
    height: 2,
    width: 3
}, {
    view: 'latex',
    icon: 'http://latex.codecogs.com/gif.latex?%5Cfrac%7Bx%5E2+1%7D%7By%5E2%7D',
    description: 'Quickly math typesetting using LaTeX',
    names: ['latex', 'math'],
    height: 3,
    width: 3
}, {
    view: 'image',
    icon: 'https://cdn0.iconfinder.com/data/icons/colicon/24/editor_images_pictures_photos_landscape_collection_album_photo_picture_image-32.png',
    description: 'Add a image through URL',
    names: ['image'],
    height: 1,
    width: 3

}, {
    view: 'discovery',
    icon: 'https://cdn0.iconfinder.com/data/icons/colicon/24/editor_images_pictures_photos_landscape_collection_album_photo_picture_image-32.png',
    description: 'Discover an amazing world',
    names: ['discovery'],
    height: 4,
    width: 3
}];

// }, {
//     view: 'map',
//     description: '',
//     names: ['map'],
//     size: [3, 3]
// }, {
//     view: 'video',
//     description: '',
//     names: ['video'],
//     size: [3, 3]
// }, {
//     view: 'iframe',
//     description: '',
//     names: ['iframe'],
//     size: [3, 3]
// }, {
//     view: 'chart',
//     description: '',
//     names: ['chart'],
//     size: [3, 3]
// }, {
//     view: 'draw',
//     description: '',
//     names: ['draw'],
//     size: [3, 3]

Template.widgets.widgets = function() {
    return _.sortBy(Widgets, function(value) {
        return value.view;
    });
};

Template.widgets.name = function() {
    return _.first(this.names);
}
Template.widgets.alias = function() {
    return this.names.join(', ');
}
