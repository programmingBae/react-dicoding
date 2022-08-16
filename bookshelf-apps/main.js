const books = [];
const RENDER_EVENT = 'render-bookshelf';
const RENDER_EVENT_BY_SEARCH = 'render-bookshelf-filtered';
let filteredBooks = [];


document.addEventListener('DOMContentLoaded', function () {
    const submitForm = document.getElementById('inputBook');
    submitForm.addEventListener('submit', function (event) {
        event.preventDefault();
        addBook();
    });

    const searchBookForm = document.getElementById('searchBook');
    searchBookForm.addEventListener('submit', function (event) {
        event.preventDefault();
        searchBook();   
    });

    if (isStorageExist()) {
        loadDataFromStorage();
    }
});

function searchBook(){
    const title = document.getElementById('searchBookTitle').value;
    findBookByTitle(title);
}

function findBookByTitle(bookTitle) {
    filteredBooks = books.filter(book => book.title.toLowerCase().includes(bookTitle.toLowerCase()));
    if (bookTitle != ""){
        document.dispatchEvent(new Event(RENDER_EVENT_BY_SEARCH));
    } else {
        document.dispatchEvent(new Event(RENDER_EVENT));
    }
   
}

document.addEventListener(RENDER_EVENT_BY_SEARCH, function () {
    const uncompletedBookList = document.getElementById('incompleteBookshelfList');
    uncompletedBookList.innerHTML = '';

    const completedBookList = document.getElementById('completeBookshelfList');
    completedBookList.innerHTML = '';

    for (const bookItem of filteredBooks) {
        const bookElement = makeBook(bookItem);
        if (!bookItem.isCompleted)
            uncompletedBookList.append(bookElement);
        else
            completeBookshelfList.append(bookElement);
    }
});

function addBook() {
    const title = document.getElementById('inputBookTitle').value;
    const author = document.getElementById('inputBookAuthor').value;
    const year = document.getElementById('inputBookYear').value;
    const isCompleted = document.getElementById('inputBookIsComplete').checked;


    const generatedID = generateId();
    const bookObject = generateBookObject(generatedID, title, author, year, isCompleted);
    books.push(bookObject);

    document.dispatchEvent(new Event(RENDER_EVENT));
    saveData();
}

function generateId() {
    return +new Date();
}

function generateBookObject(id, title, author, year, isCompleted) {
    return {
        id,
        title,
        author,
        year,
        isCompleted
    }
}

document.addEventListener(RENDER_EVENT, function () {
    const uncompletedBookList = document.getElementById('incompleteBookshelfList');
    uncompletedBookList.innerHTML = '';

    const completedBookList = document.getElementById('completeBookshelfList');
    completedBookList.innerHTML = '';

    for (const bookItem of books) {
        const bookElement = makeBook(bookItem);
        if (!bookItem.isCompleted)
            uncompletedBookList.append(bookElement);
        else
            completeBookshelfList.append(bookElement);
    }
});

function makeBook(bookObject) {
    const textTitle = document.createElement('h3');
    textTitle.innerText = bookObject.title;

    const textAuthor = document.createElement('p');
    textAuthor.innerText = bookObject.author;

    const textYear = document.createElement('p');
    textYear.innerText = bookObject.year;

    const container = document.createElement('article');
    container.classList.add('book_item');
    container.append(textTitle, textAuthor, textYear);
    container.setAttribute('id', `book-${bookObject.id}`);

    if (bookObject.isCompleted) {
        const undoButton = document.createElement('button');
        undoButton.classList.add('green');
        undoButton.innerText = "Belum Selesai Dibaca";


        undoButton.addEventListener('click', function () {
            undoBookFromCompleted(bookObject.id);
        });

        const deleteButton = document.createElement('button');
        deleteButton.classList.add('red');
        deleteButton.innerText = "Hapus Buku";

        deleteButton.addEventListener('click', function () {
            removeBookFromArray(bookObject.id);
        });

        const buttonContainer = document.createElement('div');
        buttonContainer.classList.add('action');
        buttonContainer.append(undoButton, deleteButton);
        container.append(buttonContainer);
    } else {
        const addBookToCompletedButton = document.createElement('button');
        addBookToCompletedButton.classList.add('green');
        addBookToCompletedButton.innerText = "Selesai Dibaca";

        addBookToCompletedButton.addEventListener('click', function () {
            addBookToCompleted(bookObject.id);
        });


        const deleteButton = document.createElement('button');
        deleteButton.classList.add('red');
        deleteButton.innerText = "Hapus Buku";

        deleteButton.addEventListener('click', function () {
            removeBookFromArray(bookObject.id);
        });

        const buttonContainer = document.createElement('div');
        buttonContainer.classList.add('action');
        buttonContainer.append(addBookToCompletedButton, deleteButton);
        container.append(buttonContainer);
    }

    return container;
}

function addBookToCompleted(bookId) {
    let confirmPrompt = confirm("Pindahkan buku ke Rak Buku Selesai Dibaca (?)");
    if (confirmPrompt){
        const bookTarget = findBook(bookId);

        if (bookTarget == null) return;
    
        bookTarget.isCompleted = true;
        document.dispatchEvent(new Event(RENDER_EVENT));
        saveData();
    }
}

function findBook(bookId) {
    for (const bookItem of books) {
        if (bookItem.id === bookId) {
            return bookItem;
        }
    }
    return null;
}

function undoBookFromCompleted(bookId) {
    let confirmPrompt = confirm("Pindahkan buku ke Rak Buku Belum Selesai Dibaca (?)");
    if (confirmPrompt){
        const bookTarget = findBook(bookId);

        if (bookTarget == null) return;
    
        bookTarget.isCompleted = false;
        document.dispatchEvent(new Event(RENDER_EVENT));
        saveData();
    }
}

function findBookIndex(bookId) {
    for (const index in books) {
        if (books[index].id === bookId) {
            return index;
        }
    }

    return -1;
}

function removeBookFromArray(bookId) {
    let confirmPrompt = confirm("Hapus Buku(?)");
    if (confirmPrompt){
        const bookTarget = findBookIndex(bookId);

        if (bookTarget === -1) return;
    
        books.splice(bookTarget, 1);
        document.dispatchEvent(new Event(RENDER_EVENT));
        saveData();
    }
}



function saveData() {
    if (isStorageExist()) {
        const parsed = JSON.stringify(books);
        localStorage.setItem(STORAGE_KEY, parsed);
        document.dispatchEvent(new Event(SAVED_EVENT));
    }
}


const SAVED_EVENT = 'saved-books';
const STORAGE_KEY = 'BOOKS_APPS';

function isStorageExist() /* boolean */ {
    if (typeof (Storage) === undefined) {
        alert('Browser kamu tidak mendukung local storage');
        return false;
    }
    return true;
}


document.addEventListener(SAVED_EVENT, function () {
    console.log(localStorage.getItem(STORAGE_KEY));
});



function loadDataFromStorage() {
    const serializedData = localStorage.getItem(STORAGE_KEY);
    let data = JSON.parse(serializedData);

    if (data !== null) {
        for (const book of data) {
            books.push(book);
        }
    }

    document.dispatchEvent(new Event(RENDER_EVENT));
}