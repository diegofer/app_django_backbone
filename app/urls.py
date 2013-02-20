from django.conf.urls import patterns, include, url

from tastypie.api import Api
from app.api import EmpleadoResource

empleado_resource = EmpleadoResource()

v1_api = Api(api_name='v1')
v1_api.register(EmpleadoResource())


urlpatterns = patterns('',
    
    url(r'^$', 'app.views.index', name='index'),

    url(r'^api/', include(v1_api.urls)),
)