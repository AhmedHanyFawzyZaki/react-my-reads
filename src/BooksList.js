import React from 'react'
import BookShelf from './BookShelf'

class BooksList extends React.Component {

    render() {
        const { books } = this.props;

        var shelves = {};

        books.forEach(book => {
            const shelfID = book.shelf;
            if (shelves[shelfID])
                shelves[shelfID].push(book);
            else
                shelves[shelfID] = [book];
        });
        /*Object.keys(shelves).map((name, books) => {
            console.log(shelves[name]);
        })*/
        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    {Object.keys(shelves).map((name, books) => (
                        <BookShelf key={name} name={name} books={shelves[name]}></BookShelf>
                    ))}
                </div>
                <div className="open-search">
                    <button onClick={() => this.setState({ showSearchPage: true })}>Add a book</button>
                </div>
            </div>
        )
    }

}

export default BooksList