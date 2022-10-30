import { FormEvent, Fragment, useRef } from "react";

import { useAppSelector } from "../../hooks/useStore";
import useGoogleApi from "../../hooks/useGoogleApi";
import styles from "./SearchBar.module.css";
import Book from "../Book/Book";
import searchIcon from "../../assets/svg/search.svg";

// type AppProps = {
//
// };

const SearchBar = () => {
  const searchBookStore = useAppSelector(
    (state) => state.googleSearchBooksStore
  );
  const searchTextRef = useRef<HTMLInputElement>(null);
  const searchTypeRef = useRef<HTMLSelectElement>(null);

  const { searchBooksGoogleApi, errorMessage } = useGoogleApi();

  const searchHandler = async (e: FormEvent) => {
    e.preventDefault();
    if (searchTextRef.current && searchTypeRef.current) {
      const text = searchTextRef.current.value;
      const type = searchTypeRef.current.value;
      await searchBooksGoogleApi(text, type);
    }
  };

  let books = searchBookStore.searchedBooks.map((book) => (
    <Book key={book.googleId} book={book} />
  ));

  return (
    <Fragment>
      <form className={styles.form} id="searchForm" onSubmit={searchHandler}>
        <div className={styles.type}>
          {/* <label htmlFor="searchType"></label> */}
          <select
            className={styles.type__select}
            ref={searchTypeRef}
            id="searchType"
            name="searchType"
            defaultValue="title"
          >
            <option value="default" disabled>
              Search by:
            </option>
            <option value="title">Title</option>
            <option value="author">Author</option>
            <option value="all">All</option>
          </select>
        </div>
        <div className={styles.search}>
          {/* <label htmlFor="search"></label> */}
          <div className={styles.search__icon}>
            <img
              className={styles.search__img}
              src={searchIcon}
              alt="Magnifying Glass."
            />
          </div>
          <input
            className={styles.search__input}
            ref={searchTextRef}
            placeholder="Search for your book!"
            type="text"
            name="search"
            id="search"
          />
        </div>

        <button className={styles.form__button} form="searchForm" type="submit">
          Search
        </button>
      </form>
    </Fragment>
  );
};

export default SearchBar;
