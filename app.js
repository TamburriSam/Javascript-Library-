//somehow use the name 'tutu gregorio' in your page thats mad funny
let addBtn = document.querySelector('.addbtn');
let displayTitle = document.querySelector('.displayTitle');
let textBox = document.querySelector('.text-box');
let bookCard = document.querySelector('.bookcard');
let bookCardDisplay = document.querySelector('.afterfunctionbox')

addBtn.addEventListener('click', addBookToLibrary)

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
    title = prompt('Book name'); //document.getelementbyid to get this from html input
    author = prompt('Author name');
    pages = prompt('Pages');
    read = prompt('Read');
    userInput = new Book(title, author, pages, read);
    myLibrary.push(userInput);
    displayBook();
    return userInput;
}


function displayBook(){
    for(let i = 0; i < myLibrary.length; i++){
        let div = document.createElement('div');

        div.innerHTML = myLibrary[myLibrary.length-1].title;

        bookCardDisplay.appendChild(div);

        
    };
    
}
