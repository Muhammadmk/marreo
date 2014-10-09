Template.canvas.background = function() {
    var canvas = currentCanvas.get();
    if (!canvas) return;

    if (typeof canvas.background == "string") {
        if (canvas.background.match(mx.regexp.color)) {
            if (canvas.background.match(/^([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/)) {
                value = '#' + canvas.background;
            } else {
                value = canvas.background;
            }
        } else if (canvas.background.match(/^[-\w]+$/)) {
            value = canvas.background;
        } else if (canvas.background.match(mx.regexp.url)) {
            value = 'url(' + canvas.background + ')'
        } else {
            return _.sample(list);
        }
        return value;
    } else {
        return "white";
    }
}

Template.canvas.fab = function(position) {
    var current = Session.get('current');
    if (current) {
        if (position == 'bottom-right') {
            if (Session.get('fab.dragging.resize')) {
                return {
                    x: Session.get('fab.x') - 16,
                    y: Session.get('fab.y') - 16
                };
            } else {

                return {
                    x: (current.x + current.width) * 100 - 16,
                    y: (current.y + current.height) * 100 - 16
                };
            }
        } else if (position == "top-right") {
            return {
                x: (current.x + current.width) * 100 - 16,
                y: current.y * 100 - 16
            };
        } else if (position == "top-left") {
            return {
                x: current.x * 100 - 16,
                y: current.y * 100 - 16
            };
        } else if (position == "bottom-left") {
            return {
                x: current.x * 100 - 16,
                y: (current.y + current.height) * 100 - 16
            };
        }
    }
};

Template.canvas.resizingSquare = function() {
    if (Session.get('fab.dragging.resize')) {
        return true;
    } else {
        return false;
    }
};

Template.canvas.movingSquare = function() {
    if (Session.get('fab.dragging.move')) {
        return true;
    } else {
        return false;
    }
};

Template.canvas.squares = function() {
    return Squares.find({}, {
        sort: {
            y: 1,
            x: 2
        }
    });
};

Template.canvas.tiles = function() {
    return Background.find({}, {
        sort: {
            y: 1,
            x: 2
        }
    });
};

Template.canvas.height = function() {
    var canvas = currentCanvas.get();
    if (!canvas) return;
    
    return canvas.height * 100;
};

Template.canvas.width = function() {
    var canvas = currentCanvas.get();
    if (!canvas) return;

    return canvas.width * 100;
};

Template.canvas.edit = function() {
    return Session.get('edit');
};

Template.canvas.mousearrow = function() {
    return Session.get('mousearrow');
};

Template.canvas.links = function() {
    Session.get('fab.dragging.move');
    Session.get('fab.dragging.resize');

    return Squares.find({
        'link.0': {
            $exists: true
        }
    }, {
        transform: function(square) {
            var lines = [];

            _.each(square.link, function(_id) {

                var s1 = Squares.findOne(_id);
                var s2 = square;

                var offsetX;
                var offsetY;

                if (s1) {
                    if (s2.x > s1.x) {
                        offsetX = 5;
                    } else if (s2.x < s1.x) {
                        offsetX = -5;
                    } else {
                        offsetX = 0;
                    }

                    if (s2.y < s1.y) {
                        offsetY = 5;
                    } else if (s2.y > s1.y) {
                        offsetY = -5;
                    } else {
                        offsetY = 0;
                    }

                    var line = {
                        x1: (s1.x + s1.width / 2) * 100 + offsetX,
                        y1: (s1.y + s1.height / 2) * 100 - offsetY,
                        x2: (s2.x + s2.width / 2) * 100 - 2 * offsetX,
                        y2: (s2.y + s2.height / 2) * 100 + 2 * offsetY,
                        source: s1._id,
                        target: s2._id
                    };

                    line.x3 = (line.x1 + line.x2) / 2 - Math.abs(line.y1 - line.y2) / 5;
                    line.y3 = (line.y1 + line.y2) / 2 - Math.abs(line.x1 - line.x2) / 5;

                    lines.push(line);
                } else {
                    Squares.update(s2._id, {
                        $pull: {
                            link: _id
                        }
                    }, console.warn('Removed link to non-existent tile ', _id));
                }
            });

            return {
                lines: lines
            };
        }
    });
};

Template.canvas.xpos = function() {
    return this.x * 100;
};

Template.canvas.ypos = function() {
    return this.y * 100;
};

Template.canvas.heightpx = function() {
    return this.height * 100;
};

Template.canvas.widthpx = function() {
    return this.width * 100;
};

Template.canvas.squareRenderer = function() {
    if (this.view) {
        return this.view;
    } else if (this.data) {
        return 'mxData';
    } else {
        return 'mxText';
    }
}

//Convert Value to Polymer Elements.
// Template.mxData.render = function() {
//     return this.toView(this);
// };

Template.canvas.hiddenRipples = [];
Template.canvas.events({
    'click #tile': function(e) {
        var y = Math.round($(e.currentTarget).position().top / 100);
        var x = Math.round($(e.currentTarget).position().left / 100);

        var fakeSquare = {
            x: x,
            y: y,
            z: 0,
            height: 1,
            width: 1,
            isTile: true
        };

        if (!$("#command").is(":visible")) {
            mx.current = fakeSquare;
            Action.edit();
        } else {
            $('#popup').hide();
            $('#command').val('');
            Session.set("results", []);
        }
    },
    'dblclick #tile': function(e) {
        var y = Math.round($(e.currentTarget).position().top / 100);
        var x = Math.round($(e.currentTarget).position().left / 100);

        var fakeSquare = {
            x: x,
            y: y,
            z: 0,
            height: 1,
            width: 1,
            isTile: true
        };

        if (UserSession.get('autoenhance') === true) {
            fakeSquare.view = "editor";
            Action.materialize(fakeSquare);
        }
    },
    'mousemove #canvas-container': function(e) {
        if (e.toElement.id == "tile") return;
        $('#tile')
            .css('top', Math.floor(e.offsetY / 100) * 100)
            .css('left', Math.floor(e.offsetX / 100) * 100);
    },
    //Core Events
    'click .square': function(e) {
        Session.set('current', this);
    },
    'click .square>paper-ripple': function(e) {
        $(e.target).hide();
        Template.canvas.hiddenRipples.push($(e.target));
    },
    'mouseenter .square>paper-ripple': function() {
        while (Template.canvas.hiddenRipples.length > 0) {
            Template.canvas.hiddenRipples.pop().show();
        }
    },
    'click paper-fab[name=delete]': function() {
        Action.delete();
    },
    'click paper-fab[name=enhance]': function() {
        Action.enhance();
    },
    'drag-start': function(e) {
        if (currentCanvas.get().lock) return;

        var target = e.originalEvent.detail.event.target;
        var resizeBy = {
            x: 0,
            y: 0
        };

        var moveBy = {
            x: 0,
            y: 0
        };

        var dragInfo = e.originalEvent.detail;
        var scroller = $('mx-main');
        var scroll = {
            x: scroller.scrollLeft(),
            y: scroller.scrollTop()
        };

        if (target.tagName == 'PAPER-FAB') {

            dragInfo.startID = mx.current._id;

            if (target.getAttribute('name') == 'resize') {
                Session.set('fab.dragging.resize', true);

                dragInfo.drag = function(e) {
                    var dy = (scroller.scrollTop() - scroll.y + dragInfo.event.dy);
                    var dx = (scroller.scrollLeft() - scroll.x + dragInfo.event.dx);
                    resizeBy.x = Math.floor(dx / 100);
                    resizeBy.y = Math.floor(dy / 100);

                    Session.set('fab.x', e.p.x + scroller.scrollLeft());
                    Session.set('fab.y', e.p.y + scroller.scrollTop());

                    $('#resizePreview1')
                        .attr('height', (mx.current.height * 100) + _.max([dy, 100 - mx.current.height * 100]))
                        .attr('width', (mx.current.width * 100) + _.max([dx, 100 - mx.current.width * 100]));

                    $('#resizePreview2')
                        .attr('height', (mx.current.height + _.max([resizeBy.y, 1 - mx.current.height])) * 100)
                        .attr('width', (mx.current.width + _.max([resizeBy.x, 1 - mx.current.width])) * 100);
                };

                dragInfo.drop = function(e) {
                    console.log(dragInfo.startID);

                    if (resizeBy.x !== 0 || resizeBy.y !== 0) {
                        Squares.update(dragInfo.startID, {
                            $inc: {
                                height: _.max([resizeBy.y, 1 - mx.current.height]),
                                width: _.max([resizeBy.x, 1 - mx.current.width])
                            }
                        }, function() {
                            mx.current = Squares.findOne(dragInfo.startID);
                            Action.resolveOverlap(mx.current, Action.checkOverlap(mx.current));

                            Session.set('current', mx.current);
                            Session.set('fab.dragging.resize', false);
                        });
                    } else {
                        Session.set('fab.dragging.resize', false);
                    }
                };

            } else if (target.getAttribute('name') == 'link') {
                dragInfo.startX = dragInfo.event.pageX + scroll.x;
                dragInfo.startY = dragInfo.event.pageY + scroll.y;

                dragInfo.drag = function(e) {
                    var scroll = {
                        x: scroller.scrollLeft(),
                        y: scroller.scrollTop()
                    };

                    var line = {
                        x1: e.startX,
                        y1: e.startY,
                        x2: e.p.x + scroll.x,
                        y2: e.p.y + scroll.y
                    };

                    line.x3 = (line.x1 + line.x2) / 2 - 50;
                    line.y3 = (line.y1 + line.y2) / 2 - 50;

                    Session.set('mousearrow', line);
                };

                dragInfo.drop = function(e) {
                    var dropID = e.event.relatedTarget.id || e.event.relatedTarget.parentElement.id;

                    if (dropID != e.startID) {
                        var dropTarget = Squares.findOne(dropID);
                        if (dropTarget) {
                            console.log(e.startID, '--->', dropID);
                            Squares.update(dropID, {
                                $push: {
                                    link: e.startID
                                }
                            }, function() {
                                console.time('Check Cycle');
                                if (Action.isCycle()) {
                                    document.querySelector('#toast').text = 'Circular Dependency detected! This link cannot be created';
                                    document.querySelector('#toast').show();
                                    Squares.update(dropID, {
                                        $pull: {
                                            link: e.startID
                                        }
                                    });
                                } else {
                                    dropTarget.refresh();
                                }
                                console.timeEnd('Check Cycle');
                            });
                        } else {
                            Action.materialize(_.extend(Background.findOne(dropID), {
                                link: [e.startID]
                            }));
                        }
                    }

                    Session.set('mousearrow', null);
                };
            }
        } else {
            dragInfo.startID = dragInfo.event.target.id || dragInfo.event.target.parentElement.id;
            var tile = Squares.findOne(dragInfo.startID);
            if (tile) {
                //Start Move
                Session.set('fab.dragging.move', true);
                Session.set('current', tile);

                dragInfo.drag = function(e) {
                    moveBy.x = Math.floor((scroller.scrollLeft() - scroll.x + dragInfo.event.dx) / 100);
                    moveBy.y = Math.floor((scroller.scrollTop() - scroll.y + dragInfo.event.dy) / 100);

                    $('#movePreview')
                        .attr('x', (mx.current.x + moveBy.x) * 100)
                        .attr('y', (mx.current.y + moveBy.y) * 100);
                };

                dragInfo.drop = function(e) {
                    console.log(dragInfo.startID);

                    if (moveBy.x !== 0 || moveBy.y !== 0) {
                        Squares.update(dragInfo.startID, {
                            $inc: {
                                y: moveBy.y,
                                x: moveBy.x
                            }
                        }, function() {
                            mx.current = Squares.findOne(dragInfo.startID);
                            Action.resolveOverlap(mx.current, Action.checkOverlap(mx.current));

                            Session.set('current', Squares.findOne(dragInfo.startID));
                            Session.set('fab.dragging.move', false);
                        });
                    } else {
                        Session.set('fab.dragging.move', false);
                    }
                };
            }
            //End Move
        }
    },
    'mouseover .arrow': function(e) {
        var arrow = e.currentTarget;
        arrow.setAttribute('stroke-width', 6);
    },
    'mouseout .arrow': function(e) {
        var arrow = e.currentTarget;
        var selected = arrow.getAttribute('selected');
        if (selected != 'true') {
            arrow.setAttribute('stroke-width', 3);
        }
    },
    'click .arrow': function(e) {
        var arrow = e.currentTarget;
        var selected = arrow.getAttribute('selected');
        if (selected == 'true') {
            arrow.setAttribute('stroke', '#bdc3c7');
            arrow.setAttribute('selected', 'false');
        } else {
            arrow.setAttribute('stroke', '#e74c3c');
            arrow.setAttribute('selected', 'true');
        }
    },
    'dragover .square': function(event) {
        console.log(event);
        event.preventDefault();
    },
    'drop .square': function(event) {
        event.preventDefault();
        console.log(event);
        prompt('eher');

        var value = event.dataTransfer.getData('text');

        console.log(event.target.id);

        mx.current = Squares.findOne(event.target.id);

        if (value.match(/^www/)) {
            value = 'http://' + value;
        }

        if (typeof value == 'string' && value.match(/^https?:\/\/.+/)) {
            Squares.update(mx.current._id, {
                $set: {
                    url: value
                }
            }, function() {
                mx.current.url = value;
                mx.current.refresh();
            });
        } else {
            //swap
        }
    }
});
