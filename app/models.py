from django.db import models

class Empleado(models.Model):

	nombre     = models.CharField(max_length=100)
	apellido   = models.CharField(max_length=100)
	profesion  = models.CharField(max_length=100)
	telefono   = models.CharField(max_length=15)

	def __unicode__(self):
		return u'%s' % (self.nombre)
		