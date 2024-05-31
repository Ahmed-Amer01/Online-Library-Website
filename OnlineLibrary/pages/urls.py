from django.urls import path
from . import views

app_name = 'pages'

urlpatterns = [
    path('', views.Home, name='Home'),
    path('Sign_up', views.Sign_up, name='Sign_up'),
    path('Login', views.Login, name='Login'),
    path('Log_out', views.Log_out, name='Log_out'),
]