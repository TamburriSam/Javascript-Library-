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
let totalBox = document.querySelector('.totalBox');
let totalHeading = document.querySelector('.totalbooks');
let bookForm = document.querySelector('.bookform');




//NOTES FOR TOMORROW READ ME READ ME READ ME
//FOR THE PAGES TOGGLE MAYBE ADD AN UP AND DOWN ARROW EVENT LISTENER 
//PAGES++ PAGES-- 
//NO. READ MORE ABOUT GETATTRIBUTE/DATASET. DATA HTML JS DOM. 



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

Book.prototype.readToggle = function(){
  let findIndex = '';
  let splitWord = ''
  let doneWord = ''

  
    for(let i = 0; i < myLibrary.length; i++){
      splitWord = this.textContent.split(' ');
      doneWord = splitWord[0];

      findIndex = myLibrary.map(function(item){return item.title}).indexOf(doneWord.toString())

    }
   return findIndex
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
    let completed = '';

        contentBox.style.display="flex";
        let div1 = document.createElement('div');
        
        div1.classList.add('bookcard');
        div1.style.display = "block"

         for(let i = 0; i<myLibrary.length;i++){
          div1.innerHTML = `Title: ${myLibrary[i].title} <br>
           Author: ${myLibrary[i].author} <br>
            Total Pages: ${myLibrary[i].pages} <br>`

              if(myLibrary[i].read === true){
                completed = document.createElement('button');
                completed.innerHTML = "COMPLETED";
                completed.style.color ="green";
                div1.appendChild(completed);
             } else if (myLibrary[i].read === false) {
                completed = document.createElement('button');
                completed.innerHTML = "INCOMPLETE";
                completed.style.display ="none";
             }  

             /* localStorage.setItem(`${myLibrary[i].title} ${myLibrary[i].author} ${myLibrary[i].pages}`, `${myLibrary[i].read}`) */
        } 
    
       let btn = document.createElement('button');
       btn.innerHTML ='Scrap? <i class="fas fa-trash">';
       btn.style.marginTop = '23px'
       div1.appendChild(btn);
        
        

        bookCardDisplay.appendChild(div1);

       //REMOVE BOOK
        let removeIndex = '';
        let splitWord = ''
        let doneWord = ''
        btn.addEventListener('click', function(){
          for(let i = 0; i < myLibrary.length; i++){
            splitWord = div1.textContent.split(' ');
            doneWord = splitWord[1];

            

            div1.style.display="none";

             removeIndex = myLibrary.map(function(item){return item.title}).indexOf(doneWord.toString())

          }
          myLibrary.splice(removeIndex, 1);
          totalHeading.style.display="block";
          totalBox.style.display="block";
          totalBox.innerHTML = myLibrary.length;
          console.log(div1, doneWord, removeIndex)
        })

    //read toggle
     let toggler = document.createElement('button');
    toggler.innerHTML = 'Toggle Read Status <i class="fas fa-check-square"></i>';
    div1.appendChild(toggler); 

        





    toggler.addEventListener('click', function(){
      for(let i = 0; i <= myLibrary.length; i++){
         splitWord = div1.textContent.split(' ');
         doneWord = splitWord[1]+splitWord[2]; 

        if(splitWord[1].length >3){
         findIndex = myLibrary.map(function(item){return item.title[0,1,2,3]}).indexOf(doneWord[0,1,2,3])
        } else if (splitWord[1].length <= 2){
          findIndex = myLibrary.map(function(item){return item.title[0,1]}).indexOf(doneWord[0,1])
        } else {
          findIndex = myLibrary.map(function(item){return item.title[0]}).indexOf(doneWord[0])
        };

        
      }
      if(myLibrary[findIndex].read === false){
        toggler.style.color="green";
        toggler.innerHTML = "Completed";
        myLibrary[findIndex].read = true;
        
      }else if (myLibrary[findIndex].read === true) {
        toggler.style.color="red";
        toggler.innerHTML = "Not Finished"
        myLibrary[findIndex].read = false;
        completed.style.display="none";
      }
      console.log(myLibrary[findIndex].read, findIndex, splitWord, doneWord)
    })

}



bookSubmit.addEventListener('click', function(e){
 
  addBookToLibrary();
  displayBook();
  modal.style.display="none";
  displayTitle.style.display="none";

  bookIcon.style.gridColumn = '3';
  addBookBtn.style.gridColumn = '3'

  totalBox.style.display ="block";
  totalHeading.style.display="block";
  totalBox.innerHTML = myLibrary.length;
  bookForm.reset();

})



//totalBox.innerHTML = myLibrary.length;


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