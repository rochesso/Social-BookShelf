import { Fragment } from "react";
import { useAppSelector } from "../../hooks/useStore";
import styles from "./SearchList.module.css";

import SearchedBook from "../../components/GoogleApi/SearchedBook";

const SearchList = () => {
  const searchBookStore = useAppSelector(
    (state) => state.googleSearchBooksStore
  );
  let books = searchBookStore.searchedBooks.map((book) => (
    <SearchedBook key={book.googleId} book={book} />
  ));

  return (
    <Fragment>
      <div className={styles.container}>{books}</div>
    </Fragment>
  );
};

export default SearchList;
