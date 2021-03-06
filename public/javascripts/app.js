(function(/*! Brunch !*/) {
  'use strict';

  var globals = typeof window !== 'undefined' ? window : global;
  if (typeof globals.require === 'function') return;

  var modules = {};
  var cache = {};

  var has = function(object, name) {
    return ({}).hasOwnProperty.call(object, name);
  };

  var expand = function(root, name) {
    var results = [], parts, part;
    if (/^\.\.?(\/|$)/.test(name)) {
      parts = [root, name].join('/').split('/');
    } else {
      parts = name.split('/');
    }
    for (var i = 0, length = parts.length; i < length; i++) {
      part = parts[i];
      if (part === '..') {
        results.pop();
      } else if (part !== '.' && part !== '') {
        results.push(part);
      }
    }
    return results.join('/');
  };

  var dirname = function(path) {
    return path.split('/').slice(0, -1).join('/');
  };

  var localRequire = function(path) {
    return function(name) {
      var dir = dirname(path);
      var absolute = expand(dir, name);
      return globals.require(absolute, path);
    };
  };

  var initModule = function(name, definition) {
    var module = {id: name, exports: {}};
    cache[name] = module;
    definition(module.exports, localRequire(name), module);
    return module.exports;
  };

  var require = function(name, loaderPath) {
    var path = expand(name, '.');
    if (loaderPath == null) loaderPath = '/';

    if (has(cache, path)) return cache[path].exports;
    if (has(modules, path)) return initModule(path, modules[path]);

    var dirIndex = expand(path, './index');
    if (has(cache, dirIndex)) return cache[dirIndex].exports;
    if (has(modules, dirIndex)) return initModule(dirIndex, modules[dirIndex]);

    throw new Error('Cannot find module "' + name + '" from '+ '"' + loaderPath + '"');
  };

  var define = function(bundle, fn) {
    if (typeof bundle === 'object') {
      for (var key in bundle) {
        if (has(bundle, key)) {
          modules[key] = bundle[key];
        }
      }
    } else {
      modules[bundle] = fn;
    }
  };

  var list = function() {
    var result = [];
    for (var item in modules) {
      if (has(modules, item)) {
        result.push(item);
      }
    }
    return result;
  };

  globals.require = require;
  globals.require.define = define;
  globals.require.register = define;
  globals.require.list = list;
  globals.require.brunch = true;
})();
require.register("Application", function(exports, require, module) {

/*//CoffeeScript///////////////////////////////////////////////////////////////////
// 
// Copyright 2012 
// 
/////////////////////////////////////////////////////////////////////////////////
 */

/*
 * Application Bootstrapper
 * 
 * @langversion CoffeeScript
 * 
 * @author 
 * @since
 */
var Application;

Application = {

  /*//--------------------------------------
  //+ PUBLIC PROPERTIES / CONSTANTS
  //--------------------------------------
   */

  /*//--------------------------------------
  //+ INHERITED / OVERRIDES
  //--------------------------------------
   */
  initialize: function() {
    var MenuItemsModel, MenuView, Router;
    MenuView = require('views/react/MenuView');
    MenuItemsModel = require('models/MenuItemsModel');
    React.renderComponent(MenuView({
      collection: new MenuItemsModel()
    }), $('#menu-container').get(0));
    Router = require('routers/Router');
    this.router = new Router();
    return typeof Object.freeze === "function" ? Object.freeze(this) : void 0;
  }
};

module.exports = Application;
});

;require.register("config/ApplicationConfig", function(exports, require, module) {

/*
 * Application Configuration
 * 
 * @langversion CoffeeScript
 * 
 * @author 
 * @since
 */
var ApplicationConfig;

ApplicationConfig = (function() {
  function ApplicationConfig() {}

  ApplicationConfig.BASE_URL = "/";

  return ApplicationConfig;

})();

module.exports = ApplicationConfig;
});

