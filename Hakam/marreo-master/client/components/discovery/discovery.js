// Check for the various File API support.
if (window.File && window.FileReader && window.FileList && window.Blob) {
  // Great success! All the File APIs are supported.
  console.log("ITZ SUPPORTED!!!!!");
} else {
	alert('The File APIs are not fully supported in this browser.');
}

Template.discovery.rendered = function() {
	$('.dropdown-toggle').dropdown();
};

var categoriesList = ["Personal", "Bridal Boutiques", "Wedding Venue", "Food & Drink", "Clothes", "Bridal Items", "Photography", "Misc"];
Template.discovery.helpers({
	// variable mainPage: boolean
	category: function() {
		return Template.instance().category.get();
	},
	categoryItems: function() {
		return Template.instance().categoryItems.get();
	},

	discoveryList: function() {
		var categoriesArr = [];

		var itemsArray = [
		{
			title: "ABC",
			likes: 31,
			address: "blk 123",
			telephone: 92321234,
			email: "abc@hotmail.com",
			website: "abc.com"
		},
		{
			title: "ABC",
			likes: 31,
			address: "blk 123",
			telephone: 92321234,
			email: "abc@hotmail.com",
			website: "abc.com"
		},
		{
			title: "ABC",
			likes: 31,
			address: "blk 123",
			telephone: 92321234,
			email: "abc@hotmail.com",
			website: "abc.com"
		}
		];

		for (i in categoriesList) {
			var CatObj = {
				index: i,
				catName: categoriesList[i],
				itemsArr: itemsArray
			};
			categoriesArr.push(CatObj);
		}
		return categoriesArr;
	}
});

Template.discovery.created = function() {
    // mainPage is a boolean to see if it load item list or add item page
    this.category = new ReactiveVar("");
    this.categoryItems = new ReactiveVar([]);
};

Template.discovery.events({
	'click .catItem': function(e, template) {
		console.log(this.catName);
		template.category.set(this.catName);
		template.categoryItems.set(this.itemsArr);

		Template.discovery.animateCard("animate_me");
	},
	'click a.backArrowBtn': function(e, template) {
		Template.discovery.animateCard("animate_me");
	},
	// Initiate upload
	'click #upload': function(e, template) {

		var files = document.getElementById('files').files;

		if (!files.length) {
			alert('Please select a file!');
			return;
		}

		var file = files[0];
		var start = 0;
		var stop = file.size - 1;

		var reader = new FileReader();

		if (file.name.indexOf(".csv") <= 0) {
			alert('Please select a .CSV file!');
			return;
		}

	    // If we use onloadend, we need to check the readyState.
	    reader.onloadend = function(evt) {
	      if (evt.target.readyState == FileReader.DONE) { // DONE == 2
	      	var csvData = evt.target.result;
	      	console.log(typeof csvData);
	      	console.log(csvData);
	      	var discoverCards = csvData.split("\n");
	      	discoverCards.shift(); //removes the header
	      	for (var i in discoverCards) {
	      		var cardArr = discoverCards[i].split(","); //separating the individual values
	      		// console.log(cardArr);
	      		var links = [];
	      		if (cardArr[6].indexOf(";") >= 0) {
	      			links = cardArr[6].split(";"); //separating the links of the images
	      		} else {
	      			links = [cardArr[6]];
	      		}

	      		//creating the discovery card object
	      		var cardObj = { 
	      			title: cardArr[0],
	      			description: cardArr[1],
	      			address: cardArr[2],
	      			phone: cardArr[3],
	      			email: cardArr[4],
	      			website: cardArr[5],
	      			photoLinks: links
	      		};
	      		console.log(cardObj);
	      	}
	      }
	  	};

	  	// var blob = file.slice(start, stop + 1);
	  	reader.readAsBinaryString(file);


	}
});


// Animation =================================================
Template.discovery.rendered = function() {
	Template.discovery.setup();
};

var meta;
var transition;
var state = {
	opened: false
}

Template.discovery.getMeta = function() {
	if (!meta) {
		meta = document.createElement('core-meta');
		meta.type = 'transition';
	}
	return meta;
}

Template.discovery.setup = function() {
	var target = document.getElementById('animate_me');

	transition = Template.discovery.getMeta().byId("core-transition-center");
	transition.setup(target);
}

Template.discovery.animateCard = function(name) {
	var target = document.getElementById(name);
	var cn = target.classList;
	var i =0;
	state.opened = !state.opened;

	if (cn.contains("core-opened")) {
		transition.go(target, state);
		cn.add("hiding");
	} else {
		cn.remove("hiding");
		transition.go(target, state);

	}

}
// Ends Animation =================================================
