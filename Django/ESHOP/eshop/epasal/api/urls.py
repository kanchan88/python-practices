from django.urls import path
from .views import RegisterApiView, LoginWithToken, ShopApiView, CategoryAPIView, ItemAPIView,\
    OrderAPIView, AddressAPIView, OrderItemAPIView
# url starts from here

urlpatterns = [
    path('user/register',RegisterApiView.as_view(), name="register"),
    path('user/login',LoginWithToken.as_view(), name="login"),
    path('user/shop/<int:id>', ShopApiView.as_view(), name="shopget"),
    path('user/shop', ShopApiView.as_view(), name="shop"),
    path('user/category/<int:id>',CategoryAPIView.as_view(), name="categoryget"),
    path('user/category',CategoryAPIView.as_view(), name="category"),
    path('user/product/<int:id>',ItemAPIView.as_view(), name="productget"),
    path('user/product',ItemAPIView.as_view(), name="product"),
    path('user/order/<int:id>',OrderAPIView.as_view(), name="orderget"),
    path('user/order',OrderAPIView.as_view(), name="order"),
    path('user/address/<int:id>',AddressAPIView.as_view(), name="addressget"),
    path('user/address',AddressAPIView.as_view(), name="address"),
    path('user/order-item/<int:id>',OrderAPIView.as_view(), name="order-item-get"),
    path('user/order-item',OrderAPIView.as_view(), name="order-item")
]