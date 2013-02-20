define([
	'jquery',
	'lodash',
	'backbone',
	'tastypie',
	'text!tpl/home_tpl.html'
], 

function($, _, Backbone, tastypie, home_tpl) {
   
    var HomeVew = Backbone.View.extend({

    	initialize: function() {
    		console.log('inicio vista HomeVew');
    		this.template = _.template(home_tpl);
    	},

    	render: function() {
    		this.$el.html(this.template());
    		return this.el;
    	}

    });
   
    return HomeVew; 
});