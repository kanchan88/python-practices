from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class UserProfile(models.Model):
    user_main = models.OneToOneField(User, on_delete=models.CASCADE, related_name='user_main')
    phone = models.CharField(max_length=15)

    def __str__(self):
        return self.user_main.username

class Shop(models.Model):
    shop_name = models.CharField(max_length=150)
    shop_address = models.CharField(max_length=200)
    shop_logo = models.ImageField(upload_to="media", null=True)
    user_id = models.ForeignKey(User, on_delete=models.CASCADE, null=True)

    def __str__(self):
        return self.shop_name

class Category(models.Model):
    category_name = models.CharField(max_length=150)
    category_description = models.TextField()
    user_id = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    shop_id = models.ForeignKey(Shop, verbose_name="shop", on_delete=models.CASCADE)

    def __str__(self):
        return self.category_name

class Item(models.Model):
    item_name = models.CharField(max_length=50)
    item_sell_price = models.FloatField()
    item_description = models.TextField()
    item_image = models.ImageField(upload_to="media", null=True)
    item_category = models.ForeignKey(Category, verbose_name="category", on_delete=models.CASCADE)
    shop_id = models.ForeignKey(Shop, verbose_name="shop",  on_delete=models.CASCADE)
    user_id = models.ForeignKey(User, on_delete=models.CASCADE, null=True)

    def __str__(self):
        return self.item_name

class OrderItem(models.Model):
    item = models.ForeignKey(Item, verbose_name="item",  on_delete=models.CASCADE)
    count = models.IntegerField()
    order_note = models.TextField()

    def __str__(self):
        return self.item.item_name

class Address(models.Model):
    address_1 = models.CharField(max_length=50)
    address_2 = models.CharField(max_length=50)
    city	= models.CharField(max_length=50)   
    state	= models.CharField(max_length=50)
    postcode = models.CharField(max_length=10)
    country	= models.CharField(max_length=5)

    def __str__(self):
        address = self.address_1 + " | " + self.address_2 + " | " + self.city + " | " + self.state + " | " + self.country
        return address

class Order(models.Model):
    items = models.ForeignKey(OrderItem, verbose_name="orderitem",  on_delete=models.CASCADE)
    billing = models.ForeignKey(Address, related_name="billing",  on_delete=models.CASCADE)
    shipping = models.ForeignKey(Address, related_name="shipping",  on_delete=models.CASCADE)
    payment_method = models.CharField(max_length=10)
    order_status = models.CharField(max_length=10)
    total_payment = models.IntegerField()
    delivery_date = models.CharField(max_length=15)
    user_id = models.ForeignKey(User, on_delete=models.CASCADE, null=True)

    def __str__(self):
        shop = "Orders Of : "+self.user_id.username
        return shop
    


