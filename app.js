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

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary(title, author, pages, read) {
  title = document.getElementById("title").value;
  author = document.getElementById("author").value;
  pages = document.getElementById("pages").value;
  read = document.getElementById("checkbox").checked;
  userInput = new Book(title, author, pages, read);
  myLibrary.push(userInput);
  return userInput;
}

function displayBook() {
  let completed = "";
  let title = "";
  let author = "";
  let pages = "";
  let read = "";

  contentBox.style.display = "flex";
  let div1 = document.createElement("div");
  div1.classList.add("bookcard");
  div1.style.display = "block";

  for (let i = 0; i < myLibrary.length; i++) {
    if (myLibrary[i].read === true) {
      myLibrary[i].read = "Yes";
    } else {
      myLibrary[i].read = "No";
    }

    title = `Title: ${myLibrary[i].title} <br>`;
    author = `Author: ${myLibrary[i].author} <br>`;
    pages = `Total Pages: ${myLibrary[i].pages} <br>`;
    read = `Read: ${myLibrary[i].read} <br>`;
    div1.innerHTML = title + author + pages + read;

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
  let splitWord = "";
  let doneWord = "";
  btn.addEventListener("click", function () {
    for (let i = 0; i < myLibrary.length; i++) {
      splitWord = div1.textContent.split(" ");
      doneWord = splitWord[1];
      div1.style.display = "none";

      removeIndex = myLibrary
        .map(function (item) {
          return item.title;
        })
        .indexOf(doneWord.toString());
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
      splitWord = div1.textContent.split(" ");
      doneWord = splitWord[1] + splitWord[2];

      findIndex = myLibrary
        .map(function (item) {
          joke = item.title.split(" ");
          return joke[0];
        })
        .indexOf(splitWord[1]);
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
