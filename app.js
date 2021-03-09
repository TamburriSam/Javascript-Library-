let addBookBtn = document.querySelector(".addbtn");
let displayTitle = document.querySelector(".displayTitle");
let textBox = document.querySelector(".text-box");
let bookCard = document.querySelector(".bookcard");
let bookCardDisplay = document.querySelector(".afterfunctionbox");
let bookSubmit = document.querySelector(".bookSubmit");
let bookIcon = document.querySelector(".book");
let removeBtn = document.querySelector(".removebutton");
let contentBox = document.querySelector(".afterfunctionbox");
let totalBox = document.querySelector(".totalBox");
let totalHeading = document.querySelector(".totalbooks");
let bookForm = document.querySelector(".bookform");
let myLibrary = [];





function shiftElements() {
  bookIcon.style.gridColumn = "3";
  addBookBtn.style.gridColumn = "3";

  totalBox.style.display = "block";
  totalHeading.style.display = "block";
  totalBox.innerHTML = myLibrary.length;
}

class Book {
    constructor(title, author, pages, read){
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }

    totalBook () {
        return this.title
    }
}

class Store {

    //use this to get whatever is in local storage
    static getBooks(){
        let books;
        if(localStorage.getItem('books') === null){
            books = [];
        }else {
            books = JSON.parse(localStorage.getItem('books'))
            shiftElements();
            displayTitle.style.display = 'none'
        }

        return books
    }


    static displayBooks() {
        const books = Store.getBooks();
     

        books.forEach(function(book){

           //const newBook = new Book(book);

           addToLs(book)

        })

     

   

    }

    static addBook (book) {
       const books = Store.getBooks();

       books.push(book);

       localStorage.setItem('books', JSON.stringify(books))
    }

    static removeBook(){

    }
}

//DOM load event
document.addEventListener('DOMContentLoaded', Store.displayBooks())
function addBookToLibrary(title, author, pages, read) {
  title = document.getElementById("title").value;
  author = document.getElementById("author").value;
  pages = document.getElementById("pages").value;
  read = document.getElementById("checkbox").checked;
  userInput = new Book(title, author, pages, read);
  myLibrary.push(userInput);




  return userInput;
}


 function addToLs(book){
    let completed = "";



  contentBox.style.display = "flex";
  let div1 = document.createElement("div");
  div1.classList.add("bookcard");
  div1.style.display = "block";

  let title = document.createElement('div');
  title.classList.add('title');
  div1.appendChild(title);


  bookCardDisplay.appendChild(div1);


  title.innerHTML = JSON.stringify(book[book.length-1]).split('"').join(' ').replace(/[^\w\s]/gi, '');


} 



function displayBook(book) {
  let completed = "";



  contentBox.style.display = "flex";
  let div1 = document.createElement("div");
  div1.classList.add("bookcard");
  div1.style.display = "block";

  let title = document.createElement('div');
  title.classList.add('title');
  div1.appendChild(title);


  bookCardDisplay.appendChild(div1);




title.innerHTML = myLibrary[myLibrary.length-1].totalBook();





  for (let i = 0; i < myLibrary.length; i++) {
    if (myLibrary[i].read === true) {
      myLibrary[i].read = "Yes";
    } else {
      myLibrary[i].read = "No";
    }


    div1.appendChild(title)

    if (myLibrary[i].read === "Yes") {
      completed = document.createElement("button");
      completed.innerHTML = "COMPLETED";
      completed.className = "completed";
      completed.style.color = "green";
      div1.appendChild(completed);
    }
  }

  //create scrap button
  let btn = document.createElement("button");
  btn.innerHTML = 'Scrap? <i class="fas fa-trash">';
  btn.className = "scrap";
  div1.appendChild(btn);
  bookCardDisplay.appendChild(div1);
 

  //REMOVE BOOK
  let removeIndex = "";
  btn.addEventListener("click", function () {
    for (let i = 0; i < myLibrary.length; i++) {
      //splitWord = title.textContent;
      div1.style.display = "none";


      removeIndex = myLibrary
        .map(function (item) {
          return item.title;
        })
        .indexOf(title.textContent);
    }



    myLibrary.splice(removeIndex, 1);
    totalHeading.style.display = "block";
    totalBox.style.display = "block";
    totalBox.innerHTML = myLibrary.length; 

  
  });

  //read toggle
  let toggler = document.createElement("button");
  toggler.innerHTML = 'Toggle Status <i class="fas fa-check-square"></i>';
  toggler.className = "toggler";
  div1.appendChild(toggler);

  toggler.addEventListener("click", function () {
    for (let i = 0; i <= myLibrary.length; i++) {


      findIndex = myLibrary
        .map(function (item) {
          return item.title;
        })
        .indexOf(title.textContent);
    }

    if (myLibrary[findIndex].read === "No") {
      toggler.style.color = "green";
      toggler.innerHTML = "COMPLETE";
      myLibrary[findIndex].read = "Yes";
      div1.innerHTML = `Title: ${myLibrary[findIndex].title} <br>
                          Author: ${myLibrary[findIndex].author} <br>
                          Pages : ${myLibrary[findIndex].pages} <br>`;
      div1.appendChild(toggler);
      div1.appendChild(btn);
    } else if (myLibrary[findIndex].read === "Yes") {
      toggler.style.color = "red";
      toggler.innerHTML = "Not Read";
      myLibrary[findIndex].read = "No";
      div1.innerHTML = `Title: ${myLibrary[findIndex].title} <br>
                          Author: ${myLibrary[findIndex].author} <br>
                          Pages : ${myLibrary[findIndex].pages} <br>`;
      div1.appendChild(toggler);
      div1.appendChild(btn);
    }
  });
}

bookSubmit.addEventListener("click", function (e) {
  addBookToLibrary();
  displayBook();

  Store.addBook(myLibrary);

  modal.style.display = "none";
  displayTitle.style.display = "none";
  shiftElements();

  for (let i = 0; i < myLibrary.length; i++) {
    if (myLibrary[i].read === "Yes") {
    }
  }

  bookForm.reset();
});

//Modal
var modal = document.getElementById("myModal");

var span = document.getElementsByClassName("close")[0];

addBookBtn.onclick = function () {
  modal.style.display = "block";
};

span.onclick = function () {
  modal.style.display = "none";
};

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
