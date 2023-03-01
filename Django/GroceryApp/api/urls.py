from django.urls import path, include
from api.views import CustomerApiView, ProductsApiView, MediaApiView, PersonalOrderApiView, CategoryApiView, OrderApiView, AddressAPIView, LoginAPI, ProductSearchAPI, OfferApiView
from knox import views as knox_views

urlpatterns = [
    path('order',OrderApiView.as_view(), name="orders"),
    path('order/<int:order_number>',OrderApiView.as_view()),
    path('customer', CustomerApiView.as_view()),
    path('customer/<int:id>', CustomerApiView.as_view()),
    path('product/<int:id>',ProductsApiView.as_view()),
    path('product',ProductsApiView.as_view()),
    path('media',MediaApiView.as_view()),
    path('media/<int:id>',MediaApiView.as_view()),
    path('category', CategoryApiView.as_view()),
    path('category/<int:id>', CategoryApiView.as_view()),
    path('address', AddressAPIView.as_view()),
    path('offer', OfferApiView.as_view()),
    path('search', ProductSearchAPI.as_view()),
    path('my-order/<int:order_user>', PersonalOrderApiView.as_view()),
    path('login/', LoginAPI.as_view(), name='login'),
    path('logout/', knox_views.LogoutView.as_view(), name='logout'),
]
