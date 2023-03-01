from rest_framework import serializers
from api.models import UserProfile, Shop, Category, Item, Order, Address, OrderItem
from django.contrib.auth.models import User

# start

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["username", "password"]


class ProfileSerializer(serializers.ModelSerializer):
    
    user_main = UserSerializer(required=True)

    class Meta:
        model = UserProfile
        fields = ["phone", "user_main"]

    def create(self, validated_data):
        user_data = validated_data.pop('user_main')
        created_user = User.objects.create_user(**user_data)
        instance = UserProfile.objects.create(user_main=created_user, **validated_data)
        return instance

class ShopSerializer(serializers.ModelSerializer):

    class Meta:
        model = Shop
        fields = "__all__"

class CategorySerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Category
        fields = "__all__"

class ItemSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Item
        fields = "__all__"    

class OrderItemSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = OrderItem
        fields = "__all__" 

class AddressSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Address
        fields = "__all__" 

class OrderSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Order
        fields = "__all__" 

