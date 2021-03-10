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

class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }

  titleBook() {
    return this.title;
  }

  restOfBook() {
    return `${this.author}<br>${this.pages}<br>${this.read}<br>`;
  }
}

class Store {
  //use this to get whatever is in local storage
  static getBooks() {
    let books;
    if (localStorage.getItem("books") === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem("books"));
      shiftElements();
      displayTitle.style.display = "none";
    }

    return books;
  }

  static displayBooks() {
    const books = Store.getBooks();

    books.forEach(function (book) {
      addToLs(book);
    });
  }

  static addBook(book) {
    const books = Store.getBooks();

    books.push(book);

    localStorage.setItem("books", JSON.stringify(books));
  }

  static removeBook(title) {
    const books = Store.getBooks();


    books.forEach(function (book, index) {
      if (JSON.stringify(book.title) === undefined) {
        books.splice(this, 1);
      }
    });
    localStorage.setItem("books", JSON.stringify(books));
  }
}

function shiftElements() {
  bookIcon.style.gridColumn = "3";
  addBookBtn.style.gridColumn = "3";
  totalBox.style.display = "block";
  totalHeading.style.display = "block";
  totalBox.innerHTML = myLibrary.length;
}

//DOM load event
document.addEventListener("DOMContentLoaded", Store.displayBooks());

function addBookToLibrary(title, author, pages, read) {
  title = document.getElementById("title").value;
  author = document.getElementById("author").value;
  pages = document.getElementById("pages").value;
  read = document.getElementById("checkbox").checked;
  userInput = new Book(title, author, pages, read);
  myLibrary.push(userInput);

  return userInput;
}

function addToLs(book) {
  contentBox.style.display = "flex";
  let div1 = document.createElement("div");
  div1.classList.add("bookcard");
  div1.style.display = "block";

  let title = document.createElement("div");
  title.classList.add("title");

  bookCardDisplay.appendChild(div1);

  title.innerHTML = JSON.stringify(book[book.length - 1].title);
  div1.innerHTML = `By: ${JSON.stringify(
    book[book.length - 1].author
  )} <br> Pages: ${JSON.stringify(book[book.length - 1].pages)}<br>`;
  div1.prepend(title);

  //remove from LS
  let btn = document.createElement("button");
  btn.innerHTML = 'Scrap? <i class="fas fa-trash">';
  btn.className = "scrap";
  div1.appendChild(btn);
  bookCardDisplay.appendChild(div1);

  btn.addEventListener("click", function () {
    div1.style.display = "none";

    Store.removeBook(this.parentElement.firstChild.textContent);
  });
}

function displayBook() {
  let completed = "";

  contentBox.style.display = "flex";
  let div1 = document.createElement("div");
  div1.classList.add("bookcard");
  div1.style.display = "block";

  let title = document.createElement("div");
  title.classList.add("title");

  bookCardDisplay.appendChild(div1);



  for (let i = 0; i < myLibrary.length; i++) {
    if (myLibrary[i].read === true) {
      myLibrary[i].read = "COMPLETED";
    } else {
      myLibrary[i].read = "Not Completed";
    }

  }

  title.innerHTML = myLibrary[myLibrary.length - 1].titleBook();

  div1.innerHTML = myLibrary[myLibrary.length - 1].restOfBook();
  div1.prepend(title);

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
    Store.removeBook(this.parentElement.firstChild.textContent);
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

    if (myLibrary[findIndex].read === "Not Completed") {
      toggler.style.color = "green";
      toggler.innerHTML = "COMPLETE";
      myLibrary[findIndex].read = "COMPLETED";
      div1.innerHTML = `Title: ${myLibrary[findIndex].title} <br>
                          Author: ${myLibrary[findIndex].author} <br>
                          Pages : ${myLibrary[findIndex].pages} <br>`;
      div1.appendChild(toggler);
      div1.appendChild(btn);
    } else if (myLibrary[findIndex].read === "COMPLETED") {
      toggler.style.color = "red";
      toggler.innerHTML = "Not Read";
      myLibrary[findIndex].read = "Not Completed";
      div1.innerHTML = `Title: ${myLibrary[findIndex].title} <br>
                          Author: ${myLibrary[findIndex].author} <br>
                          Pages : ${myLibrary[findIndex].pages} <br>`;
      div1.appendChild(toggler);
      div1.appendChild(btn);
    }
  });
}

//submit button to fire main events
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
