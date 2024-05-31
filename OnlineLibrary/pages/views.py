from django.shortcuts import render
from django.shortcuts import redirect
from django.http import HttpResponse, JsonResponse
from .models import Account_admin, Account_user, Book
from django.core.files.storage import default_storage
from django.shortcuts import get_object_or_404
# from django.contrib.auth import authenticate, login
# from django.views.decorators.csrf import csrf_exempt

# Create your views here.

# Done
def Home(request):
    if request.session.get('is_admin', False) and not request.session.get('is_user', False):
        # If the user is logged in and is an admin, redirect them to the home page for admins
        return redirect('pagesForAdmin:Home_admin')
    elif not request.session.get('is_admin', False) and request.session.get('is_user', False):
        # If the user is logged in and is not an admin, redirect them to the home page for users
        return redirect('pagesForUser:Home_user')
    # مسار الملف
    # اخر واحدة معناها الحاجات اللي خدخلها الصفحة مفتاح و قيمة
    # return render(request, 'pages\Home.html', {'name':'ahmed'})
    return render(request, 'pages\Home.html')

# Done
def Sign_up(request):
    if request.session.get('is_admin', False) and not request.session.get('is_user', False):
        return redirect('pagesForAdmin:Home_admin')
    elif not request.session.get('is_admin', False) and request.session.get('is_user', False):
        return redirect('pagesForUser:Home_user')
    username = request.POST.get('username')
    password = request.POST.get('password')
    userId = request.POST.get('id')
    email = request.POST.get('email')
    isAdmin = request.POST.get('typeOfAction')
    # get the type of Action
    boolValue = False
    if isAdmin == "user":
        boolValue = False
    elif isAdmin == "admin":
        boolValue = True
    # Check if the username already exists
    if Account_admin.objects.filter(username=username).exists() or Account_user.objects.filter(username=username).exists():
        return JsonResponse({'message': 'The Username is already taken try another one'}, status=226)
    # push data to database
    if boolValue == True:
        data = Account_admin(username=username, password=password, userId=userId, email=email)
    elif boolValue == False:
        data = Account_user(username=username, password=password, userId=userId, email=email)
    # Save data
    if request.method == "POST":
        data.save()
        return render(request, 'pages\Sign_up.html')
    return render(request, 'pages\Sign_up.html')

# Done
def Login(request):
    if request.session.get('is_admin', False) and not request.session.get('is_user', False):
        return redirect('pagesForAdmin:Home_admin')
    elif not request.session.get('is_admin', False) and request.session.get('is_user', False):
        return redirect('pagesForUser:Home_user')
    
    if request.method == "POST":
        username = request.POST.get('username')
        password = request.POST.get('password')
        if not Account_admin.objects.filter(username=username, password=password).exists() and not Account_user.objects.filter(username=username, password=password).exists():
            return JsonResponse({'message': 'Invalid username'}, status=226)
        elif Account_admin.objects.filter(username=username, password=password).exists():
            request.session['is_admin'] = True
            request.session['is_user'] = False
            request.session['username'] = username
            # Account = Account_admin.objects.filter(username=username, password=password)
            # request.session['Account'] = Account
            return redirect('pagesForAdmin:Home_admin')
        elif Account_user.objects.filter(username=username, password=password).exists():
            request.session['is_admin'] = False
            request.session['is_user'] = True
            request.session['username'] = username
            # Account = Account_user.objects.filter(username=username, password=password)
            # request.session['Account'] = Account
            return redirect('pagesForUser:Home_user')    
    return render(request, 'pages\Login.html')

# Done
def Log_out(request):
    if request.session.get('is_admin', False) and not request.session.get('is_user', False):
        # Clear all session data
        request.session.flush()
        # Redirect to a specific URL after logging out
        return redirect('pages:Home')
    elif not request.session.get('is_admin', False) and request.session.get('is_user', False):
        request.session.flush()
        return redirect('pages:Home')
    return redirect('pages:Home')