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

const onLoadElementCreation = () => { //new book creation card will be handled by this javascript function to prevent book cards comes after

  //These items were initialized and declared globally before function revoked

  listItem.classList.add('add-new-book-card');
  bookList.appendChild(listItem);

  listItem.appendChild(listItemContent);
    
  
  plusIcon.classList.add('plus-icon');
  plusIcon.setAttribute('src', 'icons/plus.svg');
  listItemContent.appendChild(plusIcon);
    
  
  contentPara.textContent ='Add a new book';
  listItemContent.appendChild(contentPara);
}

const openBookCreateModal = () => { //hidden contents will be active when pushed new book create buttons
  bookCreateForm.reset() //values inside the form will be deleted if any..
  overlayWindow.classList.add('active')
  bookCreateModal.classList.add('active')
}

const closeBookCreateModal = () => { //active contents will be hidden again when pushed submit button or overlayWindow
  overlayWindow.classList.remove('active')
  bookCreateModal.classList.remove('active')
  errorMsg.classList.remove('active') //error message will be gone if any..
  errorMsg.textContent = '' //error message text will be gone if any..
}

const updateBooksContainer = () => { //update the book list everytime if any books created or removed
  resetBookList()
  for (let book of library.books) { // for loop of array of book objects
    createBookCard(book)
  }
  updateBookStatistics() //book statistics will be renewed
  onLoadElementCreation() //new book creation card comes after new book cards everytime
}

const resetBookList = () => { // resets the grid layout to prevent default abnormal events or things
  bookList.innerHTML = ''
}

const updateBookStatistics = () => { // function to keep and update book statistics dynamically
  let bookCount = 0;
  let readCount = 0;
  let pagesCount = 0;
  for(const book of library.books) {
      bookCount++
      if(book !== null && book.status === true) {
        readCount++;
        pagesCount += parseInt(book.pages); //making string data a number to prevent concatanation
      }
  }
  totalBooks.textContent = bookCount;
  totalPages.textContent = pagesCount;
  totalRead.textContent = readCount;
}

const createBookCard = (book) => { // function to create a bookcard by creating data, DOM, classes for styling

  //DOM Elements creation

  const bookCard = document.createElement('li');
  const deleteBookCardBtn = document.createElement('button')
  const cardTitle = document.createElement('h5');
  const cardAuthor = document.createElement('p')
  const cardPages = document.createElement('p')
  const cardStatusBtn = document.createElement('button')

  //Classes for styling
  bookCard.classList.add('book-card')
  cardTitle.classList.add('card-title')
  cardStatusBtn.classList.add('status-check-button')
  deleteBookCardBtn.classList.add('delete')

  //Function scope add event Listeners for newly created elements
  cardStatusBtn.addEventListener('click', toggleRead)
  deleteBookCardBtn.addEventListener('click', removeBookFromLibrary)

  //Card Texts
  cardTitle.textContent = `${book.title}`
  cardAuthor.textContent = `${book.author}`
  cardPages.textContent = `${book.pages}`

  //Classes and styling in different situations
  if (book.status) {
    bookCard.style.borderTopColor = ("green");
    cardStatusBtn.textContent = 'Read'
    cardStatusBtn.classList.add('status-button-green')

  } else {
    bookCard.style.borderTopColor = ("red");
    cardStatusBtn.textContent = 'Not Read'
    cardStatusBtn.classList.add('status-button-red')
  }

  //DOM Elements allocated
  bookList.appendChild(bookCard)
  bookCard.appendChild(deleteBookCardBtn)
  bookCard.appendChild(cardTitle)
  bookCard.appendChild(cardAuthor)
  bookCard.appendChild(cardPages)
  bookCard.appendChild(cardStatusBtn)
}

