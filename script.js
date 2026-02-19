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

const addBookToLibrary = function(title, author, pages, read, color) {
    const newBookID = crypto.randomUUID()
    let newBook = new Book(newBookID, title, author, pages, read);
    library.push(newBook);
    addBook(title, author, pages, read, color);
}

const addBook = (bookTitle, bookAuthor, bookPages, bookRead, bookCoverColor) => {
    const container = document.createElement("div");
    const pTitleHeader = document.createElement("p");
    const pTitleContent = document.createElement("p");
    const pAuthorHeader = document.createElement("p");
    const pAuthorContent = document.createElement("p");
    const pPagesHeader = document.createElement("p");
    const pPagesContent = document.createElement("p");
    const divBookRead = document.createElement("div");
    const removeBookBtn = document.createElement("button");

    container.id = crypto.randomUUID();
    container.classList.add("book");
    container.style.setProperty("--book-cover", bookCoverColor);

    pTitleHeader.classList.add("book-header");
    pTitleHeader.textContent = "Title:";
    container.appendChild(pTitleHeader);
    pTitleContent.textContent = `${bookTitle}`;
    container.appendChild(pTitleContent);

    pAuthorHeader.classList.add("book-header");
    pAuthorHeader.textContent = "Author:";
    container.appendChild(pAuthorHeader);
    pAuthorContent.textContent = `${bookAuthor}`;
    container.appendChild(pAuthorContent);

    pPagesHeader.classList.add("book-header");
    pPagesHeader.textContent = "Pages:";
    container.appendChild(pPagesHeader);
    pPagesContent.textContent = `${bookPages}`;
    container.appendChild(pPagesContent);

    divBookRead.classList.add("read");
    divBookRead.classList.add(bookRead);
    divBookRead.textContent = bookRead ? "Read" : "Not read";
    container.appendChild(divBookRead);

    removeBookBtn.classList.add("remove-book");
    removeBookBtn.textContent = `Remove`;
    container.appendChild(removeBookBtn);

    bookshelf.appendChild(container);
}

addBookBtn.addEventListener("click", (e)=>{
    e.preventDefault();
    let newTitle = titleInput.value;
    let newAuthor = authorInput.value;
    let newPages = pagesInput.value;
    let read = readInput.checked ? true : false;
    let color = "red";

    addBookToLibrary(newTitle, newAuthor, newPages, read, color);
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