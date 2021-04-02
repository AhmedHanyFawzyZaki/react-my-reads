import React from 'react'
import BookShelf from './BookShelf'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';

class BooksList extends React.Component {

    render() {

        const books = this.props.books;
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
                        name !== "none" && <BookShelf key={name} onUpdateBook={this.props.updateBook} name={name} books={shelves[name]}></BookShelf>
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

BooksList.propTypes = {
    books: PropTypes.array.isRequired,
    updateBook: PropTypes.func.isRequired
};

export default BooksList