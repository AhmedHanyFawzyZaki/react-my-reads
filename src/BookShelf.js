import React from 'react'
import Book from './Book'

class BookShelf extends React.Component {

    render() {
        var { name, books, onUpdateBook } = this.props;
        /**
         * convert name from camelCase to words
         */
        var result = name.replace( /([A-Z])/g, " $1" );
        var finalName = result.charAt(0).toUpperCase() + result.slice(1);
        return (
            <div>
                <div className="bookshelf">
                    <h2 className="bookshelf-title">{finalName}</h2>
                    <div className="bookshelf-books">
                        <ol className="books-grid">
                            {books.map((book) => (
                                <Book key={book.id} book={book} onUpdateBook={onUpdateBook}></Book>
                            ))}
                        </ol>
                    </div>
                </div>

            </div>
        )
    }

}

export default BookShelf