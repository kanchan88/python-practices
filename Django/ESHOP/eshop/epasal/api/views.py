from django.shortcuts import render
from rest_framework.views import APIView
from django.http import HttpResponse, JsonResponse
from rest_framework.parsers import JSONParser
from rest_framework import status, mixins, generics
from django.contrib.auth.models import User
from api.serializers import ProfileSerializer, ShopSerializer, CategorySerializer,\
    ItemSerializer, OrderSerializer, OrderItemSerializer, AddressSerializer
from api.models import UserProfile, Shop, Category, Item, Order, Address, OrderItem
from rest_framework.response import Response
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.permissions import IsAuthenticated, AllowAny, IsAuthenticatedOrReadOnly
from rest_framework.authentication import TokenAuthentication
from api.custom_permissions import IsOwnerOrReadOnly, IsShopOwner
from rest_framework import generics, filters
from rest_framework import mixins

from datetime import datetime

# Create your views here.
class RegisterApiView(APIView):

    permission_classes = [AllowAny,]

    def post(self, request):
        data = JSONParser().parse(request)
        serializer = ProfileSerializer(data=data)

        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=status.HTTP_201_CREATED)
        return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LoginWithToken(ObtainAuthToken):    

    permission_classes = [AllowAny,]

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data,
                                       context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, _ = Token.objects.get_or_create(user=user)
        # today = datetime.now().date
        return Response({
            'token': token.key,
            'user_id': user.pk,
            'user': user.username
        })


class ShopApiView(generics.GenericAPIView, mixins.ListModelMixin, mixins.CreateModelMixin, mixins.UpdateModelMixin,  mixins.RetrieveModelMixin, mixins.DestroyModelMixin):
    
    serializer_class = ShopSerializer
    queryset = Shop.objects.all()
    lookup_field = "id"
    
    permission_classes = [ IsOwnerOrReadOnly ]

    def get(self, request, id=None):
        if id:
            return self.retrieve(request)
        else:
            return Response({"detail": "You do not have permission to perform this action."})
 

    def post(self,request):
        if str(request.user.id) == str(request.data.get('user_id')):
            return self.create(request)
        return Response({"detail": "You do not have permission to perform this action."})

    def delete(self, request, id):
        self.destroy(request, id)
        return Response({"detail": "Deleted Successfully"})

    def patch(self, request, id):
        if str(request.user.id) == str(request.data.get('user_id')):
            service = Shop.objects.get(id=id)
            serializer = ShopSerializer(service, data=request.data,  partial=True)
            if serializer.is_valid(raise_exception=True):
                serializer.save()
                return Response(serializer.data)
        else:
            return Response({"detail": "You do not have permission to perform this action."})

