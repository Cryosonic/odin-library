const bookshelf = document.querySelector(".bookshelf");
const titleInput = document.getElementById("title");
const authorInput = document.getElementById("author");
const pagesInput = document.getElementById("pages");
const readInput = document.getElementById("read");
// const colorSelector = 
const addBookBtn = document.getElementById("add-book-button");

const library = [
    {
        id: crypto.randomUUID(),
        title: "Harry Potter",
        author: "J.K. Rowling",
        pages: "500",
        read: true,
        coverColor: "white",
        toggleRead: function() {
            if (this.read) {
                this.read = false;
            } else if (!this.read) {
                this.read = true;
            }
        }
    },{
        id: crypto.randomUUID(),
        title: "Lord of the Rings",
        author: "J.R.R. Tolken",
        pages: "500",
        read: false,
        coverColor: "white",
        toggleRead: function() {
            if (this.read) {
                this.read = false;
            } else if (!this.read) {
                this.read = true;
            }
        }
    }
];

function Book(id, title, author, pages, read, coverColor) {
    if (!new.target) {
        throw Error("new word must be used");
    }
    this.id = id;
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.cover = coverColor
};

Book.prototype.toggleRead = function() {
    console.log(`Read switched from ${this.read} to ${!this.read}`);
    if (this.read) {
        this.read = false;
    } else if (!this.read) {
        this.read = true;
    }
}

const addBook = (bookID, bookTitle, bookAuthor, bookPages, bookRead, bookCoverColor) => {
    const container = document.createElement("div");
    const pTitleHeader = document.createElement("p");
    const pTitleContent = document.createElement("p");
    const pAuthorHeader = document.createElement("p");
    const pAuthorContent = document.createElement("p");
    const pPagesHeader = document.createElement("p");
    const pPagesContent = document.createElement("p");
    const divBookRead = document.createElement("div");
    const removeBookBtn = document.createElement("button");

    container.id = bookID;
    container.classList.add("book");

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

    container.style.setProperty("--book-cover", bookCoverColor);
    
    removeBookBtn.classList.add("remove-book");
    removeBookBtn.textContent = `Remove`;
    container.appendChild(removeBookBtn);

    bookshelf.appendChild(container);
}

const initiatePage = () => {
    library.forEach(book=>{
        addBook(book.id, book.title, book.author, book.pages, book.read, book.coverColor);
    })
}

initiatePage();

const addBookToLibrary = function(title, author, pages, read, color) {
    const newBookID = crypto.randomUUID()
    let newBook = new Book(newBookID, title, author, pages, read);
    library.push(newBook);
    addBook(newBookID, title, author, pages, read, color);
}

const checkCorrectInputs = (title, author, pages) => {
    const fractionalPages = pages - Math.round(pages)

    if (title.length < 1 || title.length > 40) {
        alert("Please enter between 2 to 40 characters for book title.")
        return false;
    } else if ( author.length < 1 || author.length > 40) {
        alert("Please enter between 2 to 40 characters for Author name")
        return false;
    } else if (isNaN(pages)) {
        alert("Please enter a number for number of pages")
        return false;
    } else if (Number(pages) < 1 || Number(pages) > 1000){
        alert("Please enter between 1 to 1000 for number of pages")
        return false;
    } else if (fractionalPages !== 0) {
        alert("Please enter whole number for number of pages")
        return false;
    } else {
        return true;
    }
}

addBookBtn.addEventListener("click", (e)=>{
    e.preventDefault();
    let newTitle = titleInput.value;
    let newAuthor = authorInput.value;
    let newPages = pagesInput.value;
    let read = readInput.checked ? true : false;
    let color = "red";

    if (checkCorrectInputs(newTitle, newAuthor, newPages)) {
        addBookToLibrary(newTitle, newAuthor, newPages, read, color);
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
        if (library[index].read) {
            e.target.classList.remove("true");
            e.target.classList.add("false");
            e.target.textContent = "Not read";
        } else {
            e.target.classList.remove("false");
            e.target.classList.add("true");
            e.target.textContent = "Read";
        }
        library[index].toggleRead();
    }
})