//somehow use the name 'tutu gregorio' in your page thats mad funny
let addBookBtn = document.querySelector('.addbtn');
let displayTitle = document.querySelector('.displayTitle');
let textBox = document.querySelector('.text-box');
let bookCard = document.querySelector('.bookcard');
let bookCardDisplay = document.querySelector('.afterfunctionbox');
let bookSubmit = document.querySelector('.bookSubmit');
let bookIcon = document.querySelector('.book');
let removeBtn = document.querySelector('.removebutton');
let contentBox = document.querySelector('.afterfunctionbox');



let myLibrary = [];

function Book(title,author,pages,read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function(){
      console.log(`${this.title} by ${this.author}, ${this.pages}, ${this.read}`)
    }    
}

function addBookToLibrary(title, author, pages, read){
    title = document.getElementById('title').value;
    author = document.getElementById('author').value;
    pages = document.getElementById('pages').value
    read = document.getElementById('checkbox').checked;
    userInput = new Book(title, author, pages, read);
    myLibrary.push(userInput);
    return userInput;
}


function displayBook(){
    

        let div1 = document.createElement('div');
        contentBox.style.display="inline-block";
        div1.classList.add('bookcard');
        div1.style.display = "block"

     

       
        div1.innerHTML = `Title: ${myLibrary[myLibrary.length-1].title}  Author: ${myLibrary[myLibrary.length-1].author} 
        Pages: ${myLibrary[myLibrary.length-1].pages} 
        Read: ${myLibrary[myLibrary.length-1].read}`;  
        
        

        bookCardDisplay.appendChild(div1);

}

bookSubmit.addEventListener('click', function(e){
 
  addBookToLibrary();
  displayBook();
  modal.style.display="none";
  displayTitle.style.display="none";

  bookIcon.style.gridColumn = '3';
  addBookBtn.style.gridColumn = '3'

})






//MODAL
// Get the modal
var modal = document.getElementById("myModal");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
addBookBtn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

