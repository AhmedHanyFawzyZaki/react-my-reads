import React from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Book from './Book'
import { debounce } from 'throttle-debounce';
import PropTypes from 'prop-types';


class Search extends React.Component {

    state = {
        searchList: []
    }

    onUpdateBook = (book, shelf) => {
        const searchBooks = [...this.state.searchList];
        let targetBooks = searchBooks.map((b) => {
            if (b.id === book.id && b.shelf === book.shelf) {
                b.shelf = shelf;
            }
            return b;
        })

        this.setState({ searchList: targetBooks });
        this.props.updateBook(book, shelf);
    }

    doSearch = (q) => {

        BooksAPI.search(q).then((books) => {
            this.setState({ searchList: books });
        })

    };


    updateQuery = debounce(500, function (query) {
        query = query.trim();
        if (query.length > 0) {
            this.doSearch(query);
        } else {
            this.setState({ searchList: [] })
        }
    });

    render() {
        const { searchList } = this.state;
        //console.log(books)
        return (
            <div className="search-books" >
                <div className="search-books-bar">
                    <Link to="/" className="close-search">Close</Link>
                    <div className="search-books-input-wrapper">
                        <input
                            type="text"
                            placeholder="Search by title or author"
                            onChange={(event) => this.updateQuery(event.target.value)}
                        />

                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {searchList.length > 0 && searchList.map((book) => {
                            //console.log(book.id);
                            let existedBook = this.props.books.find((b) => b.id === book.id)
                            if (existedBook)
                                book.shelf = existedBook.shelf
                            return <Book key={book.id} book={book} onUpdateBook={this.onUpdateBook}></Book>
                        })}
                    </ol>
                </div>
            </div>
        )
    }

}

Search.propTypes = {
    books: PropTypes.array.isRequired,
    updateBook: PropTypes.func.isRequired
};

export default Search