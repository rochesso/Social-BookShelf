import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/useStore";
import { searchMyLibrary } from "../../store/book-actions";

import BookList from "../../components/Book/BookList";

import styles from "./MyLibrary.module.css";

const MyLibrary = () => {
  const dispatch = useAppDispatch();
  const BookStore = useAppSelector((state) => state.bookStore);

  useEffect(() => {
    dispatch(searchMyLibrary("", "all"));
  }, [dispatch]);

  const books = BookStore.filteredBooks;

  return (
    <main className={styles.container}>
      <BookList bookList={books} from={"user"} />
    </main>
  );
};

export default MyLibrary;
