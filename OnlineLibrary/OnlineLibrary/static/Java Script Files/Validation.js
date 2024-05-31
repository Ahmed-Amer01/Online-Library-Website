function validateSignupForm() {
  // prevent default
  let form = document.getElementById("signupForm");
  function handleForm(event){
    event.preventDefault();
  }
  form.addEventListener('submit', handleForm);

  let flag = true;
  let username = document.forms["signupForm"]["username"].value;
  let password = document.forms["signupForm"]["password"].value;
  let repeatPassword = document.forms["signupForm"]["repeatPassword"].value;
  let id = document.forms["signupForm"]["id"].value;
  let email = document.forms["signupForm"]["email"].value;

if(true){
  // check username
  let usernameErrorDiv = document.getElementById('usernameValidationMessage');
  let usernameMessage = document.getElementById('usernameError');
  while (usernameMessage.firstChild) 
    usernameMessage.removeChild(usernameMessage.lastChild);
  usernameErrorDiv.style.display = 'none';
  if((username == "" || !(/[a-zA-Z]/.test(username[0])) ) || 
    username.length > 15 || username.length <5 ){
    let usernameError = document.createElement('li');
    usernameError.textContent = "-the username should start with char and his length is between 5-15";
    usernameMessage.appendChild(usernameError);
    usernameErrorDiv.style.display = 'inline';
    flag = false;
  }

  // check password
  let passwordErrorDiv = document.getElementById('passwordValidationMessage');
  let passwordMessage = document.getElementById('passwordError');
  while (passwordMessage.firstChild) 
    passwordMessage.removeChild(passwordMessage.lastChild);
  passwordErrorDiv.style.display = 'none';
  let hasNumbers = /\d/.test(password);
  let hasLetters = /[a-zA-Z]/.test(password);
  if (password == "" || password.length >20 
    || password.length <5 || !hasLetters || !hasNumbers){

      let passwordError = document.createElement('li');
      passwordError.textContent = "-the password should has letter, number and his length is between 5-20";
      passwordMessage.appendChild(passwordError);
      passwordErrorDiv.style.display = 'inline';
      flag = false;
  }

  // check repeatPassword
  let repeatPasswordErrorDiv = document.getElementById('repeatPasswordValidationMessage');
  let repeatPasswordMessage = document.getElementById('repeatPasswordError');
  while (repeatPasswordMessage.firstChild) 
    repeatPasswordMessage.removeChild(repeatPasswordMessage.lastChild);
  repeatPasswordErrorDiv.style.display = 'none';
  if (password != repeatPassword) {
    let repeatPasswordError = document.createElement('li');
    repeatPasswordError.textContent = "-Passwords do not match.";
    repeatPasswordMessage.appendChild(repeatPasswordError);
    repeatPasswordErrorDiv.style.display = 'inline';
    flag = false;
  }

  // check id
  let idErrorDiv = document.getElementById('idUserValidationMessage');
  let idMessage = document.getElementById('idUserError');
  while (idMessage.firstChild) 
    idMessage.removeChild(idMessage.lastChild);
  idErrorDiv.style.display = 'none';
  if (id == "" || id.length < 4 || id.length >8) {
    let idError = document.createElement('li');
    idError.textContent = "-ID should be betwenn 4-8.";
    idMessage.appendChild(idError);
    idErrorDiv.style.display = 'inline';
    flag = false;
  }

  // check email
  let emailErrorDiv = document.getElementById('emailValidationMessage');
  let emailMessage = document.getElementById('emailError');
  while (emailMessage.firstChild) 
    emailMessage.removeChild(emailMessage.lastChild);
  emailErrorDiv.style.display = 'none';
  if (email == "" || /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$/.test(email)) {
    let emailError = document.createElement('li');
    emailError.textContent = "-invalid email, please write the email with '@' sign.";
    emailMessage.appendChild(emailError);
    emailErrorDiv.style.display = 'inline';
    flag = false;
  }
}


  let formDiv = document.getElementById("SignUpDiv");
  let success = document.getElementById("SignUpSuccessful");
  let exist = document.getElementById("Existing");
  formDiv.style.display = 'none';
  success.style.display = 'none';
  exist.style.display = 'none';
  //send AJAX query
  if(flag) {
      // AJAX to be submmited
      let formData = new FormData(document.getElementById("signupForm"));
      formData.append('username', username);
      formData.append('password', password);
      formData.append('id', id);
      formData.append('email', email);
      // get value of selection
      let typeOfAction = document.getElementById("typeOfAction").value;
      formData.append('typeOfAction', typeOfAction);

      // AJAX request to submit form data
      var xhr = new XMLHttpRequest();
      // "/peges/Sign_up"
      xhr.open("POST", "Sign_up", true);
      xhr.setRequestHeader("X-CSRFToken", "{{ csrf_token }}");
      // xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        // Request finished and response is ready
        formDiv = document.getElementById("SignUpDiv");
        formDiv.style.display = 'inline';
        success.style.display = 'inline';
        }
      else if(xhr.readyState === 4 && xhr.status === 226){
        formDiv = document.getElementById("SignUpDiv");
        formDiv.style.display = 'inline';
        exist.style.display = 'inline';
        }
      };
      xhr.send(formData);
    }
    else{
      formDiv.style.display = 'none';
      success.style.display = 'none';
      exist.style.display = 'none';
    }
}

