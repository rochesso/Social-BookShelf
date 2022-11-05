import { Fragment } from "react";
import { useAppSelector } from "../../hooks/useStore";

import styles from "./BookList.module.css";

import Book from "./Book";
import Filter from "../Filter/Filter";
import SortingPreference from "../SortingPreference/SortingPreference";

const BookList = () => {
  const BookStore = useAppSelector((state) => state.bookStore);

  const books = BookStore.filteredBooks.map((book) => (
    <Book key={book.googleId} book={book} />
  ));

  return (
    <Fragment>
      <div className={styles.actions}>
        <Filter />
        <SortingPreference label={false} />
      </div>
      <div className={styles.container}>{books}</div>
    </Fragment>
  );
};

export default BookList;
