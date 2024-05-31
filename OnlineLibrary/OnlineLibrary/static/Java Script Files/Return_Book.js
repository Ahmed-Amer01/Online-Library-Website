function returnBook(bookId){
    var confirmation = confirm("Are you sure that you want to return this book?");
    if (confirmation){
        var xhr = new XMLHttpRequest();
        xhr.open("POST", '/User_Pages/User_return_book/' + bookId + '/', true);
        xhr.setRequestHeader("X-CSRFToken", csrfToken);
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    // Book returned successfully
                    alert("Book returned successfully");
                    location.reload();
                } 
                else {
                    alert("Failed to return the book.");
                }
            }
        };
        xhr.send();
    }
}