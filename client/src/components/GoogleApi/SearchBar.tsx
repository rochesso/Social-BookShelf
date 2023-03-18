import { FormEvent, useRef } from "react";

import useGoogleApi from "../../hooks/useGoogleApi";
import styles from "./SearchBar.module.css";
import searchIcon from "../../assets/svg/search.svg";
import clearIcon from "../../assets/svg/close.svg";

const SearchBar = () => {
  const searchTextRef = useRef<HTMLInputElement>(null);
  const searchTypeRef = useRef<HTMLSelectElement>(null);

  const { searchBooksGoogleApi } = useGoogleApi();

  const searchHandler = async (e: FormEvent) => {
    e.preventDefault();
    if (searchTextRef.current && searchTypeRef.current) {
      const text = searchTextRef.current.value;
      const type = searchTypeRef.current.value;
      await searchBooksGoogleApi(text, type);
    }
  };

  const clearSearch = () => {
    if (searchTextRef.current) {
      searchTextRef.current.value = "";
      searchTextRef.current.focus();
    }
  };

  return (
    <form className={styles.form} id="searchForm" onSubmit={searchHandler}>
      <div className={styles.type}>
        <label className={styles.type__label} htmlFor="searchType">
          Search Type
        </label>
        <select
          className={styles.type__select}
          ref={searchTypeRef}
          id="searchType"
          name="searchType"
          defaultValue="all"
        >
          <option value="default" disabled>
            Search by:
          </option>
          <option value="all">All</option>
          <option value="title">Title</option>
          <option value="author">Author</option>
          <option value="isbn">Isbn</option>
        </select>
      </div>
      <div className={styles.search}>
        <label className={styles.search__label} htmlFor="search">
          Search for a book
        </label>
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
        <div className={styles.search__clear}>
          <img
            className={styles.search__clearIcon}
            src={clearIcon}
            alt="Cross"
            onClick={clearSearch}
          />
        </div>
      </div>

      <button
        className={styles.form__button}
        form="searchForm"
        type="submit"
        id="searchFormButton"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;
