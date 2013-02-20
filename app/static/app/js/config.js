// Original concepts provided by Backbone Boilerplate project: https://github.com/tbranyen/backbone-boilerplate
require.config({
  // Initialize the application with the main application file
  deps: ["main"],

  baseUrl: "/static/app/js",    //Es la url que django nos ofrece.. vea el settings.py

  paths: {
    // Libraries
    jquery:     "libs/jquery-1.9.0.min",//"//ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min", 
    bootstrap:  "libs/bootstrap.min",
    lodash:     "libs/lodash.min",
    backbone:   "libs/backbone-min",
    tastypie:   "libs/backbone-tastypie",
    tpl:        "../tpl",
    text:       "libs/text", 
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