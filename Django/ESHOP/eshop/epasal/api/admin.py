from django.contrib import admin
from api.models import UserProfile, Shop, Category, Item, Order, Address, OrderItem

# Register your models here.
admin.site.register(UserProfile)
admin.site.register(Shop)
admin.site.register(Category)
admin.site.register(Item)
admin.site.register(Order)
admin.site.register(Address)
admin.site.register(OrderItem)