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
  cardStatusBtn.addEventListener('click', toggleRead) // function to change read status of book card
  deleteBookCardBtn.addEventListener('click', removeBookFromLibrary) // function to remove the card from the library

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

const toggleRead = (e) => { // function to change read status of a chosen book dynamically
  const title = e.target.parentNode.firstChild.nextSibling.innerHTML; //find the exact place of card title compared to pushed element of cardStatusBtn
  const book = library.getBook(title) //a static function inside the library will be revoked to have the exact book at book list
  book.status = !book.status //changing status
  saveInLocalStore() // saving books to call again and again when the web page refreshed or reopened
  updateBooksContainer() //updating the library
}

const removeBookFromLibrary = (e) => { //function to remove a chosen book from the library
  const title = e.target.nextSibling.innerHTML //find the exact place of card title compared to pushed element of deleteBookCardBtn
  Swal.fire({ // a special embedded function to have a customized alert box with better UI and styling
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire(
        'Deleted!',
        'Your file has been deleted.',
        'success'
      )
      library.removeBook(title) //a static function inside the library will be revoked to remove the exact book at book list
      saveInLocalStore() // saving books to call again and again when the web page refreshed or reopened
      updateBooksContainer() //updating the library
    }
  })
}

const addBookToLibrary = (e) => { // a function to add a newly created book into the library
  e.preventDefault() // prevent to create unwanted docs accidentally
  const newBook = getBookByInput() // book data will be called by another function

  if(title.value === '' || author.value === '' || pages.value==='') { // preventing to add a new book with missing data or blank page
    Swal.fire({  //a special embedded function to have a customized alert box with better UI and styling
      icon: 'error',
      title: 'Warning',
      text: 'Please enter all values!'
    })
    return;
    } if (pages.value <= '0') {
      Swal.fire({
        icon: 'error',
        title: 'Warning',
        text: 'Please enter at least a positive integer!'
      })
    return;
  }

  if (library.searchInLibrary(newBook)) { //a static function inside the library will be revoked to search in the library
    errorMsg.textContent = 'This book is already in your library'
    errorMsg.classList.add('active')
    return
  }

  Swal.fire({ //a special embedded function to have a customized alert box with better UI and styling
    position: 'top-end',
    icon: 'success',
    title: 'Your book has been saved',
    showConfirmButton: false,
    timer: 1500
  })

  library.addBook(newBook); //a static function inside the library will be revoked to add a new book in the library
  saveInLocalStore(); // saving books to call again and again when the web page refreshed or reopened
  updateBooksContainer(); //updating the library
  closeBookCreateModal(); //book create form will be closed when completed
}

const getBookByInput = () => { // a function to keep the data  entered in book form to be revoked by another function
  const title = document.getElementById('title').value
  const author = document.getElementById('author').value
  const pages = document.getElementById('pages').value
  const status = document.getElementById('checkBox').checked
  return new Book(title, author, pages, status)
}

const deleteAllBooks = () => { // a function to delete ALL books in the library by pushing delete library button
  
  Swal.fire({ //a special embedded function to have a customized alert box with better UI and styling
    title: 'Are you sure?',
    text: "Your library will be COMPLETELY deleted!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'No, cancel!',
    reverseButtons: true
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire( //a special embedded function to have a customized alert box with better UI and styling
        'Deleted!',
        'Your file has been deleted.',
        'success'
      )
      library.deleteBooksInLibrary() //a static function inside the library will be revoked to delete ALL BOOKS in the library
      saveInLocalStore() // saving books to call again and again when the web page refreshed or reopened
      updateBooksContainer() //updating the library
    } else if (
      result.dismiss === Swal.DismissReason.cancel
    ) {
      Swal.fire( //a special embedded function to have a customized alert box with better UI and styling
        'Cancelled',
        'Your library is safe :)',
        'error'
      )
    }
  })
}

const searchBookName = () => { // a function to search for a book in the library by Search Input at header section
  let searchValue = document.getElementById('search').value.toUpperCase(); // turning into a standart letter case to prevent errors
  let bookList = document.getElementById('book-list');
  let book = bookList.querySelectorAll('li.book-card');

  for(let i=0; i < book.length; i++) {
    let bookTitle = book[i].getElementsByTagName('h5')[0];
    if(bookTitle.innerHTML.toUpperCase().indexOf(searchValue) > -1) {
      book[i].style.display = '';
    } else {
      book[i].style.display = 'none';
    }
  }
}

const checkZero = () => { //a function preventing the user enter multiple 0's
  const value = document.getElementById("pages").value;
  if(value.startsWith('0')){
    document.getElementById("pages").value = '0';
  }
}

const toggleMode = () => { // a function to change mode when pressed into the changeModeBtn (gets darker when light and gets lighter when dark)
  const bodyDarkElement = document.body;
  bodyDarkElement.classList.toggle("dark-mode");
}

//LOCAL STORE FUNCTIONS

const saveInLocalStore = () => { // a function to save locally to loose entered books in the library when page refreshed
  localStorage.setItem('library', JSON.stringify(library.books))
}
  
const JSONToBook = (book) => { //JSON keeps books as a string and this function will return arrays of books to keep in local library
  return new Book(book.title, book.author, book.pages, book.status)
}

const restoreInLocalStore = () => { //a function to restore locally when requested
  const books = JSON.parse(localStorage.getItem('library'))
  if (books) {
    library.books = books.map((book) => JSONToBook(book))
  } else {
    library.books = []
  }
}

/*----------end of local store----------------*/


//EVENT LISTENERS

newBookBtn.addEventListener('click', openBookCreateModal);

deleteLibraryBtn.addEventListener('click', deleteAllBooks);

changeModeBtn.addEventListener('click', toggleMode);

overlayWindow.addEventListener('click', closeBookCreateModal);

plusIcon.addEventListener('click', openBookCreateModal);

submitBtn.addEventListener('click', addBookToLibrary);

searchInput.addEventListener('keyup', searchBookName);

window.addEventListener('DOMContentLoaded', restoreInLocalStore);

window.addEventListener('DOMContentLoaded', updateBooksContainer);

window.onload = onLoadElementCreation;