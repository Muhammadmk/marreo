var bindSaveContent = _.once(function() {
    if (!Aloha) return;
    
    Aloha.bind('aloha-editable-activated', function(jEvent, aEvent) {
        var content = aEvent.editable.getContents().trim();
        if (content == "Just click and start typing!") {
            aEvent.editable.obj[0].innerHTML = "";
        }
    });

    // save all changes after leaving an editable
    Aloha.bind('aloha-editable-deactivated', function(jEvent, aEvent) {
        var content = aEvent.editable.getContents();
        var contentId = aEvent.editable.getId();
        var square = Squares.findOne(contentId);

        if (square && square.data.value != content) {
            aEvent.editable.obj[0].innerHTML = "";
            Squares.update(contentId, {
                $set: {
                    'data.value': content
                }
            }, function() {
                document.querySelector('#toast').text = "Saved";
                document.querySelector('#toast').show();
            });
        }
    });
});


Template.editor.rendered = function() {
    var template = this;
    if (Aloha) {
        Aloha.ready(function() {
            console.log("Aloha Ready");
            $(template.$('.editable')).aloha();
            bindSaveContent();
        });
    }
}
