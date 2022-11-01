import { Fragment } from "react";
import { useAppSelector } from "../../hooks/useStore";

import styles from "./BookList.module.css";

import Book from "./Book";
import Filter from "./Filter";

const BookList = () => {
  const BookStore = useAppSelector((state) => state.bookStore);

  const books = BookStore.filteredBooks.map((book) => (
    <Book key={book.googleId} book={book} />
  ));
  console.log("mybooklist");

  return (
    <Fragment>
      <Filter />
      <div className={styles.container}>{books}</div>
    </Fragment>
  );
};

export default BookList;
