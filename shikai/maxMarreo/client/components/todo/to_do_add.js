Template.toDoAdd.events({
    'click #submit': function(e, template) {
        e.preventDefault();
        console.log(template);

        var item = {
        	_id: Random.id(),
            title: template.$('[name=title]').val(),
            description: template.$('[name=description]').val(),
            date: new Date(template.$('[name=date]').val()),
            completed: false
        };

        var dateObj = new Date(item.date);

        //Initialize is there is no data
        if (this.data && this.data.value && this.data.value.items) {} else {
            this.data = {
                value: {
                    items: []
                }
            }
        }

        this.data.value.items.push(item);
        this.setData(this.data);
    }
});