function validateLoginForm(){
  // prevent default
  let form = document.getElementById("loginForm");
  function handleForm(event){
    event.preventDefault();
  }
  form.addEventListener('submit', handleForm);

  let flag = true;
  let username = document.forms["loginForm"]["username"].value;
  let password = document.forms["loginForm"]["password"].value;

  if(true){
    // check username
    let usernameErrorDiv = document.getElementById('usernameValidationMessage');
    let usernameMessage = document.getElementById('usernameError');
    while (usernameMessage.firstChild) 
      usernameMessage.removeChild(usernameMessage.lastChild);
    usernameErrorDiv.style.display = 'none';
    if((username == "" || !(/[a-zA-Z]/.test(username[0])) ) || 
      username.length > 15 || username.length <5 ){
      let usernameError = document.createElement('li');
      usernameError.textContent = "- invalid username, the username should start with char and his length is between 5-15";
      usernameMessage.appendChild(usernameError);
      usernameErrorDiv.style.display = 'inline';
      flag = false;
    }

    // check password
    let passwordErrorDiv = document.getElementById('passwordValidationMessage');
    let passwordMessage = document.getElementById('passwordError');
    while (passwordMessage.firstChild) 
      passwordMessage.removeChild(passwordMessage.lastChild);
    passwordErrorDiv.style.display = 'none';
    let hasNumbers = /\d/.test(password);
    let hasLetters = /[a-zA-Z]/.test(password);
    if (password == "" || password.length >20 
      || password.length <5 || !hasLetters || !hasNumbers){

        let passwordError = document.createElement('li');
        passwordError.textContent = "- invalid password, the password should has letter, number and his length is between 5-20";
        passwordMessage.appendChild(passwordError);
        passwordErrorDiv.style.display = 'inline';
        flag = false;
    }
  }

  let formDiv = document.getElementById("LoginDiv");
  let invalid = document.getElementById("invalidUsername");
  formDiv.style.display = 'none';
  invalid.style.display = 'none';
  if(flag){
    // AJAX to be submmited
    let formData = new FormData(document.getElementById("loginForm"));
    formData.append('username', username);
    formData.append('password', password);

    // AJAX request to submit form data
    var xhr = new XMLHttpRequest();
    // write views.py function
    xhr.open("POST", "Login", true);
    xhr.setRequestHeader("X-CSRFToken", "{{ csrf_token }}");
    xhr.onreadystatechange = function () {
      if(xhr.readyState === 4 && xhr.status === 200){
        form.submit();
        }
      else if(xhr.readyState === 4 && xhr.status === 226){
        formDiv.style.display = 'inline';
        invalid.style.display = 'inline';
        }
      };
    xhr.send(formData);
  }
  else{
    formDiv.style.display = 'none';
    invalid.style.display = 'none';
  }

}

