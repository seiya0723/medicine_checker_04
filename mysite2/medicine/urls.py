from django.urls import path
from . import views

app_name    = "medicine"
urlpatterns = [
    path('', views.index, name="index"),
    path('search/', views.search, name="search"),
    path('single/<uuid:pk>/', views.single, name="single"),

]