;require.register("events/ApplicationEvents", function(exports, require, module) {

/*
 * Application Events
 * 
 * @langversion CoffeeScript
 * 
 * @author 
 * @since
 */
var ApplicationEvents;

ApplicationEvents = (function() {
  function ApplicationEvents() {}

  ApplicationEvents.APPLICATION_INITIALIZED = "onApplicationInitialized";

  return ApplicationEvents;

})();

module.exports = ApplicationConfig;
});

;require.register("helpers/ViewHelper", function(exports, require, module) {

/*
 * Handlebars Template Helpers
 * 
 * @langversion CoffeeScript
 * 
 * @author 
 * @since
 */

/*//--------------------------------------
//+ PUBLIC PROPERTIES / CONSTANTS
//--------------------------------------
 */

/*//--------------------------------------
//+ PUBLIC METHODS / GETTERS / SETTERS
//--------------------------------------
 */
Handlebars.registerHelper('link', function(text, url) {
  var result;
  text = Handlebars.Utils.escapeExpression(text);
  url = Handlebars.Utils.escapeExpression(url);
  result = '<a href="' + url + '">' + text + '</a>';
  return new Handlebars.SafeString(result);
});
});

;require.register("initialize", function(exports, require, module) {

/*
 * Application Initializer
 * 
 * @langversion CoffeeScript
 * 
 * @author 
 * @since
 */
var application, _compareHelper;

application = require('Application');

$(function() {
  application.initialize();
  return Backbone.history.start();
});

_compareHelper = function(lvalue, operator, rvalue, options) {
  var operators, result;
  if (arguments.length < 3) {
    throw new Error("Handlerbars Helper 'compare' needs 2 parameters");
  }
  if (options === void 0) {
    options = rvalue;
    rvalue = operator;
    operator = "==";
  }
  operators = {
    '==': (function(_this) {
      return function(l, r) {
        return l === r;
      };
    })(this),
    '!=': (function(_this) {
      return function(l, r) {
        return l !== r;
      };
    })(this),
    '<': (function(_this) {
      return function(l, r) {
        return l < r;
      };
    })(this),
    '>': (function(_this) {
      return function(l, r) {
        return l > r;
      };
    })(this),
    '<=': (function(_this) {
      return function(l, r) {
        return l <= r;
      };
    })(this),
    '>=': (function(_this) {
      return function(l, r) {
        return l >= r;
      };
    })(this),
    'typeof': (function(_this) {
      return function(l, r) {
        return typeof l === r;
      };
    })(this)
  };
  if (!operators[operator]) {
    throw new Error("Handlerbars Helper 'compare' doesn't know the operator " + operator);
  }
  result = operators[operator](lvalue, rvalue);
  if (result) {
    return options.fn(this);
  } else {
    return options.inverse(this);
  }
};

Handlebars.registerHelper('compare', _compareHelper);
});

;require.register("models/EventsModel", function(exports, require, module) {
var GoogleDocsModel, UsersModel,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

GoogleDocsModel = require('./supers/GoogleDocsModel');

module.exports = UsersModel = (function(_super) {
  __extends(UsersModel, _super);

  function UsersModel() {
    this.initialize = __bind(this.initialize, this);
    return UsersModel.__super__.constructor.apply(this, arguments);
  }

  UsersModel.prototype.defaults = {
    "status": "initiation"
  };

  UsersModel.prototype.initialize = function() {
    this.docUrl = 'https://docs.google.com/spreadsheets/d/1UHKVbr2w_bH7-SKywn9EyCeU6hxq8QzhokjQslbQQoc/pubhtml';
    this.idAttribute = 'Events';
    return UsersModel.__super__.initialize.call(this);
  };

  return UsersModel;

})(GoogleDocsModel);
});

