from django.shortcuts import render
from django.shortcuts import redirect
from django.http import HttpResponse, JsonResponse
from pages.models import Account_admin, Account_user, Book
from django.core.files.storage import default_storage
from django.shortcuts import get_object_or_404

# Create your views here.

# Done
def Home_user(request):
    if not request.session.get('is_admin', False) and request.session.get('is_user', False):
        return render(request, 'pagesForUser/Home_user.html')
    elif request.session.get('is_admin', False) and not request.session.get('is_user', False):
        return redirect('pagesForAdmin:Home_admin')
    else:
        return redirect('pages:Home')
    
def User_view_available_books(request):
    if not request.session.get('is_admin', False) and request.session.get('is_user', False):
        books = Book.objects.all().filter(available=True)
        return render(request, 'pagesForUser/User_view_available_books.html', {'books': books})
    elif request.session.get('is_admin', False) and not request.session.get('is_user', False):
        return redirect('pagesForAdmin:Home_admin')
    else:
        return redirect('pages:Home')
    
def User_display_book(request, bookId):
    if not request.session.get('is_admin', False) and request.session.get('is_user', False):
        account = Account_user.objects.get(username=request.session.get('username'))
        book = get_object_or_404(Book, bookId=bookId)
        return render(request, 'pagesForUser/User_display_book.html', {'book': book, 'account': account})
    elif request.session.get('is_admin', False) and not request.session.get('is_user', False):
        return redirect('pagesForAdmin:Home_admin')
    else:
        return redirect('pages:Home')
    
def User_view_all_books(request):
    if not request.session.get('is_admin', False) and request.session.get('is_user', False):
        account = Account_user.objects.get(username=request.session.get('username'))
        books = Book.objects.all()
        return render(request, 'pagesForUser/User_view_all_books.html', {'books': books, 'account': account})
    elif request.session.get('is_admin', False) and not request.session.get('is_user', False):
        return redirect('pagesForAdmin:Home_admin')
    else:
        return redirect('pages:Home')
    
def User_view_borrowed_books(request):
    if not request.session.get('is_admin', False) and request.session.get('is_user', False):
        account = Account_user.objects.get(username=request.session.get('username'))
        books = Book.objects.all().filter(borrower=account, available=False)
        return render(request, 'pagesForUser/User_view_borrowed_books.html', {'books': books})
    elif request.session.get('is_admin', False) and not request.session.get('is_user', False):
        return redirect('pagesForAdmin:Home_admin')
    else:
        return redirect('pages:Home')

# not page it is function
def User_borrow_book(request, bookId):
    if not request.session.get('is_admin', False) and request.session.get('is_user', False):
        if request.method == 'POST':
            try:
                account = Account_user.objects.get(username=request.session.get('username'))
                book = Book.objects.get(bookId=bookId)
                book.available = False
                book.borrower = account
                book.save()
                return HttpResponse("Book borrowed successfully.")
            except Book.DoesNotExist:
                return JsonResponse({'error': 'Book not found'}, status=404)
        return redirect('Home_user')
    elif request.session.get('is_admin', False) and not request.session.get('is_user', False):
        return redirect('pagesForAdmin:Home_admin')
    else:
        return redirect('pages:Home')
    
# not page it is function
def User_return_book(request, bookId):
    if not request.session.get('is_admin', False) and request.session.get('is_user', False):
        if request.method == 'POST':
            try:
                book = Book.objects.get(bookId=bookId)
                book.available = True
                book.borrower = None
                book.save()
                return HttpResponse("Book returned successfully.")
            except Book.DoesNotExist:
                return JsonResponse({'error': 'Book not found'}, status=404)
        return redirect('Home_user')
    elif request.session.get('is_admin', False) and not request.session.get('is_user', False):
        return redirect('pagesForAdmin:Home_admin')
    else:
        return redirect('pages:Home')
    
def Search_page(request):
    if not request.session.get('is_admin', False) and request.session.get('is_user', False):
        if request.method == 'POST':
            account = Account_user.objects.get(username=request.session.get('username'))
            searched = request.POST['searched']
            choice = request.POST.get('Search_by', '')
            if choice == 'title':
                books = Book.objects.filter(title__contains=searched)
            elif choice == 'author':
                books = Book.objects.filter(author__contains=searched)
            elif choice == 'category':
                books = Book.objects.filter(category__contains=searched)
            else:
                books = Book.objects.filter(author__contains=searched)
            return render(request, 'pagesForUser/Search_page.html', {'searched': searched, 'choice': choice, 'books': books, 'account': account})
        else:
            return render(request, 'pagesForUser/Search_page.html', {})
    elif request.session.get('is_admin', False) and not request.session.get('is_user', False):
        return redirect('pagesForAdmin:Home_admin')
    else:
        return redirect('pages:Home')