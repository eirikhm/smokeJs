/// <reference path="backbone.d.ts" />
/// <reference path="../jquery/jquery.d.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
function test_events() {
    var object = new Backbone.Events();
    object.on("alert", function (msg) {
        return alert("Triggered " + msg);
    });

    object.trigger("alert", "an event");

    var onChange = function () {
        return alert('whatever');
    };
    var context;

    object.off("change", onChange);
    object.off("change");
    object.off(null, onChange);
    object.off(null, null, context);
    object.off();
}

function test_models() {
    var Sidebar = Backbone.Model.extend({
        promptColor: function () {
            var cssColor = prompt("Please enter a CSS color:");
            this.set({ color: cssColor });
        }
    });

    var sidebar = new Sidebar();
    sidebar.on('change:color', function (model, color) {
        return $('#sidebar').css({ background: color });
    });
    sidebar.set({ color: 'white' });
    sidebar.promptColor();

    ////////
    var Note = Backbone.Model.extend({
        initialize: function () {
        },
        author: function () {
        },
        coordinates: function () {
        },
        allowedToEdit: function (account) {
            return true;
        }
    });

    var PrivateNote = Note.extend({
        allowedToEdit: function (account) {
            return account.owns(this);
        }
    });

    //////////
    var note = Backbone.Model.extend({
        set: function (attributes, options) {
            Backbone.Model.prototype.set.call(this, attributes, options);
        }
    });

    note.get("title");

    note.set({ title: "March 20", content: "In his eyes she eclipses..." });

    note.set("title", "A Scandal in Bohemia");
}

var Employee = (function (_super) {
    __extends(Employee, _super);
    function Employee(options) {
        _super.call(this, options);
        this.reports = new EmployeeCollection();
        this.reports.url = '../api/employees/' + this.id + '/reports';
    }
    Employee.prototype.more = function () {
        this.reports.reset();
    };
    return Employee;
})(Backbone.Model);

var EmployeeCollection = (function (_super) {
    __extends(EmployeeCollection, _super);
    function EmployeeCollection() {
        _super.apply(this, arguments);
    }
    EmployeeCollection.prototype.findByName = function (key) {
    };
    return EmployeeCollection;
})(Backbone.Collection);
function test_collection() {
    var Book;
    var Library = Backbone.Collection.extend({
        model: Book
    });

    var Books;

    Books.each(function (book) {
    });

    var titles = Books.map(function (book) {
        return book.get("title");
    });

    var publishedBooks = Books.filter(function (book) {
        return book.get("published") === true;
    });

    var alphabetical = Books.sortBy(function (book) {
        return null;
    });
}

//////////
Backbone.history.start();

var v1Changes;
(function (v1Changes) {
    var events;
    (function (events) {
        function test_once() {
            var model = new Employee();
            model.once('invalid', function () {
            }, this);
            model.once('invalid', function () {
            });
        }

        function test_listenTo() {
            var model = new Employee();
            var view = new Backbone.View();
            view.listenTo(model, 'invalid', function () {
            });
        }

        function test_listenToOnce() {
            var model = new Employee();
            var view = new Backbone.View();
            view.listenToOnce(model, 'invalid', function () {
            });
        }

        function test_stopListening() {
            var model = new Employee();
            var view = new Backbone.View();
            view.stopListening(model, 'invalid', function () {
            });
            view.stopListening(model, 'invalid');
            view.stopListening(model);
        }
    })(events || (events = {}));

    var modelandcollection;
    (function (modelandcollection) {
        function test_url() {
            Employee.prototype.url = function () {
                return '/employees';
            };
            EmployeeCollection.prototype.url = function () {
                return '/employees';
            };
        }

        function test_parse() {
            var model = new Employee();
            model.parse('{}', {});
            var collection = new EmployeeCollection();
            collection.parse('{}', {});
        }

        function test_toJSON() {
            var model = new Employee();
            model.toJSON({});
            var collection = new EmployeeCollection();
            collection.toJSON({});
        }

        function test_sync() {
            var model = new Employee();
            model.sync();
            var collection = new EmployeeCollection();
            collection.sync();
        }
    })(modelandcollection || (modelandcollection = {}));

    var model;
    (function (model) {
        function test_validationError() {
            var model = new Employee();
            if (model.validationError) {
                console.log('has validation errors');
            }
        }

        function test_fetch() {
            var model = new Employee({ id: 1 });
            model.fetch({
                success: function () {
                },
                error: function () {
                }
            });
        }

        function test_set() {
            var model = new Employee();
            model.set({ name: 'JoeDoe', age: 21 }, { validate: false });
            model.set('name', 'JoeDoes', { validate: false });
        }

        function test_destroy() {
            var model = new Employee();
            model.destroy({
                wait: true,
                success: function (m, response, options) {
                },
                error: function (m, jqxhr, options) {
                }
            });

            model.destroy({
                success: function (m, response, options) {
                },
                error: function (m, jqxhr) {
                }
            });

            model.destroy({
                success: function () {
                },
                error: function (m, jqxhr) {
                }
            });
        }

        function test_save() {
            var model = new Employee();

            model.save({
                name: 'Joe Doe',
                age: 21
            }, {
                wait: true,
                validate: false,
                success: function (m, response, options) {
                },
                error: function (m, jqxhr, options) {
                }
            });

            model.save({
                name: 'Joe Doe',
                age: 21
            }, {
                success: function () {
                },
                error: function (m, jqxhr) {
                }
            });
        }

        function test_validate() {
            var model = new Employee();

            model.validate({ name: 'JoeDoe', age: 21 }, { validateAge: false });
        }
    })(model || (model = {}));

    var collection;
    (function (collection) {
        function test_fetch() {
            var collection = new EmployeeCollection();
            collection.fetch({ reset: true });
        }

        function test_create() {
            var collection = new EmployeeCollection();
            var model = new Employee();

            collection.create(model, {
                validate: false
            });
        }
    })(collection || (collection = {}));

    var router;
    (function (router) {
        function test_navigate() {
            var router = new Backbone.Router();

            router.navigate('/employees', { trigger: true });
            router.navigate('/employees', true);
        }
    })(router || (router = {}));
})(v1Changes || (v1Changes = {}));
//# sourceMappingURL=backbone-tests.js.map
