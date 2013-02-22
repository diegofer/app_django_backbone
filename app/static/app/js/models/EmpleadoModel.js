define([
	'jquery',
	'lodash',
	'backbone',
	'tastypie',
], 

function($, _, Backbone, tastypie) {
   
    var EmpleadoModel = Backbone.Model.extend({

    	urlRoot: "/api/v1/empleado/",
    	
    	defaults: {
    		"nombre": "",
    		"apellido": "",
    		"profesion": "",
    		"telefono": "",
    	}


    });
   
    return EmpleadoModel; 
});