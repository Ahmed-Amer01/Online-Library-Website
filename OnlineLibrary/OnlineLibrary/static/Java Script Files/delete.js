function deleteBook(bookId) {
    var confirmation = confirm("Are you sure that you want to delete this book?");
    if (confirmation){
        var xhr = new XMLHttpRequest();
        xhr.open("POST", '/Admin_Pages/Admin_delete_book/' + bookId + '/', true);
        xhr.setRequestHeader("X-CSRFToken", csrfToken);
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    alert("Book deleted successfully");
                    // Book deleted successfully, remove it from the HTML before doing reload
                    let bookRectangle = document.getElementById(bookId);
                    if (bookRectangle) {
                        bookRectangle.remove();
                    }
                    if(window.location.href.includes("/Admin_Pages/Admin_display_book/" + bookId + '/')){
                        window.location.href ="/Admin_Pages/Admin_view_available_books"
                    }
                    else{
                        location.reload();
                    }
                } 
                else {
                    alert("Failed to delete the book.");
                }
            }
        };
        xhr.send();
    }
}