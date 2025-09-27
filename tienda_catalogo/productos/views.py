from django.shortcuts import render
from .models import Categoria, Producto

def index(request):
    categorias = Categoria.objects.all()
    productos = Producto.objects.filter(activo=True)
    
    # Organizar productos por categoría
    productos_por_categoria = {}
    for categoria in categorias:
        productos_categoria = productos.filter(categoria=categoria)
        if productos_categoria.exists():
            productos_por_categoria[categoria] = productos_categoria
    
    context = {
        'categorias': categorias,
        'productos_por_categoria': productos_por_categoria,
    }
    return render(request, 'index.html', context)