from django.urls import path
from . import views

app_name = 'pagesForUser'

urlpatterns = [
    path('Home_user', views.Home_user, name='Home_user'),
    path('User_view_available_books', views.User_view_available_books, name='User_view_available_books'),
    path('User_view_all_books', views.User_view_all_books, name='User_view_all_books'),
    path('User_view_borrowed_books', views.User_view_borrowed_books, name='User_view_borrowed_books'),
    path('User_display_book/<str:bookId>/', views.User_display_book, name='User_display_book'),
    path('User_borrow_book/<str:bookId>/', views.User_borrow_book, name='User_borrow_book'),
    path('User_return_book/<str:bookId>/', views.User_return_book, name='User_return_book'),
    path('Search_page', views.Search_page, name='Search_page'),
]