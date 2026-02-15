const article = document.querySelector("article");
const titleInput = document.getElementById("title");
const authorInput = document.getElementById("author");
const pagesInput = document.getElementById("pages");
const readInput = document.getElementById("read");

const addBookBtn = document.getElementById("add-book-button")

const library = [
    {
        id: crypto.randomUUID(),
        title: "Harry Potter",
        author: "J.K. Rowling",
        pages: "500",
        read: "I have read this book"
    },{
        id: crypto.randomUUID(),
        title: "Lord of the Rings",
        author: "J.R.R. Tolken",
        pages: "500",
        read: "I have not read this book yet"
    }
];

function Book(id, title, author, pages, read) {
    if (!new.target) {
        throw Error("new word must be used");
    }
    this.id = id;
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
};

const addBookToLibrary = function(title, author, pages, read) {
    const newBookID = crypto.randomUUID()
    let nextBook = new Book(newBookID, title, author, pages, read);
    library.push(nextBook);
}

const updateLibrary = () => {
    library.forEach(book => {
        let container = document.createElement("div");
        let para = document.createElement("p");
        para.textContent = `${book.id}: ${book.title} by ${book.author}, has ${book.pages} pages. ${book.read}`;
        container.appendChild(para);
        article.appendChild(container);
        // TODO: Add Remove button
    })
}

// TODO: ability to toggle Read status of a book. Add this to the Book prototype after constructor

// TODO: Add Remove Book function



updateLibrary();

addBookBtn.addEventListener("click", ()=>{
    let newTitle = titleInput.value;
    let newAuthor = authorInput.value;
    let newPages = pagesInput.value;
    let read = readInput.checked ? "I have read this book" : "I have not read this book yet";

    titleInput.value = "";
    authorInput.value = "";
    pagesInput.value = ""
    readInput.checked = false;

    addBookToLibrary(newTitle, newAuthor, newPages, read);
    // TODO: append new book rather than reset.
    article.innerHTML = "";
    updateLibrary();
})