;require.register("models/MenuItemModel", function(exports, require, module) {
var MenuItemModel, Model,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Model = require('./supers/Model');

module.exports = MenuItemModel = (function(_super) {
  __extends(MenuItemModel, _super);

  function MenuItemModel() {
    return MenuItemModel.__super__.constructor.apply(this, arguments);
  }

  return MenuItemModel;

})(Model);
});

;require.register("models/MenuItemsModel", function(exports, require, module) {
var Collection, MenuItemModel, MenuItemsModel,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Collection = require('./supers/Collection');

MenuItemModel = require('./MenuItemModel');

module.exports = MenuItemsModel = (function(_super) {
  __extends(MenuItemsModel, _super);

  function MenuItemsModel() {
    return MenuItemsModel.__super__.constructor.apply(this, arguments);
  }

  MenuItemsModel.prototype.model = MenuItemModel;

  MenuItemsModel.prototype.initialize = function() {
    console.log('init col');
    console.log(this);
    this.push(new MenuItemModel({
      url: 'home',
      text: 'tippa:',
      itemSelected: true
    }));
    this.push(new MenuItemModel({
      url: 'events',
      text: 'Matcher',
      itemSelected: false
    }));
    this.push(new MenuItemModel({
      url: 'users',
      text: 'Användare',
      itemSelected: false
    }));
    return console.log(this);
  };

  return MenuItemsModel;

})(Collection);
});

;require.register("models/UsersModel", function(exports, require, module) {
var GoogleDocsModel, UsersModel,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

GoogleDocsModel = require('./supers/GoogleDocsModel');

module.exports = UsersModel = (function(_super) {
  __extends(UsersModel, _super);

  function UsersModel() {
    this.initialize = __bind(this.initialize, this);
    return UsersModel.__super__.constructor.apply(this, arguments);
  }

  UsersModel.prototype.initialize = function() {
    this.docUrl = 'https://docs.google.com/spreadsheets/d/1UHKVbr2w_bH7-SKywn9EyCeU6hxq8QzhokjQslbQQoc/pubhtml';
    this.idAttribute = 'Users';
    return UsersModel.__super__.initialize.call(this);
  };

  return UsersModel;

})(GoogleDocsModel);
});

;require.register("models/supers/Collection", function(exports, require, module) {

/*
 * Base Class for all Backbone Collections
 * 
 * @langversion CoffeeScript
 * 
 * @author 
 * @since
 */
var Collection,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

module.exports = Collection = (function(_super) {

  /*//--------------------------------------
  	//+ PUBLIC PROPERTIES / CONSTANTS
  	//--------------------------------------
   */

  /*//--------------------------------------
  	//+ INHERITED / OVERRIDES
  	//--------------------------------------
   */

  /*//--------------------------------------
  	//+ PUBLIC METHODS / GETTERS / SETTERS
  	//--------------------------------------
   */

  /*//--------------------------------------
  	//+ EVENT HANDLERS
  	//--------------------------------------
   */

  /*//--------------------------------------
  	//+ PRIVATE AND PROTECTED METHODS
  	//--------------------------------------
   */
  __extends(Collection, _super);

  function Collection() {
    return Collection.__super__.constructor.apply(this, arguments);
  }

  return Collection;

})(Backbone.Collection);
});

;require.register("models/supers/GoogleDocsModel", function(exports, require, module) {
var GoogleDocsModel, Model,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Model = require('./Model');

module.exports = GoogleDocsModel = (function(_super) {
  __extends(GoogleDocsModel, _super);

  function GoogleDocsModel() {
    this.initialize = __bind(this.initialize, this);
    this.success = __bind(this.success, this);
    return GoogleDocsModel.__super__.constructor.apply(this, arguments);
  }

  GoogleDocsModel.prototype.docUrl = '';

  GoogleDocsModel.prototype.success = function(data, tabletop) {
    console.log('success');
    console.log(data);
    console.log(tabletop);
    this.set(this.idAttribute, tabletop.sheets(this.idAttribute).elements);
    return console.log(this);
  };

  GoogleDocsModel.prototype.initialize = function() {
    console.log(this.docUrl);
    return Tabletop.init({
      key: this.docUrl,
      callback: this.success,
      simpleSheet: false
    });
  };

  GoogleDocsModel.prototype.idAttribute = 'Blad1';

  return GoogleDocsModel;

})(Model);
});

