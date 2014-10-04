// helper method to find index of this in Array
var arrayObjectIndexOf = function(myArray, searchTerm, property) {
    for(var i = 0, len = myArray.length; i < len; i++) {
        if (myArray[i][property] === searchTerm) return i;
    }
    return -1;
}

//hardcoding the wedding date
moment();
weddingDay = moment("2014-11-10 08:00");
console.log(weddingDay);


Template.todo.helpers({
    // this function return the variable for mainPage, boolean
    mainPage: function() {
        return Template.instance().mainPage.get();
    },
    // this function return the variable for editSubmitBtn, boolean
    editSubmitBtn: function() {
        return Template.instance().editSubmitBtn.get();
    },

    // this function return the variable for editSubmitBtn, boolean
    itemTitle: function() {
        return Template.instance().itemTitle.get();
    },

    // load all the to do items and sort them according to date
    // toDoList: function() {
    //     if (this.data.value === undefined) return;

    //     var toDoList = this.data.value.items;

    //     var groups = [{
    //         key: "overdue",
    //         items: []
    //     }, {
    //         key: "Days before",
    //         items: []
    //     }, {
    //         key: "Weeks before",
    //         items: []
    //     }, {
    //         key: "Months before",
    //         items: []
    //     }];

    //     // sorting method
    //     _.reduce(toDoList, function(memo, value) {
    //         var endDate = moment();
    //         value.prettyDate = moment(value.date).from(endDate);

    //         if (moment(value.date).diff(endDate, 'months') >= 1) {
    //             memo[3].items.push(value);
    //         } else if (moment(value.date).diff(endDate, 'weeks') >= 1) {
    //             memo[2].items.push(value);
    //         } else if (moment(value.date).diff(endDate, 'days') >= 0) {
    //             memo[1].items.push(value);
    //         } else {
    //             memo[0].items.push(value);
    //         }

    //         return memo;
    //     }, groups);

    //     // progress count
    //     _.each(groups, function(value) {
    //         var countCompleted = _.countBy(value.items, function(i) {
    //             return i.completed;
    //         });

    //         value.progress = (countCompleted.true ? countCompleted.true : 0) + "/" + value.items.length;
    //     });
    //     return groups
    // }

    // load all the to do items and sort them according to date
    toDoList: function() {
        if (this.data.value === undefined) return;
        console.log("enter Here")
        var toDoList = this.data.value.items;

        var groups = [
        {
            key: "12+ Months",
            items: []
        }, 
        {
            key: "9 - 12 Months",
            items: []
        }, 
        {
            key: "6 - 8 Months",
            items: []
        }, 
        {
            key: "2 - 5 Months",
            items: []
        }, 
        {
            key: "2 Months",
            items: []
        }, 
        {
            key: "1 Month",
            items: []
        }, 
        {
            key: "2 weeks",
            items: []
        }, 
        {
            key: "1 week",
            items: []
        }, 
        {
            key: "1 day",
            items: []
        }, 
        {
            key: "D day",
            items: []
        }];

        var endDate = weddingDay;
        console.log(endDate);
        var current = moment();
        var currentArray = 0;

        if (endDate.diff(moment(current), 'months') >= 12) {
            currentArray = 0;
        } else if (endDate.diff(moment(current), 'months') >= 9) {
            currentArray = 1;
        } else if (endDate.diff(moment(current), 'months') >= 6) {
            currentArray = 2;
        } else if (endDate.diff(moment(current), 'months') >= 2) {
            currentArray = 3;
        } else if (endDate.diff(moment(current), 'months') >= 1) {
            currentArray = 4;
        } else if (endDate.diff(moment(current), 'weeks') >= 2) {
            currentArray = 5;
        } else if (endDate.diff(moment(current), 'weeks') >= 1) {
            currentArray = 6;
        } else if (endDate.diff(moment(current), 'days') >= 7) {
            currentArray = 7;
        } else if (endDate.diff(moment(current), 'days') >= 0) {
            currentArray = 8;
        } else {
            currentArray = 9;
        }



        //sorting method
        _.reduce(toDoList, function(memo, value) {
            // value.prettyDate = moment(value.date).from(endDate);
            console.log("*********");
            console.log(moment(value.date));
            console.log(endDate.diff(moment(value.date), 'days'));

            if (value.ref < currentArray) {
                memo[currentArray].items.push(value);
            } else {
                if (endDate.diff(moment(value.date), 'months') >= 12) {
                    memo[0].items.push(value);
                } else if (endDate.diff(moment(value.date), 'months') >= 9) {
                    memo[1].items.push(value);
                } else if (endDate.diff(moment(value.date), 'months') >= 6) {
                    memo[2].items.push(value);
                } else if (endDate.diff(moment(value.date), 'months') >= 2) {
                    memo[3].items.push(value);
                } else if (endDate.diff(moment(value.date), 'months') >= 1) {
                    memo[4].items.push(value);
                } else if (endDate.diff(moment(value.date), 'weeks') >= 2) {
                    memo[5].items.push(value);
                } else if (endDate.diff(moment(value.date), 'weeks') >= 1) {
                    memo[6].items.push(value);
                } else if (endDate.diff(moment(value.date), 'days') >= 7) {
                    memo[7].items.push(value);
                } else if (endDate.diff(moment(value.date), 'days') >= 0) {
                    memo[8].items.push(value);
                } else {
                    memo[9].items.push(value);
                }
            }

            return memo;
        }, groups);

        //moving the overdue items to the current list
        var today = moment();
        var mthCompare = endDate.diff(today, 'months');
        var weekCompare = endDate.diff(today, 'weeks');
        var dayCompare = endDate.diff(today, 'days');

        if (mthCompare >= 1) {
            if(mthCompare >= 9) {
                groups[1].items.concat(groups[0]);
                groups[0].items = [];
                //STOP HERE
            }
        }

        return groups
    }

});

