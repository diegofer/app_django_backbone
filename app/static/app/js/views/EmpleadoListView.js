define([
	'jquery',
	'lodash',
	'backbone',
	'tastypie',
	'text!tpl/empleado_list_item_tpl.html'
],

function($, _, Backbone, tastypie, empleado_list_item_tpl) {
   
    var EmpleadoListView = Backbone.View.extend({

    	tagName:   'ul',
    	className: 'nav nav-list',

    	initialize: function() {
    		this.model.bind("reset", this.render, this);
    		this.model.bind("add", this.agregarNuevoEmpleado, this);
    	},

    	render: function() {
    		_.each( this.model.models, function(empleado) {

    			this.agregarNuevoEmpleado(empleado);

    		}, this );

    		return this.el;
    	},

    	agregarNuevoEmpleado: function(empleado) {
    		this.$el.append( new EmpleadoListItemView({
    			model: empleado
    		}).render() );
    	}
    });


    var EmpleadoListItemView = Backbone.View.extend({

    	tagName: 'li',
        className: 'empleado-list-item',

        events: {
            "click": "alClick",
        },

        initialize: function() {
            this.template = _.template(empleado_list_item_tpl);
            this.model.bind('change', this.render, this);
            this.model.bind("destroy", this.close, this); // Cierra la vista de Item cuando un modelo es destruido, no importa donde
        },

        render: function(eventName) {

            this.$el.html( this.template( this.model.toJSON() ) );
            return this.el;
        },

        alClick: function() {
            $('.empleado-list-item').removeClass('active');
            this.$el.addClass('active');
        }
    });
   
    return EmpleadoListView; 
}); 