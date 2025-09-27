from django.contrib import admin
from .models import Categoria, Producto

@admin.register(Categoria)
class CategoriaAdmin(admin.ModelAdmin):
    list_display = ['nombre', 'descripcion']
    search_fields = ['nombre']

@admin.register(Producto)
class ProductoAdmin(admin.ModelAdmin):
    list_display = ['nombre', 'precio', 'precio_promocion', 'categoria', 'activo']
    list_filter = ['categoria', 'activo']
    search_fields = ['nombre']
    list_editable = ['precio', 'precio_promocion', 'activo']