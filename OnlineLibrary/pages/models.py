from django.db import models

# Create your models here.

class Account_admin(models.Model):
    username = models.CharField(max_length=15, primary_key=True)
    password = models.CharField(max_length=20)
    userId = models.IntegerField(default=1234)
    email = models.CharField(max_length=100)
    def __str__(self):
        return self.username
    class Meta:
        ordering = ['username']

class Account_user(models.Model):
    username = models.CharField(max_length=15, primary_key=True)
    password = models.CharField(max_length=20)
    userId = models.IntegerField(default=1234)
    email = models.CharField(max_length=100)
    def __str__(self):
        return self.username
    class Meta:
        ordering = ['username']

class Book(models.Model):
    title = models.CharField(max_length=30)
    bookId = models.CharField(max_length=15, primary_key=True)
    author = models.CharField(max_length=30)
    category = models.CharField(max_length=30)
    briefDescription = models.TextField(max_length=500)
    description = models.TextField(max_length=1000)
    image = models.ImageField(upload_to='Book_Covers/%y/%m/%d')
    available = models.BooleanField(default=True)
    owner = models.ForeignKey(Account_admin, on_delete=models.CASCADE)
    borrower = models.ForeignKey(Account_user, on_delete=models.CASCADE, null=True)
    def __str__(self):
        return self.title
    class Meta:
        ordering = ['title']