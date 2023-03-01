from django.db import models
from django.contrib.auth.models import User
from django.utils.html import format_html
from django.utils.html import mark_safe, escape

# Create your models here.

class Images(models.Model):
    image = models.ImageField(upload_to='data/media/products', default='/media/data/media/products/1.jpg', blank=True)
    
    def __str__(self):
        return str(self.image)

class Product(models.Model):
    name = models.CharField(max_length=50, null=True)
    description = models.TextField(null=True)
    product_detail = models.TextField(null=True)
    weight = models.IntegerField(null=True)
    slug = models.SlugField(null=True)
    marked_price = models.FloatField(null=True)
    price = models.FloatField(null=True)
    seo_meta_title = models.CharField(max_length=80, default=f"{name} - Buy Online in Nepal at Best Price", null=True)
    seo_meta_description = models.TextField(max_length=280, null=True)
    images = models.ManyToManyField(Images, blank=True)

    def __str__(self):
        return self.name

class Category(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    products = models.ManyToManyField(Product, related_name="product")
    images = models.ImageField(upload_to='data/media/category', null=True)

    def __str__(self):
        return self.name

class Review(models.Model):
    rating_choices = (
        ('1', 'Poor'),
        ('2', 'Below Average'),
        ('3', 'Average'),
        ('4', 'Good'),
        ('5', 'Amazing'),
    )
    rating = models.CharField(choices=rating_choices, max_length=15, null=True)
    content = models.TextField()
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='comments', related_query_name='comment')
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='comments', related_query_name='comment')

    def __str__(self):
        return self.title

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


class Customer(models.Model):
    custom_user = models.OneToOneField(User,related_name='customer', on_delete=models.CASCADE)
    phone = models.CharField(max_length=15)
    date_of_birth = models.DateField(auto_now=False, auto_now_add=False)
    address = models.ManyToManyField(Address, verbose_name="Billing")
    profile_image = models.ImageField(upload_to="data/media/users", null=True)

    def __str__(self):
        return self.custom_user.username


class OrderItem(models.Model):
    prod = models.ForeignKey(Product, related_name="item", on_delete=models.CASCADE)
    quantity = models.IntegerField(default=1, null=True)

    def __str__(self):
        orderdetail = "Prod Id="+str(self.prod.id) + "| Product Name=" + self.prod.name+"| Prod Qty= "+str(self.quantity)
        return orderdetail

# class OrderItem(models.Model):
#     user = models.ForeignKey(Customer,on_delete=models.CASCADE)
#     ordered = models.BooleanField(default=False)
#     item = models.ForeignKey(Product, on_delete=models.CASCADE)
#     quantity = models.IntegerField(default=1)

class Order(models.Model):
    payment_options= (
        ('COD', 'Cash on Delivery'),
        ('BANK', 'Bank Transfer'),
        ('WALLET', 'Wallet Transfer'),
    )
    delivery_options= (
        ('Placed', 'Placed'),
        ('Processing', 'Processing'),
        ('Delivered', 'Delivered'),
        ('Cancelled', 'Cancelled'),
    )
    order_number = models.AutoField(primary_key=True)
    items =  models.ManyToManyField(OrderItem)
    order_address = models.ManyToManyField(Address)
    delivery_date = models.DateTimeField(auto_now_add=False)
    price = models.FloatField()
    payment_method = models.CharField(max_length=6, choices=payment_options)
    delivery_status = models.CharField(max_length=16, choices=delivery_options, default='Placed')
    order_user = models.ForeignKey(Customer, on_delete=models.CASCADE, null=True)

    class Meta:
        ordering = ['order_number']

    def __str__(self):
        ord = str(self.order_number)
        ord_text = "Order #"+ord
        return ord_text


class Offers(models.Model):
    offer_image = models.ImageField(upload_to="data/media/offer")
    offer_text = models.CharField(max_length=250)