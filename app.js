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





//NOTES FOR TOMORROW READ ME READ ME READ ME
//FOR THE PAGES TOGGLE MAYBE ADD AN UP AND DOWN ARROW EVENT LISTENER 
//PAGES++ PAGES-- 



let myLibrary = [];

function Book(title,author,pages,read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;    
}

Book.prototype.info = function(){
    return `${this.title} by ${this.author}, ${this.pages}, ${this.read}`
};

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


        contentBox.style.display="flex";
        let div1 = document.createElement('div');
        
        div1.classList.add('bookcard');
        div1.style.display = "block"

        for(let i = 0; i<myLibrary.length;i++){
          div1.innerHTML = `${myLibrary[i].title} <br> ${myLibrary[i].author} <br> ${myLibrary[i].pages} <br> ${myLibrary[i].read}`
        }
    
       let btn = document.createElement('button');
       btn.innerHTML ='<i class="fas fa-trash">'
       div1.appendChild(btn);
        
        

        bookCardDisplay.appendChild(div1);

       //REMOVE BOOK
        let removeIndex = '';
        let splitWord = ''
        let doneWord = ''
        btn.addEventListener('click', function(){
          for(let i = 0; i < myLibrary.length; i++){
            splitWord = div1.textContent.split(' ');
            doneWord = splitWord[0];

            

            div1.style.display="none";

             removeIndex = myLibrary.map(function(item){return item.title}).indexOf(doneWord.toString())

          }
          myLibrary.splice(removeIndex, 1)
          console.log(div1, doneWord, removeIndex)
        })

        

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

