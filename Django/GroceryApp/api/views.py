from django.shortcuts import render
from rest_framework.views import APIView
from api.models import Customer, Address, Product, Images, Category, OrderItem, Order, Offers
from django.contrib.auth.models import User
from api.serializers import CompleteOrderSerializer, ImageSerializer, AdressSerializer, CustomerSerializer, UserSerializer, ProductWithImageSerializer, OfferSerializer, CategorySerliazer, OrderItemSerializer
from django.http import HttpResponse, JsonResponse
from rest_framework.parsers import JSONParser
from rest_framework import status, filters
from rest_framework.response import Response
from rest_framework import viewsets
from rest_framework import mixins
from rest_framework import generics
from rest_framework import permissions
from rest_framework.authtoken.serializers import AuthTokenSerializer
from knox.views import LoginView as KnoxLoginView
from django.contrib.auth import login

# Create your views here.

# class AddressApiView(APIView):
#     def get(self, request):
#         orders = Address.objects.all()
#         serializer = AddressSerializer(orders, many=True)
#         return Response(serializer.data)

#     def post(self, request):
#         data = JSONParser().parse(request)
#         serializer = AddressSerializer(data=data)

#         if serializer.is_valid():
#             serializer.save()
#             return JsonResponse(serializer.data, status=status.HTTP_201_CREATED)
#         return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CustomerApiView(mixins.ListModelMixin,mixins.CreateModelMixin,mixins.RetrieveModelMixin, mixins.UpdateModelMixin, generics.GenericAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    lookup_field = "id"

    def get(self, request, id=None):
        if id:
            return self.retrieve(request)
        else:
            return self.list(request)

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)

    def put(self, request, id=None):
        return self.update(request, id)


class ProductsApiView(mixins.ListModelMixin,mixins.CreateModelMixin,mixins.RetrieveModelMixin, mixins.UpdateModelMixin, mixins.DestroyModelMixin, generics.GenericAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductWithImageSerializer
    lookup_field = "id"

    def get(self, request, id=None):
        if id:
            return self.retrieve(request)
        else:
            return self.list(request)

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)
    
    def put(self, request,*args, **kwargs):
        return self.update(request, *args, **kwargs)

    def delete(self, request, id):
        return self.destroy(request, id)


class MediaApiView(mixins.ListModelMixin,mixins.CreateModelMixin,mixins.RetrieveModelMixin, mixins.UpdateModelMixin, mixins.DestroyModelMixin, generics.GenericAPIView):
    queryset = Images.objects.all()
    serializer_class = ImageSerializer
    lookup_field = "id"

    def get(self, request, id=None):
        if id:
            return self.retrieve(request)
        else:
            return self.list(request)

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)
    
    def put(self, request,*args, **kwargs):
        return self.update(request, *args, **kwargs)

    def delete(self, request, id):
        return self.destroy(request, id)
    

class CategoryApiView(mixins.ListModelMixin,mixins.CreateModelMixin, generics.GenericAPIView, mixins.UpdateModelMixin, mixins.RetrieveModelMixin):
    queryset = Category.objects.all()
    serializer_class = CategorySerliazer
    lookup_field = "id"
    
    def get(self, request, id=None):
        if id:
            return self.retrieve(request)
        else:
            return self.list(request)

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)

    def put(self, request, id=None):
        return self.update(request, id)

class CartApiView(APIView):
    def get(self, request):
        carts = OrderItem.objects.all()
        serializer = OrderItemSerializer(carts, many=True)
        return Response(serializer.data)


# class OrderApiView(APIView):
#     def get(self, request):
#         orders = Order.objects.all()
#         serializer = CompleteOrderSerializer(orders, many=True)
#         return Response(serializer.data)

# class OrderApiView(APIView):
#     """
#     A simple ViewSet for viewing and posting orders.
#     """
#     def get(self, request):
#         order = Order.objects.all()
#         serializer = CompleteOrderSerializer(order, many=True)
#         return Response(serializer.data)
    
#     def post(self, request):
#         data = JSONParser().parse(request)
#         serializer = CompleteOrderSerializer(data=data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(["ORDER PLACED - check email for details", data], status=status.HTTP_201_CREATED)
#         return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class OrderApiView(mixins.ListModelMixin,mixins.CreateModelMixin,mixins.RetrieveModelMixin, mixins.UpdateModelMixin, mixins.DestroyModelMixin, generics.GenericAPIView):
    queryset = Order.objects.all()
    serializer_class = CompleteOrderSerializer
    lookup_field = "order_number"

    def get(self, request, order_number=None):
        if order_number:
            return self.retrieve(request)
        else:
            return self.list(request)

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)
    
    def put(self, request,*args, **kwargs):
        return self.update(request, *args, **kwargs)

    def delete(self, request, order_number):
        return self.destroy(request, order_number)

class AddressAPIView(APIView):
    """
    A simple view for viewing address.
    """
    def get(self, request):
        address = Address.objects.all()
        serializer = AdressSerializer(address, many=True)
        return Response(serializer.data)

class OfferApiView(mixins.ListModelMixin,mixins.CreateModelMixin, generics.GenericAPIView):
    queryset = Offers.objects.all()
    serializer_class = OfferSerializer

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)

class PersonalOrderApiView(APIView):
    """
    A simple view for viewing address.
    """
    def get(self, request, order_user):
        address = Order.objects.filter(order_user=order_user)
        serializer = CompleteOrderSerializer(address, many=True)
        return Response(serializer.data)

class ProductSearchAPI(generics.ListCreateAPIView):
	filter_backends = (filters.SearchFilter,)
	search_fields = ['name',]
	queryset = Product.objects.all()
	serializer_class = ProductWithImageSerializer

class LoginAPI(KnoxLoginView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        serializer = AuthTokenSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        login(request, user)
        temp_list=super(LoginAPI, self).post(request, format=None)
        temp_list.data['uid']=user.id
        return Response({"data":temp_list.data})