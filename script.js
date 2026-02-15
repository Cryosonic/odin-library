const bookshelf = document.querySelector(".bookshelf");
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
        const container = document.createElement("div");
        const bookTitle = document.createElement("p");
        const bookAuthor = document.createElement("p");
        const bookPages = document.createElement("p");
        const bookRead = document.createElement("div");
        const removeBook = document.createElement("button");

        container.id = book.id;
        container.classList.add("book");

        bookTitle.classList.add("book-title");
        bookTitle.textContent = `${book.title}`;
        bookAuthor.classList.add("book-author");
        bookAuthor.textContent = `${book.author}`;
        bookPages.classList.add("book-pages");
        bookPages.textContent = `${book.pages}`;
        removeBook.classList.add("remove-book");
        removeBook.textContent = `Remove`;

        container.appendChild(bookTitle);
        container.appendChild(bookAuthor);
        container.appendChild(bookPages);
        container.appendChild(bookRead);
        container.appendChild(removeBook);

        bookshelf.appendChild(container);
        // TODO: Add Remove button
    })
}

// TODO: ability to toggle Read status of a book. Add this to the Book prototype after constructor

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
    bookshelf.innerHTML = "";
    updateLibrary();
})

bookshelf.addEventListener("click", (e) => {
    if(e.target.className === "remove-book") {
        e.target.parentElement.remove();
        // TODO Also need to remove from array
    }

    if (e.target.className === "read") {
        e.target.classList.remove("read");
        e.target.classList.add("not-read");
        // TODO Also need to update array
    }
})