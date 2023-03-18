import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/useStore";
import { searchMyLibrary } from "../../store/book-actions";

import BookList from "../../components/Book/BookList";

import styles from "./MyLibrary.module.css";
import PageTitle from "../../components/PageTitle/PageTitle";

const MyLibrary = () => {
  const dispatch = useAppDispatch();
  const BookStore = useAppSelector((state) => state.bookStore);

  useEffect(() => {
    dispatch(searchMyLibrary("", "all"));
  }, [dispatch]);

  const books = BookStore.filteredBooks;

  return (
    <main className={styles.container}>
      <PageTitle>Your Library</PageTitle>
      {books.length > 0 ? (
        <BookList bookList={books} from={"user"} />
      ) : (
        <p className={styles.warning}>
          What are you waiting to add a book?{" "}
          <NavLink className={styles.search} to={"/search"}>
            Click here
          </NavLink>{" "}
          to start!
        </p>
      )}
    </main>
  );
};

export default MyLibrary;
