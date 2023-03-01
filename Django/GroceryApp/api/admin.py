from django.contrib import admin
from .models import Product, Images, Category, Review, Customer, Address, OrderItem, Order, Offers
from django.contrib.contenttypes.admin import GenericTabularInline
from django.utils.html import format_html, mark_safe


class ProductAdmin(admin.ModelAdmin):
    prepopulated_fields = {'slug': ('name',) }
    list_display = ("name","price")
    search_fields = ("name",)

    def image_img(self,obj):
        if obj.images:
            return mark_safe('<img src="%s"  height="100px"/>' % obj.images.url)
        else:
            return 'No_image'

class OrderAdmin(admin.ModelAdmin):
    
    list_display = (
            "order_number",
            "delivery_date",
            "delivery_status"
            )
    search_fields = ('carts',)
    style_fields     = {'items': 'm2m_transfer'}

admin.site.register(Product,ProductAdmin)
admin.site.register(Category)
admin.site.register(Review)
admin.site.register(Order, OrderAdmin)
admin.site.register(Customer)
admin.site.register(Address)
admin.site.register(OrderItem)
admin.site.register(Images)
admin.site.register(Offers)

