from tastypie.resources import ModelResource
from tastypie.authorization import Authorization

from app.models import Empleado

class EmpleadoResource(ModelResource):
	class Meta:	
		always_return_data = True
		queryset = Empleado.objects.all()
		allowed_methods = ['get', 'delete', 'post', 'put']
		authorization = Authorization()	
		#detail_allowed_methods = ['get', 'post', 'put', 'delete']
		#resource_name = 'empleado'