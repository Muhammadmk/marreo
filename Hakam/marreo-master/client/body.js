UI.registerHelper('current', function() {
    return Session.get("current");
});

Deps.autorun(function() {
    mx.current = new Square(Session.get("current"));
});

Meteor.startup(function() {
    Meteor.setTimeout(function() {
        Meteor.Keybindings.add({
            'delete': function(e) {
                if ($(e.target).is('body')) {
                    e.preventDefault();
                    if ($('.arrow[selected=true]').size() > 0) {
                        Action.deleteLink();
                    } else {
                        Action.delete();
                    }
                }
            },
            'backspace': function(e) {
                if ($(e.target).is('body')) {
                    e.preventDefault();
                    if (Session.get('edit') && $('.arrow[selected=true]').size() > 0) {
                        Action.deleteLink();
                    } else {
                        Action.delete();
                    }
                }
            },
            'escape': function(e) {
                e.preventDefault();
                Action.escape();
            },
            'super+c': function(e) {
                if ($(e.target).is('body')) {
                    Action.copy();
                }
            },
            'ctrl+c': function(e) {
                if ($(e.target).is('body')) {
                    Action.copy();
                }
            },
            'super+v': function(e) {
                if ($(e.target).is('body')) {
                    if (mx.state.copy) {
                        Action.paste();
                    }
                }
            },
            'ctrl+v': function(e) {
                if ($(e.target).is('body')) {
                    if (mx.state.copy) {
                        Action.paste();
                    }
                }
            },
            'super+x': function(e) {
                if ($(e.target).is('body')) {
                    Action.cut();
                }
            },
            'ctrl+x': function(e) {
                if ($(e.target).is('body')) {
                    Action.cut();
                }
            },
            'super+g': function(e) {
                if ($(e.target).is('body')) {
                    e.preventDefault();
                    var count = Squares.find({
                        selected: true
                    }).count();

                    if (count > 1) {
                        Action.merge();
                    } else {
                        Action.split();
                    }
                }
            },

            'enter': function(e) {
                if ($(e.target).is('body')) {
                    //Show input
                    if ($("#command").is(":visible")) {
                        var selected = $("#popup paper-item[selected='true']").attr('value').trim();
                        if (selected) {
                            $("#command").val(selected).focus();
                            Session.set("results", []);
                        }
                    } else {
                        Action.edit();
                    }
                } else if ($(e.target).is('#command')) {
                    //Hide input
                    var text = $('#command').val();
                    $('#popup').hide();
                    $('#command').val('');

                    if (text === null || text.length === 0) {
                        return;
                    }


                    if (text[0] == "!") {
                        var command = text.substring(1);
                        if (command == "clear") {
                            Action.resetCanvas();
                            return;
                        } else if (command == "new canvas"){
                            document.getElementById('create-canvas').toggle();
                            return;
                        }

                        if (command.match(/^background (.+)/)) {
                            var value = command.match(/^background (.+)/)[1];
                            Canvases.findOne().setBackground(value);
                            return;
                        }
                    }

                    //Is background tile                    
                    if (mx.current.isTile) {
                        mx.current = Action.get(Action.materialize(mx.current));
                    }

                    //If entry follows the command syntax
                    if (text[0] == "=") {
                        command = text;

                        //Update command if there is a change
                        if (command !== mx.current.command) {
                            mx.current.setCommand(command);
                        }
                    } else {
                        //Update text if there is a change
                        if (text !== mx.current.text) {
                            mx.current.setText(text);
                        }
                    }
                }
            },

            'tab': function(e) {
                e.preventDefault();
                if ($('#command').is(":visible")) {
                    Action.moveResultSelection('down');
                }
            },
            'up': function(e) {
                e.preventDefault();
                if ($('#command').is(":visible")) {
                    Action.moveResultSelection('up');
                } else if ($(e.target).is('body')) {
                    // Action.moveCursor('up');
                }
            },
            'down': function(e) {
                e.preventDefault();
                if ($('#command').is(":visible")) {
                    Action.moveResultSelection('down');
                } else if ($(e.target).is('body')) {
                    // Action.moveCursor('down');
                }
            },
            'left': function(e) {
                if ($(e.target).is('body')) {
                    e.preventDefault();
                    // Action.moveCursor('left');
                }
            },
            'right': function(e) {
                if ($(e.target).is('body')) {
                    e.preventDefault();
                    // Action.moveCursor('right');
                }
            }
            // 'shift+up': function(e) {
            //     if ($(e.target).is('body')) {
            //         Action.moveCursor('up', true);
            //     }
            // },
            // 'shift+down': function(e) {
            //     if ($(e.target).is('body')) {
            //         Action.moveCursor('down', true);
            //     }
            // },
            // 'shift+left': function(e) {
            //     if ($(e.target).is('body')) {
            //         Action.moveCursor('left', true);
            //     }
            // },
            // 'shift+right': function(e) {
            //     if ($(e.target).is('body')) {
            //         Action.moveCursor('right', true);
            //     }
            // },


            //Admin shortcuts
            // 'n': function(e) {
            //     if ($(e.target).is('body')) {
            //         e.preventDefault();
            //         document.getElementById('create-canvas').toggle();
            //     }
            // },
            // 'm': function(e) {
            //     if ($(e.target).is('body')) {
            //         e.preventDefault();
            //         var count = Squares.find({
            //             selected: true
            //         }).count();

            //         if (count > 1) {
            //             Action.merge();
            //         } else {
            //             Action.split();
            //         }
            //     }
            // },
            // 'd': function(e) {
            //     if ($(e.target).is('body')) {
            //         Action.editWebservice();
            //     }
            // },
            // 'l': function(e) {
            //     if ($(e.target).is('body')) {
            //         Action.editLinks();
            //     }
            // },

            // 'f': function(e) {
            //     if ($(e.target).is('body')) {
            //         Action.editFunction();
            //     }
            // },
            // 'r': function(e) {
            //     if ($(e.target).is('body')) {
            //         Action.refresh(mx.current);
            //     }
            // },
            // 'e': function(e) {
            //     if ($(e.target).is('body')) {
            //         Action.enhance();
            //         // Action.editEmbed();
            //     }
            // },
            // 's': function(e) {
            //     if ($(e.target).is('body')) {
            //         Action.editStyle();
            //     }
            // },
            // 'u': function(e) {
            //     if ($(e.target).is('body')) {
            //         Action.editURL();
            //     }
            // }
        });

        $('body').bind('paste', function(e) {
            if ($(e.target).is('body')) {
                if (mx.state.copy) {
                    Action.paste();
                } else {
                    var value = e.originalEvent.clipboardData.getData('text');
                    var id;
                    //Evaluate value
                    //if (value is URL)
                    //if (value is image)

                    if (mx.current.isTile) {
                        id = Action.materialize(mx.current);
                    } else {
                        id = mx.current._id;
                    }

                    Squares.update(id, {
                        $set: {
                            data: {
                                value: value
                            }
                        }
                    });
                }
                e.preventDefault();
            }
        });
    }, 200);
});
