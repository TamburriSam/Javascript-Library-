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
let clearLS = document.querySelector(".clearLS");
let myLibrary = [];

class Book {
  constructor(title, author, pages, read, index) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.index = myLibrary.length;
  }

  titleBook() {
    return this.title;
  }

  restOfBook() {
    return `By: ${this.author}<br>${this.pages} Pages<br>${this.read}<br>`;
  }
}

//local storage
const persistToLs = () => {
  localStorage.setItem("library", JSON.stringify(myLibrary));
};

var lsItems = JSON.parse(localStorage.getItem("library"));

if (lsItems) {
  myLibrary = lsItems;
}

function ifPageLoaded() {
  if (localStorage.getItem("library") !== null) {
    addToLs();
  }
}

function shiftElements() {
  bookIcon.style.gridColumn = "3";
  addBookBtn.style.gridColumn = "3";
  totalBox.style.display = "block";
  totalHeading.style.display = "block";
  totalBox.innerHTML = myLibrary.length;

  document.getElementById("main-container").style.position = "absolute";
  document.getElementById("main-container").style.left = "45px";
  document.getElementById("main-container").style.width = "10vw";

  document.querySelector(".addbtn").style.position = "absolute";
  document.querySelector(".addbtn").style.left = "42px";
}

//DOM load event
document.addEventListener("DOMContentLoaded", ifPageLoaded());

function addBookToLibrary(title, author, pages, read) {
  title = document.getElementById("title").value;
  author = document.getElementById("author").value;
  pages = document.getElementById("pages").value;
  read = document.getElementById("checkbox").checked;
  userInput = new Book(title, author, pages, read);
  myLibrary.push(userInput);
  persistToLs();

  return userInput;
}

function addToLs() {
  shiftElements();
  displayTitle.style.display = "none";

  myLibrary.forEach(function (book) {
    contentBox.style.display = "flex";
    let div1 = document.createElement("div");
    div1.classList.add("bookcard");
    div1.style.display = "flex";

    let title = document.createElement("div");
    title.classList.add("title");

    bookCardDisplay.appendChild(div1);

    title.innerHTML = book.title;
    div1.innerHTML = `By: ${book.author} <br> ${book.pages} pages`;
    div1.prepend(title);

    //remove from LS
    let btn = document.createElement("button");
    btn.innerHTML = 'Scrap? <i class="fas fa-trash">';
    btn.className = "biggerScrap";
    div1.appendChild(btn);
    bookCardDisplay.appendChild(div1);

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

      persistToLs();
    });
  });
}

function displayBook() {
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

  title.innerHTML = myLibrary[myLibrary.length - 1].title;
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
    persistToLs();
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

const formTitle = document.querySelector("#title");
const formAuthor = document.querySelector("#author");

//submit button to fire main events
bookSubmit.addEventListener("click", function (e) {
  document.querySelector(".addbtn").style.display = "block";

  if (formTitle.value !== "") {
    addBookToLibrary();
    displayBook();
    modal.style.display = "none";
    displayTitle.style.display = "none";
    shiftElements();

    for (let i = 0; i < myLibrary.length; i++) {
      if (myLibrary[i].read === "Yes") {
      }
    }

    bookForm.reset();
  } else {
    formTitle.style.borderColor = "red";
    let point = document.createElement("div");
    point.innerHTML = "You Must Enter A Name!";
    point.className = "error";
    bookForm.prepend(point);

    setTimeout(() => {
      point.style.display = "none";
      formTitle.style.borderColor = "white";
    }, 2000);
  }
});

//Modal
var modal = document.getElementById("myModal");

var span = document.getElementsByClassName("close")[0];

addBookBtn.onclick = function () {
  document.querySelector(".addbtn").style.display = "none";

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

clearLS.addEventListener("click", function () {
  localStorage.clear();
  location.reload();
});
