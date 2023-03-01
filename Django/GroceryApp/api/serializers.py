from rest_framework import serializers
from django.contrib.auth.models import User
from api.models import Customer, Address, Product, Images, Category, OrderItem, Order, Offers

class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Images
        fields = "__all__"

class OfferSerializer(serializers.ModelSerializer):
    class Meta:
        model = Offers
        fields = "__all__"

class ProductWithImageSerializer(serializers.ModelSerializer):

    images = ImageSerializer(many=True, required=False)
    class Meta:
        model = Product
        fields = [
            "id",
            "name",
            "description",
            "product_detail",
            "weight",
            "slug",
            "marked_price",
            "price",
            "seo_meta_title",
            "seo_meta_description",
            "images"
            ]
            
    def create(self, validated_data):
        image_data= validated_data.pop('images')
        for img in image_data:
            imgModel = Images.objects.create(
                image=img['image']
            )
        prod = Product.objects.create(**validated_data)
        prod.images.add(imgModel)
        return prod

    def update(self, instance, validated_data):
        if 'images' in validated_data:
            image_data= validated_data.pop('images')
            for img in image_data:
                imgModel = Images.objects.create(
                    image=img['image']
                )
            instance.images.clear()
            instance.images.add(imgModel)
        return super().update(instance, validated_data)

class OrderItemSerializer(serializers.ModelSerializer):

    class Meta:
        model = OrderItem
        fields = ["quantity", "prod"]

class AdressSerializer(serializers.ModelSerializer):

    class Meta:
        model = Address
        fields =[
            "address_1",
            "address_2",
            "city",
            "state",
            "postcode",
            "country"
        ]

class OrderSerializer(serializers.ModelSerializer):

    class Meta:
        model = Order
        fields = "__all__"


class CompleteOrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True)
    order_address = AdressSerializer(many=True)

    class Meta:
        model = Order
        fields =[
            "order_number",
            "items",
            "delivery_date",
            "price",
            "payment_method",
            "delivery_status",
            "order_address",
            "order_user"
        ]

    def create(self, validated_data):
        addresses = []

        address_data = validated_data.pop('order_address')

        for add_d in address_data:
            address = Address.objects.create(
                address_1=add_d['address_1'],
                address_2=add_d['address_2'],
                city=add_d['city'],
                state = add_d['state'],
                postcode=add_d['postcode'],
                country=add_d['country']
            )
            # if your address_data only includes required data you can do this instead
            # address = Address.objects.create(**add_d)
            addresses.append(address)

        items = validated_data.pop('items')

        order_items = []
        print(items)
        for item in items:
            prod = Product.objects.get(id=item['prod'].id) # if you have the prod id it's better to use than to look up by name
            quantity = item['quantity']
        
            order_item = OrderItem.objects.create(
                prod=prod, 
                quantity=quantity
            )
            order_items.append(order_item)

        order = Order.objects.create(**validated_data)
        for items in order_items:
            order.items.add(items)
        order.order_address.add(address)
        return order

# class CompleteOrderSerializer(serializers.ModelSerializer):
#     order_address = AdressSerializer()
#     items = OrderItemSerializer()

#     class Meta:
#         model = Order
#         fields = [
#             "order_number",
#             "items",
#             "delivery_date",
#             "price",
#             "payment_method",
#             "delivery_status",
#             "order_address",
#         ]

# class CompleteOrderSerializer(serializers.ModelSerializer):
#     items = OrderItemSerializer(many=True, required=True)
#     order_address = AdressSerializer(many=True, required=True)
    
#     class Meta:
#         model = Order
#         fields =[
#             "order_number",
#             "items",
#             "delivery_date",
#             "price",
#             "payment_method",
#             "delivery_status",
#             "order_address",
#         ]

#     def create(self, validated_data):
#         ord_id = []

#         address_data = validated_data.pop('order_address')
#         print(address_data)
#         for j in range(len(address_data)):
#             address = Address.objects.create(
#                 address_1=address_data[j]['address_1'],
#                 address_2=address_data[j]['address_2'],
#                 city=address_data[j]['city'],
#                 state = address_data[j]['state'],
#                 postcode=address_data[j]['postcode'],
#                 country=address_data[j]['country']
#             )
#             ord_id.append(address.id)

#         item = validated_data.pop('items')

#         ids = []
        
#         for i in range(len(item)):
#             prod = item[i]['prod']['name']
#             count = item[i]['quantity']
        
#             product = OrderItem.objects.create(
#                 prod=Product.objects.get(name=prod), 
#                 quantity=count
#             )

#             ids.append(product.id)

#         Order.order_address = Address.objects.filter(id__in=(ord_id))
#         Order.items = OrderItem.objects.filter(id__in=(ids))
#         Order.objects.create(**validated_data)
#         return Order 

# class OrderSerializer(serializers.ModelSerializer):
    
#     class Meta:
#         model = Order
#         fields =[
#             "order_number",
#             "product",
#             "delivery_date",
#             "price",
#             "payment_method",
#             "delivery_status",
#         ]

# class AddressSerializer(serializers.ModelSerializer):
#     address = OrderSerializer(many=True)

#     class Meta:
#         model = Address
#         fields = [
#              "address_1","address_2","city","state","postcode","country", "address"
#         ]

#     def create(self, validated_data):
#         temp_bok_details= validated_data.pop('address')
#         new_order = Address.objects.create(**validated_data)
#         prod = temp_bok_details[0]['product']
#         prod_ids = []
#         for j in range(len(prod)):
#             prod_ids.append(prod[j].id)
#         Order.product = Product.objects.filter(id__in=(prod_ids))
#         for i in temp_bok_details:
#             Order.objects.create(order_address=new_order, **i)
#         return new_order

class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = [
            "phone","date_of_birth"
        ]

class UserSerializer(serializers.ModelSerializer):
    customer = CustomerSerializer()

    class Meta:
        model = User
        fields = [
             "username", "password", "email", "customer"
        ]

    def create(self, validated_data):
        customer_data= validated_data.pop('customer')
        usercreate = User.objects.create(**validated_data)
        usercreate.set_password(usercreate.password)
        usercreate.save()
        Customer.objects.create(custom_user=usercreate, **customer_data)
        return usercreate

    def update(self, instance, validated_data):

        return super(UserSerializer, self).update(instance, validated_data)

class CategorySerliazer(serializers.ModelSerializer):

    class Meta:
        model = Category
        fields = ["id", "name","description","images", "products"]

    def update(self, instance, validated_data):
        if 'products' in validated_data:
            prods = validated_data.pop('products')

            for p in prods:
                myprod = Product.objects.get(id=p.id)
                instance.products.add(myprod)
        return super(CategorySerliazer, self).update(instance, validated_data)