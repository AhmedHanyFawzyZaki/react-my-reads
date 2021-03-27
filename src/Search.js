import React from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Book from './Book'
import { debounce } from 'throttle-debounce';


class Search extends React.Component {

    state = {
        text: '',
        books: []
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

    doSearch = (q) => {

        BooksAPI.search(q).then((books) => {
            this.setState({ text: q, books: books });
        })

    };


    updateQuery = debounce(500, function (query) {
        query = query.trim();
        if (query.length > 0) {
            this.doSearch(query);
        } else {
            this.setState({ text: '', books: [] })
        }
    });

    render() {
        const { text, books } = this.state;
        //console.log(books)
        return (
            <div className="search-books" >
                <div className="search-books-bar">
                    <Link to="/" className="close-search">Close</Link>
                    <div className="search-books-input-wrapper">
                        {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                        <input
                            type="text"
                            placeholder="Search by title or author"
                            onChange={(event) => this.updateQuery(event.target.value)}
                        />

                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {books.length > 0 && books.map((book) => (
                            <Book key={book.id} book={book} onUpdateBook={this.updateBook}></Book>
                        ))}
                    </ol>
                </div>
            </div>
        )
    }

}

export default Search