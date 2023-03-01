from django.urls import path
from frontend.views import homepage, product_details

urlpatterns = [
    path('',homepage, name="orders"),
    path('details/<slug>', product_details,name='details')
]