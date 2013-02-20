define([
	'jquery',
	'lodash',
	'backbone',
	'tastypie',
	'models/EmpleadoModel'
], 

function($, _, Backbone, tastypie, EmpleadoModel) {
   
    var EmpleadoCollection = Backbone.Collection.extend({

    	url: "/api/v1/empleado/",
    	model: EmpleadoModel


    });
   
    return EmpleadoCollection; 
});