from django.urls import path
from . import views

app_name = 'pagesForAdmin'

urlpatterns = [
    path('Home_admin', views.Home_admin, name='Home_admin'),
    path('Add_book', views.Add_book, name='Add_book'),
    path('Edit_book/<str:bookId>/', views.Edit_book, name='Edit_book'),
    path('Admin_view_available_books', views.Admin_view_available_books, name='Admin_view_available_books'),
    path('Admin_view_all_books', views.Admin_view_all_books, name='Admin_view_all_books'),
    path('Admin_display_book/<str:bookId>/', views.Admin_display_book, name='Admin_display_book'),
    path('Admin_delete_book/<str:bookId>/', views.Admin_delete_book, name='Admin_delete_book'),
]