function validateAddBookForm(){
  // prevent default
  let form = document.getElementById("addBookForm");
  function handleForm(event){
    event.preventDefault();
  }
  form.addEventListener('submit', handleForm);

  let flag = true;
  let title = document.forms["addBookForm"]["title"].value;
  let id = document.forms["addBookForm"]["bookID"].value;
  let author = document.forms["addBookForm"]["author"].value;
  let category = document.forms["addBookForm"]["Category"].value;
  let briefDescription = document.forms["addBookForm"]["briefDescription"].value;
  let description = document.forms["addBookForm"]["description"].value;
  let addImage = document.forms["addBookForm"]["addImage"].value;


  if(true){
    // check title
    let titleErrorDiv = document.getElementById('titleValidationMessage');
    let titleMessage = document.getElementById('titleError');
    while (titleMessage.firstChild) 
      titleMessage.removeChild(titleMessage.lastChild);
    titleErrorDiv.style.display = 'none';
    if(title == "" || title.length > 30 || title.length <3 ) {
      let titleError = document.createElement('li');
      titleError.textContent = "- please check the title of the book and try again(3-30 letters).";
      titleMessage.appendChild(titleError);
      titleErrorDiv.style.display = 'inline';
      flag = false;
    }

    // check id
    let idErrorDiv = document.getElementById('idValidationMessage');
    let idMessage = document.getElementById('idError');
    while (idMessage.firstChild) 
      idMessage.removeChild(idMessage.lastChild);
    idErrorDiv.style.display = 'none';
    if (id == "" || id.length < 3 || id.length > 15) {
      let idError = document.createElement('li');
      idError.textContent = "- ID should be between (3-15).";
      idMessage.appendChild(idError);
      idErrorDiv.style.display = 'inline';
      flag = false;
    }

    // check author
    let authorErrorDiv = document.getElementById('authorValidationMessage');
    let authorMessage = document.getElementById('authorError');
    while (authorMessage.firstChild) 
      authorMessage.removeChild(authorMessage.lastChild);
    authorErrorDiv.style.display = 'none';
    if (author == "" || author.length < 3 || author.length > 30 || /\d/.test(author) ) {
      let authorError = document.createElement('li');
      authorError.textContent = "- please input the name of the author by letters only(3-30 letters).";
      authorMessage.appendChild(authorError);
      authorErrorDiv.style.display = 'inline';
      flag = false;
    }

    // check category
    let categoryErrorDiv = document.getElementById('categoryValidationMessage');
    let categoryMessage = document.getElementById('categoryError');
    while (categoryMessage.firstChild) 
      categoryMessage.removeChild(categoryMessage.lastChild);
    categoryErrorDiv.style.display = 'none';
    if (category == "" || category.length < 3 || category.length > 30 || /\d/.test(category) ) {
      let categoryError = document.createElement('li');
      categoryError.textContent = "- please input the category of the book by letters only (3-30 letters).";
      categoryMessage.appendChild(categoryError);
      categoryErrorDiv.style.display = 'inline';
      flag = false;
    }

    // check brief description
    let briefDescriptionErrorDiv = document.getElementById('briefDescriptionValidationMessage');
    let briefDescriptionMessage = document.getElementById('briefDescriptionError');
    while (briefDescriptionMessage.firstChild) 
      briefDescriptionMessage.removeChild(briefDescriptionMessage.lastChild);
    briefDescriptionErrorDiv.style.display = 'none';
    if (briefDescription == "" || briefDescription.length < 10 || briefDescription.length > 500 ) {
      let briefDescriptionError = document.createElement('li');
      briefDescriptionError.textContent = "- please input a brief description of the book (10-500 char).";
      briefDescriptionMessage.appendChild(briefDescriptionError);
      briefDescriptionErrorDiv.style.display = 'inline';
      flag = false;
    }

    // check description
    let descriptionErrorDiv = document.getElementById('descriptionValidationMessage');
    let descriptionMessage = document.getElementById('descriptionError');
    while (descriptionMessage.firstChild) 
      descriptionMessage.removeChild(descriptionMessage.lastChild);
    descriptionErrorDiv.style.display = 'none';
    if (description == "" || description.length < 10 || description.length > 1000 ) {
      let descriptionError = document.createElement('li');
      descriptionError.textContent = "- please input a full description of the book (10-1000 char).";
      descriptionMessage.appendChild(descriptionError);
      descriptionErrorDiv.style.display = 'inline';
      flag = false;
    }

    // check addImage
    let addImageErrorDiv = document.getElementById('addImageValidationMessage');
    let addImageMessage = document.getElementById('addImageError');
    while (addImageMessage.firstChild) 
      addImageMessage.removeChild(addImageMessage.lastChild);
    addImageErrorDiv.style.display = 'none';
    if (addImage == "" ) {
      let addImageError = document.createElement('li');
      addImageError.textContent = "- please upload the cover of the book.";
      addImageMessage.appendChild(addImageError);
      addImageErrorDiv.style.display = 'inline';
      flag = false;
    }
  }

  let formDiv = document.getElementById("AddBookDiv");
  let addSuccess = document.getElementById("AddSuccessful");
  let exist = document.getElementById("Existing");
  formDiv.style.display = 'none';
  addSuccess.style.display = 'none';
  exist.style.display = 'none';
  if(flag){
    // AJAX to be submmited
    let formData = new FormData(document.getElementById("addBookForm"));
    formData.append('title', title);
    formData.append('id', id);
    formData.append('author', author);
    formData.append('category', category);
    formData.append('briefDescription', briefDescription);
    formData.append('description', description);
    formData.append('addImage', addImage);

    // AJAX request to submit form data
    var xhr = new XMLHttpRequest();
    // "/peges/Sign_up"
    xhr.open("POST", "Add_book", true);
    xhr.setRequestHeader("X-CSRFToken", "{{ csrf_token }}");
    // xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      // Request finished and response is ready
      formDiv.style.display = 'inline';
      addSuccess.style.display = 'inline';
      }
    else if(xhr.readyState === 4 && xhr.status === 226){
      formDiv.style.display = 'inline';
      exist.style.display = 'inline';
      }
    };
    xhr.send(formData);
  }
  else{
    formDiv.style.display = 'none';
    addSuccess.style.display = 'none';
    exist.style.display = 'none';
  }


}

