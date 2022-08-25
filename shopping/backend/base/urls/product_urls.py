from django.contrib import admin
from django.urls import path, include
from base.views import product_views as views



urlpatterns = [

   
    path('test/', views.getRoutes, name="routes"),
      
    path('upload/', views.uploadImage, name="product-image"),

    path('create/', views.createProduct, name="product-create"),
    path('', views.getProducts, name="products"),
    path('<str:pk>', views.getProduct, name="product"),
    path('delete/<str:pk>/', views.deleteProduct, name="product-delete"),
    path('update/<str:pk>/', views.updateProduct, name="product-update"),




]
