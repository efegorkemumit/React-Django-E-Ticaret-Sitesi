from email.mime import image
from itertools import product
from unicodedata import category, name
from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Product(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    name = models.CharField(max_length=200, null=True, blank=True)
    image= models.ImageField(null=True, blank=True, default='/placeholder.png')
    brand = models.CharField(max_length=200, null=True, blank=True)
    category=models.CharField(max_length=200, null=True, blank=True)
    description =models.TextField(null=True, blank=True)
    rating = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
    numReviews =models.IntegerField(null=True, blank=True, default=0)
    price=models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
    countInStock= models.IntegerField(null=True, blank=True, default=0)
    createdAt= models.DateField(auto_now_add=True)
    _id =models.AutoField(primary_key=True, editable=False)

    def __str__(self) :
        return self.name

class Review(models.Model):
    product=models.ForeignKey(Product, on_delete=models.SET_NULL, null=True)
    user=models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    name=  models.CharField(max_length=200, null=True, blank=True)
    rating=models.IntegerField(null=True, blank=True, default=0)
    comment=models.TextField(null=True, blank=True)
    createdAt=models.DateField(auto_now_add=True)
    id=models.AutoField(primary_key=True, editable=False)

    def __str__(self) :
        return self.rating

class Order(models.Model):
    user =models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    paymentMethod= models.CharField(max_length=200, null=True, blank=True)
    taxPrice =models.CharField(max_length=128)
    shippingPrice =models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
    TotalPrice=models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
    isPaid=models.BooleanField(default=False)
    paidAt=models.DateField(auto_now_add=True)
    isDelivered=models.BooleanField(default=False)
    deliveredAt=models.DateField(auto_now_add=False, null=True, blank=True)
    createAt=models.DateField(auto_now_add=True)
    _id=models.AutoField(primary_key=True, editable=False)

    def __str__(self) :
        return str(self.createAt)

class OrderItem(models.Model):
    product=models.ForeignKey(Product, on_delete=models.SET_NULL, null=True)
    order=models.ForeignKey(Order, on_delete=models.SET_NULL, null=True)
    name=models.CharField(max_length=200, null=True, blank=True)
    rating=models.IntegerField(null=True, blank=True, default=0)
    qty=models.IntegerField(null=True, blank=True, default=0)
    price=models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
    image=models.ImageField(null=True, blank=True)
    _id=models.AutoField(primary_key=True, editable=False)
    
    def __str__(self) :
        return self.name

class ShippingAddress(models.Model):
      order = models.OneToOneField(Order, on_delete=models.CASCADE, null=True, blank=True)
      address= models.CharField(max_length=200, null=True, blank=True)
      city=models.CharField(max_length=200, null=True, blank=True)
      postalCode=models.CharField(max_length=200, null=True, blank=True)
      country=models.CharField(max_length=200, null=True, blank=True)
      shippingPrice=models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
      _id = models.AutoField(primary_key=True, editable=False)

      def __str__(self) :
        return self.address
