Template.toDoList.helpers({
    toDoList: function() {
        if (this.data.value === undefined) return;

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
        }];

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

        return groups
    }
});