Template.todo.created = function() {
    // mainPage is a boolean to see if it load item list or add item page
    // mainPage = false -> item list
    this.mainPage = new ReactiveVar(true);
    this.editSubmitBtn = new ReactiveVar(false);
    this.itemTitle = new ReactiveVar("");
};

var editItemId = "";

Template.todo.events({
    'click a.create': function(e, template) {
        template.mainPage.set(false);
    },
    'click a.back': function(e, template) {
     template.mainPage.set(true);
     template.editSubmitBtn.set(false);
     template.itemTitle.set("");
 },

 'click #addToDo': function(e, template) {
    e.preventDefault();

        //Initialize if there is no data
        if (this.data && this.data.value && this.data.value.items) {} else {
            this.data = {
                value: {
                    items: []
                }
            }
        }

        //checking date to see which reference to store
        var checkDate = new Date(template.$('[name=date]').val());
        var ref = 0;

        if (weddingDay.diff(moment(value.date), 'months') >= 12) {
            ref = 0;
        } else if (weddingDay.diff(moment(checkDate), 'months') >= 9) {
            ref = 1;
        } else if (weddingDay.diff(moment(checkDate), 'months') >= 6) {
            ref = 2;
        } else if (weddingDay.diff(moment(checkDate), 'months') >= 2) {
            ref = 3;
        } else if (weddingDay.diff(moment(checkDate), 'months') >= 1) {
            ref = 4;
        } else if (weddingDay.diff(moment(checkDate), 'weeks') >= 2) {
            ref = 5;
        } else if (weddingDay.diff(moment(checkDate), 'weeks') >= 1) {
            ref = 6;
        } else if (weddingDay.diff(moment(checkDate), 'days') >= 7) {
            ref = 7;
        } else if (weddingDay.diff(moment(vcheckDate), 'days') >= 0) {
            ref = 8;
        } else {
            ref = 9;
        }


        // update the data collection
        Squares.update({_id:mx.current._id}, {
            $push: {
                'data.value.items': {
                    _id: Random.id(),
                    title: template.$('[name=title]').val(),
                    description: template.$('[name=description]').val(),
                    date: new Date(template.$('[name=date]').val()),
                    ref: ref,
                    completed: false
                }
            }
        });

        // this.data.value.items.push(item);
        // this.setData(this.data);

        template.mainPage.set(true);
    },
    'click a.edit': function(event, template) {
        template.mainPage.set(false);
        template.editSubmitBtn.set(true);
        template.itemTitle.set(this.title);
        editItemId = this._id;
        console.log(this.date);
    },
    'click #editToDo': function(event, template) {

        console.log(template.$('[name=date]').val());

        // get the array index of this element
        var arrIndex = arrayObjectIndexOf(mx.current.data.value.items, editItemId, "_id");

// prepare the modifier 
modifier = {$set: {}};
modifier.$set["data.value.items." + arrIndex + ".title"] = template.$('[name=title]').val();

// update the value
Squares.update({_id: mx.current._id}, modifier);

template.mainPage.set(true);
template.editSubmitBtn.set(false);

        // console.log("enter here");
        // editObject = this;
        // var date = editObject.date;
        // editObject.date = moment(date).format('YYYY-MM-DD');
        // create = true;
        // createDep.changed();
        // editObjectDep.changed();
    },
    'click .completedCheck': function(event, template) {
        // "this" is a todoItem
        // "that" is a todoSquare
        var that = template.data;
        // console.log(that);
        var item = _.findWhere(that.data.value.items, {
            _id: this._id
        });

        item.completed = !item.completed;

        console.log(item);
        console.log(mx.current);

// Squares.update(mx.current._id, {$set: {
//     data.value.items[1].title: "newtitle"
// }});

// Squares.update(mx.current._id, {
//                 $push: {
//                     'data.value.items': {
//                         _id: Random.id(),
//                         title: "WTTTTTTTT",
//                         description: "LOL",
//                         date: "Wed Sep 10 2014 08:00:00 GMT+0800 (SGT)",
//                         completed: false
//                     }
//                 }
//             });

// get the array index of this element
var arrIndex = arrayObjectIndexOf(mx.current.data.value.items, item._id, "_id");
console.log(arrIndex);

// prepare the modifier
modifier = {$set: {}};
modifier.$set["data.value.items." + arrIndex + ".completed"] = item.completed;

// update the value
Squares.update({_id: mx.current._id}, modifier);


        // that.setData(that.data);

        // template.item.$(".itemTitle p").wrap("<strike>");

        // db.students.update( { _id: 1, grades: 80 }, { $set: { "grades.$" : 82 } } )

        //console.log(mx);

        // Squares.update(mx.current.data.value.items[arrIndex]._id, {$set: {
        //     "completed": item.completed
        // }});

        // Squares.update({mx.current._id}, {modifier}, callback);
        // Squares.update(mx.current._id, this._id, $set: {
        //     data.value.items.$.completed: item.completed
        // });
},

'click a.delete': function(event, template) {
    Squares.update({_id: mx.current._id}, {
        $pull: {
            'data.value.items': {
                '_id': this._id
            }
        }
    });
},
});