;require.register("models/supers/Model", function(exports, require, module) {

/*
 * Base Class for all Backbone Models
 * 
 * @langversion CoffeeScript
 * 
 * @author 
 * @since
 */
var Model,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

module.exports = Model = (function(_super) {

  /*//--------------------------------------
  	//+ PUBLIC PROPERTIES / CONSTANTS
  	//--------------------------------------
   */

  /*//--------------------------------------
  	//+ INHERITED / OVERRIDES
  	//--------------------------------------
   */

  /*//--------------------------------------
  	//+ PUBLIC METHODS / GETTERS / SETTERS
  	//--------------------------------------
   */

  /*//--------------------------------------
  	//+ EVENT HANDLERS
  	//--------------------------------------
   */

  /*//--------------------------------------
  	//+ PRIVATE AND PROTECTED METHODS
  	//--------------------------------------
   */
  __extends(Model, _super);

  function Model() {
    return Model.__super__.constructor.apply(this, arguments);
  }

  return Model;

})(Backbone.Model);
});

;require.register("routers/Router", function(exports, require, module) {

/*
 * Backbone Primary Router
 * 
 * @langversion CoffeeScript
 * 
 * @author 
 * @since
 */
var EventsModel, EventsView, HomeView, Router, UsersModel, UsersView, application,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

application = require('Application');

UsersModel = require('../models/UsersModel');

UsersView = require('../views/react/UsersView');

EventsModel = require('../models/EventsModel');

EventsView = require('../views/react/EventsView');

HomeView = require('../views/react/HomeView');

console.log(HomeView);

module.exports = Router = (function(_super) {
  __extends(Router, _super);

  function Router() {
    return Router.__super__.constructor.apply(this, arguments);
  }


  /*//--------------------------------------
  	//+ Routes
  	//--------------------------------------
   */

  Router.prototype.routes = {
    '': 'home',
    'home': 'home',
    'users': 'users',
    'events': 'events'
  };


  /*//--------------------------------------
  	//+ Route Handlers
  	//--------------------------------------
   */

  Router.prototype.home = function() {
    return React.renderComponent(HomeView({}), $('#main-container').get(0));
  };

  Router.prototype.users = function() {
    var usersModel;
    usersModel = new UsersModel();
    return React.renderComponent(UsersView({
      model: usersModel
    }), $('#main-container').get(0));
  };

  Router.prototype.events = function() {
    var eventsModel;
    eventsModel = new EventsModel();
    return React.renderComponent(EventsView({
      model: eventsModel
    }), $('#main-container').get(0));
  };

  return Router;

})(Backbone.Router);
});

;require.register("utils/BackboneView", function(exports, require, module) {

/*
 * View Description
 * 
 * @langversion CoffeeScript
 * 
 * @author 
 * @since
 */
var BackboneView, View, template,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

View = require('./supers/View');

template = require('templates/HomeViewTemplate');

module.exports = BackboneView = (function(_super) {
  __extends(BackboneView, _super);

  function BackboneView() {
    return BackboneView.__super__.constructor.apply(this, arguments);
  }


  /*//--------------------------------------
  	//+ PUBLIC PROPERTIES / CONSTANTS
  	//--------------------------------------
   */

  BackboneView.prototype.id = 'view';

  BackboneView.prototype.template = template;


  /*//--------------------------------------
   	//+ INHERITED / OVERRIDES
   	//--------------------------------------
   */

  BackboneView.prototype.initialize = function() {
    return this.render = _.bind(this.render, this);
  };

  BackboneView.prototype.render = function() {
    this.$el.html(this.template(this.getRenderData()));
    return this;
  };

  BackboneView.prototype.getRenderData = function() {
    return {
      content: "View Content"
    };
  };


  /*//--------------------------------------
  	//+ PUBLIC METHODS / GETTERS / SETTERS
  	//--------------------------------------
   */


  /*//--------------------------------------
  	//+ EVENT HANDLERS
  	//--------------------------------------
   */


  /*//--------------------------------------
  	//+ PRIVATE AND PROTECTED METHODS
  	//--------------------------------------
   */

  return BackboneView;

})(View);
});

