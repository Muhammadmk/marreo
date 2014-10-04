Template.map.rendered = function() {

}

Template.map.url = function() {
	console.log(this);
	
    var url = URI(API.google.endpoint.maps.embed + "place").query({
        q: this.data.location[0].value,
        key: API.google.token
    }).toString();

    return url;
}
