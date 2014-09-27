Template.toDoList.helpers({
    toDoList: function() {
        var toDoList = this.data.value.items;

        var groups = [{
            key: "overdue",
            items: []
        }, {
            key: "Days before",
            items: []
        }, {
            key: "Weeks before",
            items: []
        }, {
            key: "Months before",
            items: []
        }]


        _.reduce(toDoList, function(memo, value) {
            var endDate = moment();
            value.prettyDate = moment(value.date).from(endDate);

            if (moment(value.date).diff(endDate, 'months') >= 1) {
                memo[3].items.push(value);
            } else if (moment(value.date).diff(endDate, 'weeks') >= 1) {
                memo[2].items.push(value);
            } else if (moment(value.date).diff(endDate, 'days') >= 0) {
                memo[1].items.push(value);
            } else {
                memo[0].items.push(value);
            }

            return memo;
        }, groups);

        _.each(groups, function(value) {
            var countCompleted = _.countBy(value.items, function(i) {
                return i.completed;
            });

            value.progress = (countCompleted.true ? countCompleted.true : 0) + "/" + value.items.length;
            // body

        });
        // console.log(groups);
        return groups
    }
});