;require.register("views/EventsView", function(exports, require, module) {

/*
 * View Description
 * 
 * @langversion CoffeeScript
 * 
 * @author Mats Fryklund
 * @since
 */
var EventsModel, EventsView, View, template,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

View = require('./supers/View');

EventsModel = require('../models/EventsModel');

template = require('./templates/EventsTemplate');

module.exports = EventsView = (function(_super) {
  __extends(EventsView, _super);

  function EventsView() {
    this.newData = __bind(this.newData, this);
    this.getRenderData = __bind(this.getRenderData, this);
    return EventsView.__super__.constructor.apply(this, arguments);
  }


  /*//--------------------------------------
  	//+ PUBLIC PROPERTIES / CONSTANTS
  	//--------------------------------------
   */

  EventsView.prototype.id = 'events-view';

  EventsView.prototype.template = template;


  /*//--------------------------------------
   	//+ INHERITED / OVERRIDES
   	//--------------------------------------
   */

  EventsView.prototype.initialize = function() {
    this.render = _.bind(this.render, this);
    this.model = new EventsModel();
    return this.model.on('change', this.newData);
  };

  EventsView.prototype.render = function() {
    console.log('render');
    console.log(this.getRenderData());
    this.$el.html(this.template(this.getRenderData()));
    return this;
  };

  EventsView.prototype.getRenderData = function() {
    console.log(this.model.toJSON());
    return this.model.toJSON();
  };


  /*//--------------------------------------
  	//+ PUBLIC METHODS / GETTERS / SETTERS
  	//--------------------------------------
   */


  /*//--------------------------------------
  	//+ EVENT HANDLERS
  	//--------------------------------------
   */

  EventsView.prototype.newData = function(event) {
    console.log('new Data');
    console.log(this.model);
    return this.render();
  };


  /*//--------------------------------------
  	//+ PRIVATE AND PROTECTED METHODS
  	//--------------------------------------
   */

  return EventsView;

})(View);
});

;require.register("views/HomeView", function(exports, require, module) {

/*
 * View Description
 * 
 * @langversion CoffeeScript
 * 
 * @author 
 * @since
 */
var HomeView, View, template,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

View = require('./supers/View');

template = require('./templates/HomeViewTemplate');

module.exports = HomeView = (function(_super) {
  __extends(HomeView, _super);

  function HomeView() {
    return HomeView.__super__.constructor.apply(this, arguments);
  }


  /*//--------------------------------------
  	//+ PUBLIC PROPERTIES / CONSTANTS
  	//--------------------------------------
   */

  HomeView.prototype.id = 'home-view';

  HomeView.prototype.template = template;


  /*//--------------------------------------
   	//+ INHERITED / OVERRIDES
   	//--------------------------------------
   */

  HomeView.prototype.initialize = function() {
    return this.render = _.bind(this.render, this);
  };

  HomeView.prototype.render = function() {
    this.$el.html(this.template(this.getRenderData()));
    console.log(this.el);
    return this;
  };

  HomeView.prototype.getRenderData = function() {
    return {
      content: "Välkommen hem till..."
    };
  };


  /*//--------------------------------------
  	//+ PUBLIC METHODS / GETTERS / SETTERS
  	//--------------------------------------
   */


  /*//--------------------------------------
  	//+ EVENT HANDLERS
  	//--------------------------------------
   */


  /*//--------------------------------------
  	//+ PRIVATE AND PROTECTED METHODS
  	//--------------------------------------
   */

  return HomeView;

})(View);
});

