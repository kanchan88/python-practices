from django.shortcuts import render
from api.models import Product, Category

# Create your views here.
def homepage(request):
    categories = Category.objects.all()
    products = Product.objects.all()
    return render(request, "index.html", {'categories':categories, 'products':products})


def product_details(request,slug):
    product = Product.objects.get(slug=slug)
    allproducts = Product.objects.all()[:4]
    return render(request, "single.html", {'product':product, 'allproducts':allproducts})