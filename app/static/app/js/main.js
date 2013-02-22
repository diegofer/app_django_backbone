require([
	'jquery',
	'lodash',
	'backbone',
	'tastypie',
	'js/views/HomeView',
	'js/views/EmpleadoView',
	'js/views/EmpleadoListView',
	'js/models/EmpleadoModel',
	'js/models/EmpleadoCollection'
], 

function($, _, Backbone, tastypie, HomeView, EmpleadoView, EmpleadoListView, EmpleadoModel, EmpleadoCollection) {


	// Este codigo, libera la memoria al cambiar de vista...
	Backbone.View.prototype.close = function() {
        console.log('Closing view ' + this);
        if (this.beforeClose) {
            this.beforeClose();
        }
        this.remove();
        this.unbind();
    };

    var AppRouter = Backbone.Router.extend({

    	initialize: function() {
    		console.log('inicio el router');
    		//$('#contenido').html(new HomeView().render());
    	},

    	routes: {
    		""                  : "listaEmpleados",
    		"empleados/nuevo"   : "empleadoNuevo",
    		"empleados/*path"   : "empleadoDetalle"
    	},

    	listaEmpleados: function() {
    		this.before(function() {

    			this.showView('#contenido', new HomeView());
    		});
    	},

    	empleadoNuevo: function() {

    		this.before(function() {
    			this.showView('#contenido', new EmpleadoView({
    				model: new EmpleadoModel(),
    				modo: 'crear'
    			}));
    		});

    		

    	},

    	empleadoDetalle: function(path) {

    		this.before(function() {
    			var empleado = this.empleadoCollection.get('/'+path);
    			this.showView('#contenido', new EmpleadoView({model:empleado}) );
    		})
    	},

    	showView: function(selector, view) {
            if (this.currentView) this.currentView.close();

            $(selector).html(view.render());
            this.currentView = view;

            return view;
        },

    	before: function(callback) {
    		if (this.empleadoCollection) {
    			if (callback) callback.call(this);
    		}
    		else {
    			this.empleadoCollection = new EmpleadoCollection();
    			var self = this;

    			this.empleadoCollection.fetch({  // Aqui se hace la llamada a el api.

    				success: function() {

    					var empleadoListView = new EmpleadoListView({
    						model: self.empleadoCollection
    					}).render();

    					$('#lista-content').html(empleadoListView);

    					if (callback) callback.call(self);
    				}


    			});

    		}
    	}



    });

	$(document).ajaxStart(function(){
		console.log('empezo ajax');
        $('#spiner').show();
    }).ajaxStop(function(){
    	console.log('termino ajax');
        $('#spiner').hide();
    });    


    window.app = new AppRouter();
    Backbone.history.start();
   	
    
});