;require.register("views/MenuView", function(exports, require, module) {

/*
 * View Description
 * 
 * @langversion CoffeeScript
 * 
 * @author 
 * @since
 */
var MenuView, View, template,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

View = require('./supers/View');

template = require('./templates/Menu');

module.exports = MenuView = (function(_super) {
  __extends(MenuView, _super);

  function MenuView() {
    this.setSelectedItem = __bind(this.setSelectedItem, this);
    return MenuView.__super__.constructor.apply(this, arguments);
  }


  /*//--------------------------------------
  	//+ PUBLIC PROPERTIES / CONSTANTS
  	//--------------------------------------
   */

  MenuView.prototype.id = 'menu-view';

  MenuView.prototype.template = template;


  /*//--------------------------------------
  	//+ INHERITED / OVERRIDES
  	//--------------------------------------
   */

  MenuView.prototype.initialize = function() {
    return this.render = _.bind(this.render, this);
  };

  MenuView.prototype.render = function() {
    this.$el.html(this.template(this.getRenderData()));
    return this;
  };

  MenuView.prototype.menuItems = [
    {
      url: 'home',
      text: 'fria progg presenterar:',
      itemSelected: true
    }, {
      url: 'news',
      text: 'Nyheter'
    }, {
      url: 'shows',
      text: 'Spelningar'
    }, {
      url: 'history',
      text: 'Historia'
    }, {
      url: 'contact',
      text: 'Kontakt'
    }, {
      url: 'pictures',
      text: 'Bilder'
    }, {
      url: 'sound',
      text: 'Musik'
    }
  ];

  MenuView.prototype.getRenderData = function() {
    return {
      content: "Välkommen",
      selectedItem: this.selectedItem,
      MenuItem: this.menuItems
    };
  };


  /*//--------------------------------------
  	//+ PUBLIC METHODS / GETTERS / SETTERS
  	//--------------------------------------
   */

  MenuView.prototype.selectedItem = 'Not set';

  MenuView.prototype.setSelectedItem = function(id) {
    var item, _i, _len, _ref, _results;
    _ref = this.menuItems;
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      item = _ref[_i];
      _results.push(item.itemSelected = item.url === id);
    }
    return _results;
  };


  /*//--------------------------------------
  	//+ EVENT HANDLERS
  	//--------------------------------------
   */


  /*//--------------------------------------
  	//+ PRIVATE AND PROTECTED METHODS
  	//--------------------------------------
   */

  return MenuView;

})(View);
});

;require.register("views/UsersView", function(exports, require, module) {

/*
 * View Description
 * 
 * @langversion CoffeeScript
 * 
 * @author Mats Fryklund
 * @since
 */
var UsersModel, UsersView, View, template,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

View = require('./supers/View');

UsersModel = require('../models/UsersModel');

template = require('./templates/UsersTemplate');

module.exports = UsersView = (function(_super) {
  __extends(UsersView, _super);

  function UsersView() {
    this.newData = __bind(this.newData, this);
    this.getRenderData = __bind(this.getRenderData, this);
    return UsersView.__super__.constructor.apply(this, arguments);
  }


  /*//--------------------------------------
  	//+ PUBLIC PROPERTIES / CONSTANTS
  	//--------------------------------------
   */

  UsersView.prototype.id = 'users-view';

  UsersView.prototype.template = template;


  /*//--------------------------------------
   	//+ INHERITED / OVERRIDES
   	//--------------------------------------
   */

  UsersView.prototype.initialize = function() {
    this.render = _.bind(this.render, this);
    this.model = new UsersModel();
    return this.model.on('change', this.newData);
  };

  UsersView.prototype.render = function() {
    console.log('render');
    console.log(this.getRenderData());
    this.$el.html(this.template(this.getRenderData()));
    return this;
  };

  UsersView.prototype.getRenderData = function() {
    console.log(this.model.toJSON());
    return this.model.toJSON();
  };


  /*//--------------------------------------
  	//+ PUBLIC METHODS / GETTERS / SETTERS
  	//--------------------------------------
   */


  /*//--------------------------------------
  	//+ EVENT HANDLERS
  	//--------------------------------------
   */

  UsersView.prototype.newData = function(event) {
    console.log('new Data');
    console.log(this.model);
    return this.render();
  };


  /*//--------------------------------------
  	//+ PRIVATE AND PROTECTED METHODS
  	//--------------------------------------
   */

  return UsersView;

})(View);
});

