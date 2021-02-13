//somehow use the name 'tutu gregorio' in your page thats mad funny


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

function addBookToLibrary(book, author, pages, read){
    let userInput = new Book(book, author, pages, read);
    myLibrary.push(userInput);

    return userInput;

}



console.log(addBookToLibrary('3232','323222','fsd3','yes'))
