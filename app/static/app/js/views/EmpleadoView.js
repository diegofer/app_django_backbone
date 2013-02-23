define([
	'jquery',
	'lodash',
	'backbone',
	'tastypie',
    'bootstrap',
	'text!tpl/empleado_tpl.html'
], 

function($, _, Backbone, tastypie, bootstrap, empleado_tpl) {

   
    var EmpleadoView = Backbone.View.extend({

    	modo: 'normal',


    	initialize: function(attributes) {
    		if (attributes.modo) this.modo = attributes.modo;
    		
    		this.template = _.template(empleado_tpl);
    		this.model.bind('change', this.alCambiar, this);
    	},

    	render: function() {
    		this.$el.html(this.template(this.model.toJSON()));
    		this.gestionarModo();
    		return this.el;
    	},

        events: {
            "click #guardar"  :    "guardarEmpleado",
            "click #editar"   :    "editarEmpleado",
            "click #eliminar" :    "eliminarEmpleado"
        },

        guardarEmpleado: function() {
            this.model.set({
                nombre:     $('#nombre').val(),
                apellido:   $('#apellido').val(),
                profesion:  $('#profesion').val(),
                telefono:   $('#telefono').val(),
            });

            if (this.model.isNew()) {
                var self = this;
                app.empleadoCollection.create(this.model, {
                    wait: true,
                    success: function(model) {
                        app.navigate('empleados'+ model.id, true);
                    }
                });
            } else {
                this.model.save({wait: true});
            }

        },

        editarEmpleado: function() {
            this.modo = 'editar';
            this.modoActualizar();
        },

        alCambiar: function() {
            this.modo = 'normal';
            this.render();
        },

        eliminarEmpleado: function() {
            $('#confirmacion').modal('hide');

            this.model.destroy({
                complete: function(objeto, exito){   
                    switch (objeto.status) { 
                        case 204: //Tastypie envia un codigo 204 cuando se elimina un modelo..
                            $('#respuesta').modal('show');
                            $('#respuesta').on('hidden', function () {
                                //app.navigate('', true); 
                                window.history.back();
                            });     
                            break;
                        default: 
                            console.log( objeto.status );                     
                    } 
                }
            });
        },



    	// Aqui se gestiona el modo de la visa, si es normal, o para crear un nuevo empleado

    	gestionarModo: function() {
    		if (this.modo == 'normal') this.modoNormal();
    		if (this.modo == 'nuevo') this.modoActualizar();
    	},

    	modoNormal: function() {
    		$(this.el).find('input').attr('readOnly', '');
    		$(this.el).find('#guardar').hide();
    	},

    	modoActualizar: function() {
    		$(this.el).find('#barra-left').remove();
            $(this.el).find('#guardar').show();
            if (this.modo == 'nuevo') $(this.el).find('#titulo').html('Nuevo Empleado');  
            if (this.modo == 'editar') $(this.el).find('#titulo').html('Editar Empleado'); 
            $(this.el).find('input').attr('readOnly', false)         
    	}


    });
   
    return EmpleadoView; 
});