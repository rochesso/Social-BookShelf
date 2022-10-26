import{FormEvent, Fragment, useRef} from 'react';

import { useAppSelector } from '../../hooks/useStore'
import useGoogleApi from '../../hooks/useGoogleApi';
import styles from './SearchBar.module.css';
import Book from '../Book/Book';

// type AppProps = {
//
// };

const SearchBar = () => {
    const searchBookStore = useAppSelector((state) => state.googleSearchBooksStore)
    const searchTextRef = useRef<HTMLInputElement>(null);
    const searchTypeRef = useRef<HTMLSelectElement>(null);

    const {searchBooksGoogleApi, errorMessage} = useGoogleApi();

    const searchHandler = async (e: FormEvent) => {
        e.preventDefault();
        if (searchTextRef.current && searchTypeRef.current) {
            const text = searchTextRef.current.value;
            const type = searchTypeRef.current.value;
            await searchBooksGoogleApi(text, type);
        }
    };

    let books = searchBookStore.searchedBooks.map(book => <Book key={book.googleId} book={book}/>);

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
        <p>{searchBookStore.totalQuantity}</p>
        {books ? <div className={styles.book__list}>{books}</div> : null}
        {errorMessage ? <div className={styles.error__message}>{errorMessage}</div> : null}
    </Fragment>;


};

export default SearchBar;