from django.contrib import admin
from .models import Account_admin, Account_user, Book

# Register your models here.

admin.site.register(Account_admin)
admin.site.register(Account_user)
admin.site.register(Book)