;require.register("views/react/EventView", function(exports, require, module) {
var EventView, b, button, div, label, td, tr, _ref;

_ref = React.DOM, tr = _ref.tr, td = _ref.td, b = _ref.b, button = _ref.button, div = _ref.div, label = _ref.label;

module.exports = EventView = React.createClass({
  getInitialState: function() {
    return {
      tips: ''
    };
  },
  render: function() {
    return tr({}, [
      td({}, [b({}, [this.props.home, ' - ', this.props.away, ' ', this.props.startAt]), div({}, [this.props.sport, ' - ', this.props.country, ' ', this.props.city, ' ', this.props.league])]), td({}, div({
        className: 'btn-group'
      }, [
        td({}, button({
          type: 'button',
          value: '1',
          className: 'btn btn-default',
          onClick: this.handleTipsClicked
        }, '1')), td({}, button({
          type: 'button',
          value: 'X',
          className: 'btn btn-default',
          onClick: this.handleTipsClicked
        }, 'X')), td({}, button({
          type: 'button',
          value: '2',
          className: 'btn btn-default',
          onClick: this.handleTipsClicked
        }, '2')), td({}, label({
          className: 'bounceInLeft animated'
        }, this.state.tips))
      ]))
    ]);
  },
  handleTipsClicked: function(e) {
    console.log(e);
    return this.setState({
      tips: e.target.value
    });
  }
});
});

;require.register("views/react/EventsView", function(exports, require, module) {
var EventView, EventsView, div, h3, table, _ref;

EventView = require('../../views/react/EventView');

_ref = React.DOM, div = _ref.div, h3 = _ref.h3, table = _ref.table;

console.log(Backbone);

module.exports = EventsView = React.createClass({
  mixins: [Backbone.React.Component.mixin],
  render: function() {
    var events;
    console.log(this.props.Events);
    if (this.props.Events) {
      events = this.props.Events.map(EventView);
      return div({
        className: 'one half'
      }, div({}, [
        h3({}, 'Aktuella matcher'), div({}, table({
          className: 'table table-hover'
        }, {
          events: events
        }))
      ]));
    } else {
      return div({
        className: 'one half'
      }, div({}, [h3({}, 'Aktuella matcher'), div({}, '----Laddar----')]));
    }
  }
});
});

;require.register("views/react/HomeView", function(exports, require, module) {
var HomeView, div, img, _ref;

_ref = React.DOM, div = _ref.div, img = _ref.img;

module.exports = HomeView = React.createClass({
  render: function() {
    return div({
      className: 'container'
    }, div({
      className: 'row'
    }, [
      div({
        className: 'one third'
      }, null), div({
        className: 'one third'
      }, div({
        className: 'bounceInDown animated'
      }, 'Utmana dina tipsvänner!'))
    ]));
  }
});
});

;require.register("views/react/MenuItemView", function(exports, require, module) {
var EventView, a, li, _ref;

_ref = React.DOM, li = _ref.li, a = _ref.a;

module.exports = EventView = React.createClass({
  render: function() {
    var _ref1;
    return li({
      className: (_ref1 = this.props.itemSelected) != null ? _ref1 : {
        'selected-menu-item': ''
      }
    }, a({
      className: 'noicon',
      href: '#' + this.props.url
    }, this.props.text));
  }
});
});

