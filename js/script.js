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