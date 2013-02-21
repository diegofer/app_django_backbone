// Original concepts provided by Backbone Boilerplate project: https://github.com/tbranyen/backbone-boilerplate
require.config({
  // Initialize the application with the main application file
  deps: ["js/main"],

  baseUrl: "/static/app",    //Es la url que django nos ofrece.. vea el settings.py

  paths: {
    // Libraries
    jquery:     "js/libs/jquery-1.9.0.min",//"//ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min", 
    bootstrap:  "js/libs/bootstrap.min",
    lodash:     "js/libs/lodash.min",
    backbone:   "js/libs/backbone-min",
    tastypie:   "js/libs/backbone-tastypie",
    tpl:        "tpl",
    text:       "js/libs/text", 
  },

  shim: {

    bootstrap: {
      deps: ["jquery"],
    },

    backbone: {
      deps: ["lodash", "jquery"],
      exports: "Backbone"
    },

    tastypie: {
      deps: ["backbone", "lodash", "jquery"]
    }
  }
});