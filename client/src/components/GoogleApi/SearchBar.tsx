import React, {FormEvent, Fragment, useRef} from 'react';

import useGoogleApi from '../../hooks/useGoogleApi';
import styles from './SearchBar.module.css';
import Book from '../Book/Book';

// type AppProps = {
//
// };

const SearchBar = () => {
    const searchTextRef = useRef<HTMLInputElement>(null);
    const searchTypeRef = useRef<HTMLSelectElement>(null);

    const {searchBooksGoogleApi, booksResult, errorMessage} = useGoogleApi();

    const searchHandler = async (e: FormEvent) => {
        e.preventDefault();
        if (searchTextRef.current && searchTypeRef.current) {
            const text = searchTextRef.current.value;
            const type = searchTypeRef.current.value;
            await searchBooksGoogleApi(text, type);
        }
    };

    let books = null;
// If any book is found
    if (Array.isArray(booksResult)) {
        books = booksResult.map(book => {
            let id;
            let num = Math.floor(Math.random() * (100000 * 100000));
            // some ids and isbn from googleApi are repeated making the app crash, the 'key' need to be unique!
            // this is why a random number is being added.
            if (Array.isArray(book.isbn)) {
                id = book.isbn[0].identifier + num;
            } else {
                id = book.id + num;
            }
            // only books with images will be returned.
            if (book.imageLinks) {
                return <Book key={id} book={book}/>;
            } else { // if no image is found
                return null;
            }
        });
    }

    return <Fragment>
        <form action="" id="searchForm" onSubmit={searchHandler}>
            <label htmlFor="searchType">Search by:</label>
            <select ref={searchTypeRef} id="searchType" name="searchType">
                <option value="title">Title</option>
                <option value="author">Author</option>
                <option value="all">All</option>
            </select>

            <label htmlFor="search">Search Bar</label>
            <input ref={searchTextRef} type="text" name="search" id="search"/>

            <button className={styles.form__button} form="searchForm" type="submit"
            >Search
            </button>
        </form>

        {books ? <div className={styles.book__list}>{books}</div> : null}
        {errorMessage ? <div className={styles.error__message}>{errorMessage}</div> : null}
    </Fragment>;


};

export default SearchBar;