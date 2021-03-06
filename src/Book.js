import React from 'react'
import PropTypes from 'prop-types';

class Book extends React.Component {

    render() {

        const { book, onUpdateBook } = this.props;

        return (
            <li>
                <div className="book">
                    <div className="book-top">
                        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks && book.imageLinks.thumbnail})` }}></div>
                        <div className="book-shelf-changer">
                            <select value={book.shelf?book.shelf:'none'} onChange={(event) => onUpdateBook(book, event.target.value)}>
                                <option value="move" disabled>Move to...</option>
                                <option value="currentlyReading">Currently Reading</option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
                            </select>
                        </div>
                    </div>
                    <div className="book-title">{book.title}</div>
                    <div className="book-authors">{book.authors && book.authors.length > 0 && book.authors.map((author, i) => <label key={book.id + "_author_id_" + author}>{author}<br/></label>)}</div>
                </div>
            </li>
        )
    }

}

Book.propTypes = {
    book: PropTypes.object.isRequired,
    onUpdateBook: PropTypes.func.isRequired
};

export default Book