function validateEditBookForm(bookId){
    // prevent default
    let form = document.getElementById("editBookForm");
    function handleForm(event){
      event.preventDefault();
    }
    form.addEventListener('submit', handleForm);
  
    let flag = true;
    let title = document.forms["editBookForm"]["title"].value;
    let id = document.forms["editBookForm"]["bookID"].value;
    let author = document.forms["editBookForm"]["author"].value;
    let category = document.forms["editBookForm"]["Category"].value;
    let briefDescription = document.forms["editBookForm"]["briefDescription"].value;
    let description = document.forms["editBookForm"]["description"].value;
    let addImage = document.forms["editBookForm"]["addImage"].value;
  
  
    if(true){
      // check title
      let titleErrorDiv = document.getElementById('titleValidationMessage');
      let titleMessage = document.getElementById('titleError');
      while (titleMessage.firstChild) 
        titleMessage.removeChild(titleMessage.lastChild);
      titleErrorDiv.style.display = 'none';
      if(title == "" || title.length > 30 || title.length <3 ) {
        let titleError = document.createElement('li');
        titleError.textContent = "- please check the title of the book and try again(3-30 letters).";
        titleMessage.appendChild(titleError);
        titleErrorDiv.style.display = 'inline';
        flag = false;
      }
  
      // check id
      let idErrorDiv = document.getElementById('idValidationMessage');
      let idMessage = document.getElementById('idError');
      while (idMessage.firstChild) 
        idMessage.removeChild(idMessage.lastChild);
      idErrorDiv.style.display = 'none';
      if (id == "" || id.length < 3 || id.length > 15) {
        let idError = document.createElement('li');
        idError.textContent = "- ID should be between (3-15).";
        idMessage.appendChild(idError);
        idErrorDiv.style.display = 'inline';
        flag = false;
      }
  
      // check author
      let authorErrorDiv = document.getElementById('authorValidationMessage');
      let authorMessage = document.getElementById('authorError');
      while (authorMessage.firstChild) 
        authorMessage.removeChild(authorMessage.lastChild);
      authorErrorDiv.style.display = 'none';
      if (author == "" || author.length < 3 || author.length > 30 || /\d/.test(author) ) {
        let authorError = document.createElement('li');
        authorError.textContent = "- please input the name of the author by letters only(3-30 letters).";
        authorMessage.appendChild(authorError);
        authorErrorDiv.style.display = 'inline';
        flag = false;
      }
  
      // check category
      let categoryErrorDiv = document.getElementById('categoryValidationMessage');
      let categoryMessage = document.getElementById('categoryError');
      while (categoryMessage.firstChild) 
        categoryMessage.removeChild(categoryMessage.lastChild);
      categoryErrorDiv.style.display = 'none';
      if (category == "" || category.length < 3 || category.length > 30 || /\d/.test(category) ) {
        let categoryError = document.createElement('li');
        categoryError.textContent = "- please input the category of the book by letters only (3-30 letters).";
        categoryMessage.appendChild(categoryError);
        categoryErrorDiv.style.display = 'inline';
        flag = false;
      }
  
      // check brief description
      let briefDescriptionErrorDiv = document.getElementById('briefDescriptionValidationMessage');
      let briefDescriptionMessage = document.getElementById('briefDescriptionError');
      while (briefDescriptionMessage.firstChild) 
        briefDescriptionMessage.removeChild(briefDescriptionMessage.lastChild);
      briefDescriptionErrorDiv.style.display = 'none';
      if (briefDescription == "" || briefDescription.length < 10 || briefDescription.length > 500 ) {
        let briefDescriptionError = document.createElement('li');
        briefDescriptionError.textContent = "- please input a brief description of the book (10-500 char).";
        briefDescriptionMessage.appendChild(briefDescriptionError);
        briefDescriptionErrorDiv.style.display = 'inline';
        flag = false;
      }
  
      // check description
      let descriptionErrorDiv = document.getElementById('descriptionValidationMessage');
      let descriptionMessage = document.getElementById('descriptionError');
      while (descriptionMessage.firstChild) 
        descriptionMessage.removeChild(descriptionMessage.lastChild);
      descriptionErrorDiv.style.display = 'none';
      if (description == "" || description.length < 10 || description.length > 1000 ) {
        let descriptionError = document.createElement('li');
        descriptionError.textContent = "- please input a full description of the book (10-1000 char).";
        descriptionMessage.appendChild(descriptionError);
        descriptionErrorDiv.style.display = 'inline';
        flag = false;
      }
  
      // check addImage
      let addImageErrorDiv = document.getElementById('addImageValidationMessage');
      let addImageMessage = document.getElementById('addImageError');
      while (addImageMessage.firstChild) 
        addImageMessage.removeChild(addImageMessage.lastChild);
      addImageErrorDiv.style.display = 'none';
      if (addImage == "" ) {
        let addImageError = document.createElement('li');
        addImageError.textContent = "- please upload the cover of the book.";
        addImageMessage.appendChild(addImageError);
        addImageErrorDiv.style.display = 'inline';
        flag = false;
      }
    }
  
    let formDiv = document.getElementById("EditBookDiv");
    let editSuccess = document.getElementById("EditSuccessful");
    let exist = document.getElementById("Existing");
    formDiv.style.display = 'none';
    editSuccess.style.display = 'none';
    exist.style.display = 'none';
    if(flag){
      // AJAX to be submmited
      let formData = new FormData(document.getElementById("editBookForm"));
      formData.append('title', title);
      formData.append('id', id);
      formData.append('author', author);
      formData.append('category', category);
      formData.append('briefDescription', briefDescription);
      formData.append('description', description);
      formData.append('addImage', addImage);
  
      // AJAX request to submit form data
      var xhr = new XMLHttpRequest();
      xhr.open("POST", "/Admin_Pages/Edit_book/" + bookId + '/', true);
      xhr.setRequestHeader("X-CSRFToken", "{{ csrf_token }}");
      // xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        // Request finished and response is ready
        formDiv.style.display = 'inline';
        editSuccess.style.display = 'inline';
        alert("You edited the book successfully")
        window.location.href = "/Admin_Pages/Edit_book/" + id + '/';
        }
      else if(xhr.readyState === 4 && xhr.status === 226){
        formDiv.style.display = 'inline';
        exist.style.display = 'inline';
        }
      };
      xhr.send(formData);
    }
    else{
      formDiv.style.display = 'none';
      editSuccess.style.display = 'none';
      exist.style.display = 'none';
    }
    
} 