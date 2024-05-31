function borrowBook(bookId) {
    var confirmation = confirm("Are you sure that you want to borrow this book?");
    if (confirmation){
        var xhr = new XMLHttpRequest();
        xhr.open("POST", '/User_Pages/User_borrow_book/' + bookId + '/', true);
        xhr.setRequestHeader("X-CSRFToken", csrfToken);
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    // Book borrowed successfully
                    alert("Book borrowed successfully");
                    location.reload();
                } 
                else {
                    alert("Failed to borrow the book.");
                }
            }
        };
        xhr.send();
    }
}