;require.register("views/react/MenuView", function(exports, require, module) {
var MenuItemView, MenuView, a, div, img, nav, ul, _ref;

MenuItemView = require('../../views/react/MenuItemView');

_ref = React.DOM, div = _ref.div, nav = _ref.nav, a = _ref.a, ul = _ref.ul, img = _ref.img;

console.log(Backbone);

module.exports = MenuView = React.createClass({
  mixins: [Backbone.React.Component.mixin],
  render: function() {
    var menuItems;
    console.log(this.props.collection);
    if (this.props.collection) {
      menuItems = this.props.collection.map(MenuItemView);
      return div({
        className: 'row'
      }, div({
        className: 'one whole'
      }, nav({
        role: "navigation",
        className: "nav nocollapse black"
      }, [
        a({
          href: "/#home"
        }, img({
          alt: "Tippa",
          src: "/images/TippaLogo.png"
        }, null)), ul({
          role: 'menubar'
        }), {
          menuItems: menuItems
        }
      ])));
    } else {
      return div({
        className: 'row'
      }, div({
        className: 'one whole'
      }, 'Laddar'));
    }
  }
});
});

;require.register("views/react/UserView", function(exports, require, module) {
var EventView, b, button, div, label, td, tr, _ref;

_ref = React.DOM, tr = _ref.tr, td = _ref.td, b = _ref.b, button = _ref.button, div = _ref.div, label = _ref.label;

module.exports = EventView = React.createClass({
  render: function() {
    return tr({}, [td({}, b({}, this.props.username)), td({}, this.props.name), td({}, this.props.email)]);
  }
});
});

;require.register("views/react/UsersView", function(exports, require, module) {
var EventsView, UserView, div, h3, table, _ref;

UserView = require('../../views/react/UserView');

_ref = React.DOM, div = _ref.div, h3 = _ref.h3, table = _ref.table;

console.log(Backbone);

module.exports = EventsView = React.createClass({
  mixins: [Backbone.React.Component.mixin],
  render: function() {
    var users;
    console.log(this.props.Users);
    if (this.props.Users) {
      users = this.props.Users.map(UserView);
      return div({
        className: 'one half'
      }, div({}, [
        h3({}, 'Användare'), div({}, table({
          className: 'table table-hover'
        }, {
          users: users
        }))
      ]));
    } else {
      return div({
        className: 'one half'
      }, div({}, [h3({}, 'Användare'), div({}, '----Laddar----')]));
    }
  }
});
});

;require.register("views/supers/View", function(exports, require, module) {

/*
 * View Base Class
 * 
 * @langversion CoffeeScript
 * 
 * @author 
 * @since
 */
var View,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

require('helpers/ViewHelper');

module.exports = View = (function(_super) {
  __extends(View, _super);

  function View() {
    return View.__super__.constructor.apply(this, arguments);
  }


  /*//--------------------------------------
  //+ PUBLIC PROPERTIES / CONSTANTS
  //--------------------------------------
   */

  View.prototype.template = function() {};

  View.prototype.getRenderData = function() {};


  /*//--------------------------------------
  //+ INHERITED / OVERRIDES
  //--------------------------------------
   */

  View.prototype.initialize = function() {
    return this.render = _.bind(this.render, this);
  };

  View.prototype.render = function() {
    this.$el.html(this.template(this.getRenderData()));
    this.afterRender();
    return this;
  };

  View.prototype.afterRender = function() {};


  /*//--------------------------------------
  //+ PUBLIC METHODS / GETTERS / SETTERS
  //--------------------------------------
   */


  /*//--------------------------------------
  //+ EVENT HANDLERS
  //--------------------------------------
   */


  /*//--------------------------------------
  //+ PRIVATE AND PROTECTED METHODS
  //--------------------------------------
   */

  return View;

})(Backbone.View);
});

;
//# sourceMappingURL=app.js.map