define([
	'jquery',
	'lodash',
	'backbone',
	'tastypie',
	'text!tpl/empleado_tpl.html'
], 

function($, _, Backbone, tastypie, empleado_tpl) {

   
    var EmpleadoView = Backbone.View.extend({

    	modo: 'normal',


    	initialize: function(attributes) {
    		if (attributes.modo) this.modo = attributes.modo;
    		
    		this.template = _.template(empleado_tpl);
    		this.model.bind('change', this.render, this);
    	},

    	render: function() {
    		this.$el.html(this.template(this.model.toJSON()));
    		this.gestionarModo();
    		return this.el;
    	},



    	// Aqui se gestiona el modo de la visa, si es normal, o para crear un nuevo empleado

    	gestionarModo: function() {
    		if (this.modo == 'normal') this.modoNormal();
    		if (this.modo == 'crear') this.modoCrear();
    	},

    	modoNormal: function() {
    		$(this.el).find('input').attr('readOnly', '');
    		$(this.el).find('#guardar').remove();
    	},

    	modoCrear: function() {
    		$(this.el).find('#barra-left').remove();
    		$(this.el).find('#titulo').html('Nuevo Empleado');
    	}


    });
   
    return EmpleadoView; 
});