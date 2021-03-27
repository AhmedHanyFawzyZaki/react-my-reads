import React from 'react'
import BookShelf from './BookShelf'
import * as BooksAPI from './BooksAPI'
import { Link } from 'react-router-dom'

class BooksList extends React.Component {

    state = {
        books: []
    }

    componentDidMount() {
        BooksAPI.getAll().then((books) => {
            this.setState({ books })
        })
    }

    updateBook = (book, shelf) => {
        BooksAPI.update(book, shelf).then((updatedBooks) => {
            const currentBooks = [...this.state.books];
            let targetBooks = currentBooks.map((b) => {
                if (b.id === book.id && b.shelf === book.shelf) {
                    b.shelf = shelf;
                }
                return b;
            })
            this.setState({ books: targetBooks });
        })
    }



    render() {

        const books = this.state.books;
        const shelves = {};

        books.forEach(book => {
            const shelfID = book.shelf;
            if (shelves[shelfID])
                shelves[shelfID].push(book);
            else
                shelves[shelfID] = [book];
        });

        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    {Object.keys(shelves).map((name) => (
                        <BookShelf key={name} onUpdateBook={this.updateBook} name={name} books={shelves[name]}></BookShelf>
                    ))}
                </div>
                <div className="open-search">
                    <Link
                        to='/search'
                        className='open-search'
                    >Add a book</Link>
                </div>
            </div>
        )
    }

}

export default BooksList