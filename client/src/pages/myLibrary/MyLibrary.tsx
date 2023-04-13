import { useEffect, memo, useState, Fragment } from "react";
import LazyLoad from "react-lazy-load";

import { NavLink } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../hooks/useStore";

import { searchMyLibrary } from "../../store/book-actions";

import BookList from "../../components/Book/BookList";

import styles from "./MyLibrary.module.css";
import PageTitle from "../../components/PageTitle/PageTitle";
import Loading from "../../components/Loading/Loading";
import NavBottom from "../../components/NavBottom/NavBottom";

const MyLibrary = memo(() => {
  // Quantity of books that is showed on the initial render
  const initialSlice = 10;
  const [slice, setSlice] = useState(initialSlice);

  const bookStore = useAppSelector((state) => state.bookStore);
  const dispatch = useAppDispatch();

  const filteredBooks = bookStore.filteredBooks;
  const books = bookStore.books;

  useEffect(() => {
    const getData = async () => {
      setSlice(initialSlice);
      await dispatch(searchMyLibrary("", "all"));
    };
    getData();
  }, [dispatch]);

  const bookListToRender = (
    <LazyLoad>
      <BookList
        initialSlice={initialSlice}
        slice={slice}
        setSlice={setSlice}
        bookList={filteredBooks}
        from={"user"}
      />
    </LazyLoad>
  );

  const warning = (
    <p className={styles.warning}>
      What are you waiting for to add a book?{" "}
      <NavLink className={styles.search} to={"/search"}>
        Click here
      </NavLink>{" "}
      to add new books!
    </p>
  );

  return (
    <Fragment>
      <main className={styles.container}>
        <PageTitle>Your Library</PageTitle>
        {bookStore.fetchedData ? (
          books.length > 0 ? (
            bookListToRender
          ) : (
            warning
          )
        ) : (
          <Loading />
        )}
      </main>
      <NavBottom
        initialSlice={initialSlice}
        setSlice={setSlice}
        fromExplore={false}
      />
    </Fragment>
  );
});

export default MyLibrary;
