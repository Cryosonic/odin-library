const bookshelf = document.querySelector(".bookshelf");
const booksList = bookshelf.children;
const titleInput = document.getElementById("title");
const authorInput = document.getElementById("author");
const pagesInput = document.getElementById("pages");
const readInput = document.getElementById("read");
const addBookBtn = document.getElementById("add-book-button");

const library = [
    {
        id: crypto.randomUUID(),
        title: "Harry Potter",
        author: "J.K. Rowling",
        pages: "500",
        read: true,
    },{
        id: crypto.randomUUID(),
        title: "Lord of the Rings",
        author: "J.R.R. Tolken",
        pages: "500",
        read: false,
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

const updateBookshelf = () => {
    library.forEach((book) => {
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

        bookRead.classList.add("read");
        bookRead.classList.add(book.read);
        bookRead.textContent = book.read ? "Read" : "Not read";
        container.appendChild(bookRead);

        removeBook.classList.add("remove-book");
        removeBook.textContent = `Remove`;

        container.appendChild(bookRead);
        container.appendChild(removeBook);

        bookshelf.appendChild(container);
    })
}

updateBookshelf();

addBookBtn.addEventListener("click", ()=>{
    // TODO: split function and add event filter to none-default.

    let newTitle = titleInput.value;
    let newAuthor = authorInput.value;
    let newPages = pagesInput.value;
    let read = readInput.checked ? true : false;

    titleInput.value = "";
    authorInput.value = "";
    pagesInput.value = ""
    readInput.checked = false;

    if (newTitle !== "" && newAuthor !== "" && newPages !== "") {
        addBookToLibrary(newTitle, newAuthor, newPages, read);
        // TODO: append new book rather than reset.
        bookshelf.innerHTML = "";
        updateBookshelf();
    }
})

bookshelf.addEventListener("click", (e) => {
    const parentID = e.target.parentElement.id;
    let index = 0;
    for (let i = 0; i < library.length; i++) {
        if (library[i].id === parentID) {
            index = i;
        }
    }

    if(e.target.className === "remove-book") {
        library.splice(index, 1);
        e.target.parentElement.remove();
    } else if (e.target.className.includes("read")) {
        // TODO: Move to prototype
        if (e.target.className.includes("true")) {
            library[index].read = false;
            e.target.classList.remove("true");
            e.target.classList.add("false");
            e.target.textContent = "Not read";
        } else if (e.target.className.includes("false")) {
            library[index].read = true;
            e.target.classList.remove("false");
            e.target.classList.add("true");
            e.target.textContent = "Read";
        }
    }
})