from django.shortcuts import render
from django.shortcuts import redirect
from django.http import HttpResponse, JsonResponse
from pages.models import Account_admin, Account_user, Book
from django.core.files.storage import default_storage
from django.shortcuts import get_object_or_404

# Create your views here.

# Done    
def Home_admin(request):
    # print(request.session.get('username'))
    if request.session.get('is_admin', False) and not request.session.get('is_user', False):
        return render(request, 'pagesForAdmin\Home_Admin.html')
    elif not request.session.get('is_admin', False) and request.session.get('is_user', False):
        return redirect('pagesForUser:Home_user')
    else:
        return redirect('pages:Home')
    
# Done
def Add_book(request):
    if request.session.get('is_admin', False) and not request.session.get('is_user', False):
        title = request.POST.get('title')
        bookId = request.POST.get('id')
        author = request.POST.get('author')
        category = request.POST.get('category')
        briefDescription = request.POST.get('briefDescription')
        description = request.POST.get('description')
        # Use request.FILES when you upload file like image
        image = request.FILES.get('addImage')
        if Book.objects.filter(bookId=bookId).exists():
            return JsonResponse({'message': 'The ID is already taken, check it and try again'}, status=226)
        
        account = Account_admin.objects.get(username=request.session.get('username'))
        data = Book(title=title, bookId=bookId, author=author, category=category, briefDescription=briefDescription, 
                    description=description, image=image, available=True, owner=account)
        if request.method == "POST":
            data.save()
        return render(request, 'pagesForAdmin\Add_book.html')
    elif not request.session.get('is_admin', False) and request.session.get('is_user', False):
        return redirect('pagesForUser:Home_user')
    else:
        return redirect('pages:Home')

# Done
def Edit_book(request, bookId):
    if request.session.get('is_admin', False) and not request.session.get('is_user', False):
        if request.method == 'POST':
            book = Book.objects.get(bookId=bookId)
            title = request.POST.get('title')
            newBookId = request.POST.get('id')
            author = request.POST.get('author')
            category = request.POST.get('category')
            briefDescription = request.POST.get('briefDescription')
            description = request.POST.get('description')
            image = request.FILES.get('addImage')

            if bookId != newBookId:
                if Book.objects.filter(bookId=newBookId).exists():
                    return JsonResponse({'message': 'The ID is already taken, check it and try again'}, status=226)
                else :
                    account = Account_admin.objects.get(username=request.session.get('username'))
                    data = Book(title=title, bookId=newBookId, author=author, category=category, briefDescription=briefDescription, 
                                description=description, image=image, available=True, owner=account)
                    # print(bookId)
                    # print(newBookId)
                    # print(book.bookId)
                    book.delete()
                    data.save()
                    return redirect('pagesForAdmin:Edit_book', bookId=newBookId)
                    # return HttpResponse("Book edited successfully.")
            else:
                book.title = title
                book.author = author
                book.category = category
                book.briefDescription = briefDescription
                book.description = description
                book.image = image
                book.save()
                return HttpResponse("Book edited successfully.")
        else:
            book = get_object_or_404(Book, bookId=bookId)
            return render(request, 'pagesForAdmin\Edit_on_book.html', {'book': book})
    
    elif not request.session.get('is_admin', False) and request.session.get('is_user', False):
        return redirect('pagesForUser:Home_user')
    else:
        return redirect('pages:Home')
    
# Done
def Admin_view_available_books(request):
    if request.session.get('is_admin', False) and not request.session.get('is_user', False):
        account = Account_admin.objects.get(username=request.session.get('username'))
        books = Book.objects.all().filter(owner=account, available=True)
        return render(request, 'pagesForAdmin\Admin_view_available_books.html', {'books': books})
    elif not request.session.get('is_admin', False) and request.session.get('is_user', False):
        return redirect('pagesForUser:Home_user')
    else:
        return redirect('pages:Home')
      
# Done
def Admin_view_all_books(request):
    if request.session.get('is_admin', False) and not request.session.get('is_user', False):
        account = Account_admin.objects.get(username=request.session.get('username'))
        books = Book.objects.all().filter(owner=account)
        return render(request, 'pagesForAdmin\Admin_view_all_books.html', {'books': books})
    elif not request.session.get('is_admin', False) and request.session.get('is_user', False):
        return redirect('pagesForUser:Home_user')
    else:
        return redirect('pages:Home')
    
# Done
def Admin_display_book(request, bookId):
    if request.session.get('is_admin', False) and not request.session.get('is_user', False):
        book = get_object_or_404(Book, bookId=bookId)
        return render(request, 'pagesForAdmin\Admin_display_book.html', {'book': book})
    elif not request.session.get('is_admin', False) and request.session.get('is_user', False):
        return redirect('pagesForUser:Home_user')
    else:
        return redirect('pages:Home')
    
# Done
def Admin_delete_book(request, bookId):
    if request.session.get('is_admin', False) and not request.session.get('is_user', False):
        if request.method == 'POST':
            try:
                book = Book.objects.get(bookId=bookId)
                book.delete()
                return JsonResponse({'message': 'Book deleted successfully'})
            except Book.DoesNotExist:
                return JsonResponse({'error': 'Book not found'}, status=404)
        return redirect('Home_admin')
    elif not request.session.get('is_admin', False) and request.session.get('is_user', False):
        return redirect('pagesForUser:Home_user')
    else:
        return redirect('pages:Home')