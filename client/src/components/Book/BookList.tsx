import { Fragment } from "react";
import { useAppSelector } from "../../hooks/useStore";
import styles from "./BookList.module.css";

import Book from "../../components/Book/Book";

const BookList = () => {
  const BookStore = useAppSelector((state) => state.bookStore);
  const books = BookStore.books.map((book) => (
    <Book key={book.googleId} book={book} />
  ));

  return (
    <Fragment>
      <div className={styles.container}>{books}</div>
    </Fragment>
  );
};

export default BookList;
