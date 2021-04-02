import React from 'react'
import BooksList from './BooksList'
import Search from './Search'
import './App.css'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'

class BooksApp extends React.Component {

  state = {
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books: books });
    })
  }

  updateBook = (book, shelf) => {
    BooksAPI.update(book, shelf).then(() => {
      let currentBooks = [...this.state.books];

      let existedBook = currentBooks.find((b) => b.id === book.id)

      if(existedBook){
        existedBook.shelf = shelf;
        currentBooks = currentBooks.filter(b => b.id !== book.id);
        currentBooks.push(existedBook);
      } else {
        book.shelf = shelf;
        currentBooks.push(book);
      }

      this.setState({ books: currentBooks });
    })
  }

  render() {
    return (
      <div className="app">
        <Route path='/search' render={() => (
          <Search books={this.state.books} updateBook={this.updateBook} ></Search>
        )} />
        <Route exact path='/' render={() => (
          <BooksList books={this.state.books} updateBook={this.updateBook} ></BooksList>
        )} />
      </div>
    )
  }
}

export default BooksApp
