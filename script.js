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
        const title = document.createElement("p");
        const newTitle = document.createElement("p");
        const author = document.createElement("p");
        const newAuthor = document.createElement("p");
        const pages = document.createElement("p");
        const newPages = document.createElement("p");
        const bookRead = document.createElement("div");
        const removeBook = document.createElement("button");

        container.id = book.id;
        container.classList.add("book");

        title.classList.add("book-data");
        title.textContent = "Title:";
        container.appendChild(title);
        newTitle.textContent = `${book.title}`;
        container.appendChild(newTitle);

        author.classList.add("book-data");
        author.textContent = "Author:";
        container.appendChild(author);
        newAuthor.textContent = `${book.author}`;
        container.appendChild(newAuthor);

        pages.classList.add("book-data");
        pages.textContent = "Pages:";
        container.appendChild(pages);
        newPages.textContent = `${book.pages}`;
        container.appendChild(newPages);

        removeBook.classList.add("remove-book");
        removeBook.textContent = `Remove`;

        container.appendChild(bookRead);
        container.appendChild(removeBook);

        bookshelf.appendChild(container);
    })
}

// TODO: ability to toggle Read status of a book. Add this to the Book prototype after constructor

updateLibrary();

addBookBtn.addEventListener("click", ()=>{
    // TODO: split function and add event filter to none-default.

    let newTitle = titleInput.value;
    let newAuthor = authorInput.value;
    let newPages = pagesInput.value;
    let read = readInput.checked ? "I have read this book" : "I have not read this book yet";

    titleInput.value = "";
    authorInput.value = "";
    pagesInput.value = ""
    readInput.checked = false;

    if (newTitle !== "" && newAuthor !== "" && newPages !== "") {
        addBookToLibrary(newTitle, newAuthor, newPages, read);
        // TODO: append new book rather than reset.
        bookshelf.innerHTML = "";
        updateLibrary();
    }
})

bookshelf.addEventListener("click", (e) => {
    if(e.target.className === "remove-book") {
        const parentID = e.target.parentElement.id;

        // remove entry from library array
        let index = 0;
        for (let i = 0; i < library.length; i++) {
            if (library[i].id === parentID) {
                index = i;
            }
        }
        library.splice(index, 1);

        e.target.parentElement.remove();
    }

    if (e.target.className === "read") {
        e.target.classList.remove("read");
        e.target.classList.add("not-read");
        // TODO Also need to update array
    }
})