class CategoryAPIView(generics.GenericAPIView, mixins.ListModelMixin, mixins.CreateModelMixin, mixins.UpdateModelMixin,  mixins.RetrieveModelMixin, mixins.DestroyModelMixin):
    
    serializer_class = CategorySerializer
    queryset = Category.objects.all()
    lookup_field = "id"
    
    permission_classes = [ IsShopOwner ]

    def get(self, request, id=None):
        if id:
            return self.retrieve(request)
        else:
            return Response({"detail": "You do not have permission to perform this action."})
 
    def post(self,request):
        shop = Shop.objects.get(user_id=request.user.id)
        # print("Shop:"+str(shop.id)+"Request Shop:"+str(request.data['shop_id']))
        if((shop.id == request.data['shop_id']) and (request.user.id == request.data['user_id'])):
            serializer = CategorySerializer(data=request.data)
            if serializer.is_valid(raise_exception=True):
                serializer.save()
                return JsonResponse(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return JsonResponse({'detail':'You do not have permission to perform this action'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        return self.create(request)

    def delete(self, request, id):
        self.destroy(request, id)
        return Response({"detail": "Deleted Successfully"})

    def patch(self, request, id):
        service = Category.objects.get(id=id)
        if((service.shop_id.id == request.data['shop_id']) and (request.user.id == request.data['user_id'])):
            serializer = CategorySerializer(service, data=request.data,  partial=True)
            if serializer.is_valid(raise_exception=True):
                serializer.save()
                return JsonResponse(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return JsonResponse({'detail':'You do not have permission to perform this action'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class ItemAPIView(generics.GenericAPIView, mixins.ListModelMixin, mixins.CreateModelMixin, mixins.UpdateModelMixin,  mixins.RetrieveModelMixin, mixins.DestroyModelMixin):
    
    serializer_class = ItemSerializer
    queryset = Item.objects.all()
    lookup_field = "id"
    
    permission_classes = [ IsOwnerOrReadOnly ]

    def get(self, request, id=None):
        if id:
            return self.retrieve(request)
        else:
            return Response({"detail": "You do not have permission to perform this action."})
 
    def post(self,request):
        shop = Shop.objects.get(user_id=request.user.id)
        # print("Shop:"+str(shop.id)+"Request Shop:"+str(request.data['shop_id']))
        if((shop.id == request.data['shop_id']) and (request.user.id == request.data['user_id'])):
            serializer = ItemSerializer(data=request.data)
            if serializer.is_valid(raise_exception=True):
                serializer.save()
                return JsonResponse(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return JsonResponse({'detail':'You do not have permission to perform this action'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        return self.create(request)

    def delete(self, request, id):
        self.destroy(request, id)
        return Response({"detail": "Deleted Successfully"})

    def patch(self, request, id):
        service = Item.objects.get(id=id)
        if((service.shop_id.id == request.data['shop_id']) and (request.user.id == request.data['user_id'])):
            serializer = ItemSerializer(service, data=request.data,  partial=True)
            if serializer.is_valid(raise_exception=True):
                serializer.save()
                return JsonResponse(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return JsonResponse({'detail':'You do not have permission to perform this action'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class OrderItemAPIView(generics.GenericAPIView, mixins.ListModelMixin, mixins.CreateModelMixin, mixins.UpdateModelMixin,  mixins.RetrieveModelMixin, mixins.DestroyModelMixin):
    serializer_class = AddressSerializer
    queryset = Address.objects.all()
    lookup_field = "id"
    
    permission_classes = [ IsAuthenticated ]

    def get(self, request, id=None):
        if id:
            return self.retrieve(request)
        else:
            return Response({"detail": "You do not have permission to perform this action."})
 

    def post(self,request):
        return self.create(request)

    def delete(self, request, id):
        self.destroy(request, id)
        return Response({"detail": "Deleted Successfully"})

    def patch(self, request, id):
        address = Address.objects.get(id=id)
        serializer = ShopSerializer(address, data=request.data,  partial=True)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return JsonResponse(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response({"detail": "You do not have permission to perform this action."})
class OrderAPIView(generics.GenericAPIView, mixins.ListModelMixin, mixins.CreateModelMixin, mixins.UpdateModelMixin,  mixins.RetrieveModelMixin, mixins.DestroyModelMixin):
    
    serializer_class = OrderSerializer
    queryset = Order.objects.all()
    lookup_field = "id"
    
    permission_classes = [ IsShopOwner ]

    def get(self, request, id=None):
        if id:
            return self.retrieve(request)
        else:
            return Response({"detail": "You do not have permission to perform this action."})
 
    def post(self,request):
        return self.create(request)

    def delete(self, request, id):
        self.destroy(request, id)
        return Response({"detail": "Deleted Successfully"})

    def patch(self, request, id):
        service = Order.objects.get(id=id)
        if(request.user.id == request.data['user_id']):
            serializer = OrderSerializer(service, data=request.data,  partial=True)
            if serializer.is_valid(raise_exception=True):
                serializer.save()
                return JsonResponse(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return JsonResponse({'detail':'You do not have permission to perform this action'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class AddressAPIView(generics.GenericAPIView, mixins.ListModelMixin, mixins.CreateModelMixin, mixins.UpdateModelMixin,  mixins.RetrieveModelMixin, mixins.DestroyModelMixin):
    serializer_class = AddressSerializer
    queryset = Address.objects.all()
    lookup_field = "id"
    
    permission_classes = [ IsAuthenticated ]

    def get(self, request, id=None):
        if id:
            return self.retrieve(request)
        else:
            return Response({"detail": "You do not have permission to perform this action."})

    def post(self,request):
        return self.create(request)

    def delete(self, request, id):
        self.destroy(request, id)
        return Response({"detail": "Deleted Successfully"})

    def patch(self, request, id):
        address = Address.objects.get(id=id)
        serializer = AddressSerializer(address, data=request.data,  partial=True)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return JsonResponse(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response({"detail": "You do not have permission to perform this action."})