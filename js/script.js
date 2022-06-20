// CLASS CONSTRUCTORS

class Book { //class constructor for books
  constructor(
    title = 'Unknown',
    author = 'Unknown',
    pages = '0',
    status = false //boolean for status
  ) {
    this.title = title
    this.author = author
    this.pages = pages
    this.status = status
  }
}

class Library { //class constructor for library
  constructor() {
    this.books = [] //empty array of books
  }

  getBook(title) { //is used to revoke functions outside the class to find the exact book
    return this.books.find((book) => book.title === title)
  }

  addBook(newBook) { //is used to revoke functions outside the class in order to add new books to the library
    if (!this.searchInLibrary(newBook)) {
      this.books.push(newBook)
    }
  }

  removeBook(title) { // is used to revoke functions outside the class in order to remove books from the library
    this.books = this.books.filter((book) => book.title !== title)
  }

  searchInLibrary(newBook) { // is used to revoke functions outside the class in order to make comparisons
    return this.books.some((book) => book.title === newBook.title)
  }

  deleteBooksInLibrary() { // is used to revoke functions outside the class in order to COMPLETELY remove ALL books from the library
    this.books = [];
  }
}

const library = new Library()

//Global Element creations for onload and function revokes

const listItem = document.createElement('li');
const listItemContent = document.createElement('a');
const plusIcon = document.createElement('img');
const contentPara = document.createElement('p');

//GLOBAL UI DECLARATIONS

const bookList = document.getElementById('book-list');
const searchInput = document.getElementById('search');
const newBookBtn = document.getElementById('new-book-create-button');
const deleteLibraryBtn = document.getElementById('header-button-del');
const changeModeBtn = document.getElementById('display-mode-button');
const bookCreateForm = document.getElementById('book-create-form');
const overlayWindow = document.getElementById('overlayWindow');
const bookCreateModal = document.getElementById('book-create-modal');
const errorMsg = document.getElementById('error-message');
const submitBtn = document.getElementById('submit-button');
const totalBooks = document.getElementById('total-books');
const totalRead = document.getElementById('read-books');
const totalPages = document.getElementById('total-pages');