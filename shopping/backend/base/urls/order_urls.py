from django.contrib import admin
from django.urls import path
from base.views import order_views as views



urlpatterns = [

    path('', views.getOrders, name='orders'),
    path('add/', views.addOrderItems,name='orders-add'),
    path('myorders/', views.getMyOrders,name='my-orders'),
    path('<str:pk>/deliver/', views.updateOrderToDelivered, name="order-deliverd"),

    path('<str:pk>/', views.getOrderById,name='order'),


   


]
