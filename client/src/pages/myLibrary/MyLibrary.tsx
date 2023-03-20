import { useEffect } from "react";
import LazyLoad from "react-lazy-load";

import { NavLink } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../hooks/useStore";

import { searchMyLibrary } from "../../store/book-actions";

import BookList from "../../components/Book/BookList";

import styles from "./MyLibrary.module.css";
import PageTitle from "../../components/PageTitle/PageTitle";
import Loading from "../../components/Loading/Loading";

const MyLibrary = () => {
  const bookStore = useAppSelector((state) => state.bookStore);
  const dispatch = useAppDispatch();

  const filteredBooks = bookStore.filteredBooks;
  const books = bookStore.books;

  useEffect(() => {
    const getData = async () => {
      await dispatch(searchMyLibrary("", "all"));
    };
    getData();
  }, [dispatch]);

  return (
    <main className={styles.container}>
      <PageTitle>Your Library</PageTitle>
      {bookStore.fetchedData ? (
        books.length > 0 ? (
          <LazyLoad>
            <BookList bookList={filteredBooks} from={"user"} />
          </LazyLoad>
        ) : (
          <p className={styles.warning}>
            What are you waiting to add a book?{" "}
            <NavLink className={styles.search} to={"/search"}>
              Click here
            </NavLink>{" "}
            to start!
          </p>
        )
      ) : (
        <Loading />
      )}
    </main>
  );
};

export default MyLibrary;
