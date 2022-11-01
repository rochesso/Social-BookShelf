import { FormEvent, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/useStore";
import { removeBook, updateBook } from "../../store/book-actions";
import { bookActions } from "../../store/book-slice";

import styles from "./BookSettings.module.css";

type AppProps = {
  book: CompleteBook;
  updatingBookHandler: () => void;
};

const BookSettings = ({ book, updatingBookHandler }: AppProps) => {
  const dispatch = useAppDispatch();
  const configStore = useAppSelector((state) => state.configStore);
  const [currentPage, setCurrentPage] = useState(book.status.currentPage);
  const [isFavorite, setIsFavorite] = useState(book.status.isFavorite);
  const [readingStatus, setReadingStatus] = useState(book.status.reading);

  const currentPageHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(event.target.value);
    if (newValue <= book.pageCount && newValue >= 0) {
      switch (true) {
        case newValue === 0:
          setCurrentPage(newValue);
          setReadingStatus("notStarted");
          break;
        case newValue === book.pageCount:
          setCurrentPage(newValue);
          setReadingStatus("finished");
          break;
        case newValue > 0:
          setCurrentPage(newValue);
          setReadingStatus("started");
      }
    }
  };

  const isFavoriteHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsFavorite((prevState) => !prevState);
  };

  const readingStatusHandler = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newValue = event.target.value as Status["reading"];
    switch (newValue) {
      case "gaveUp":
        if (Number(currentPage) < book.pageCount) {
          setReadingStatus(newValue);
        }
        break;
      case "finished":
        setReadingStatus(newValue);
        setCurrentPage(book.pageCount);
        break;
      case "notStarted":
        setReadingStatus(newValue);
        setCurrentPage(0);
        break;
      case "started":
        setReadingStatus(newValue);
        break;
    }
  };

  const updateBookHandler = async (e: FormEvent) => {
    e.preventDefault();
    const config = {
      currentPage: currentPage,
      isFavorite: isFavorite,
      reading: readingStatus,
    };
    const updatedBook = { ...book, status: config };
    await dispatch(updateBook(updatedBook));
    updatingBookHandler();
    dispatch(bookActions.updateBook(updatedBook));
    dispatch(bookActions.sortBooks(configStore.config.sortPreference));
  };

  const removeBookHandler = async () => {
    await dispatch(removeBook(book));
  };

  return (
    <div>
      <form
        className={styles.form}
        id={book.googleId}
        onSubmit={updateBookHandler}
      >
        <div className={styles.reading}>
          <label htmlFor="readingStatus">Reading Status</label>
          <select
            className={styles.reading__select}
            id="readingStatus"
            name="readingStatus"
            value={readingStatus}
            onChange={readingStatusHandler}
          >
            <option value="notStarted">Not Started</option>
            <option value="started">Started</option>
            <option value="finished">Finished</option>
            <option value="gaveUp">Gave up</option>
          </select>
        </div>

        <div className={styles.currentPage}>
          <label htmlFor="currentPage">Current Page</label>
          <input
            className={styles.currentPage__input}
            placeholder="Type your current page!"
            type="number"
            name="currentPage"
            id="currentPage"
            value={currentPage}
            onChange={currentPageHandler}
          />
        </div>
        <div className={styles.favorite}>
          <input
            className={styles.favorite__checkbox}
            type="checkbox"
            name="isFavorite"
            checked={isFavorite}
            onChange={isFavoriteHandler}
          />
          <label className={styles.favorite__label} htmlFor="isFavorite">
            {" "}
            Favorite?
          </label>
        </div>
        <div className={styles.actions}>
          <button
            className={styles.actions__button}
            form={book.googleId}
            type="submit"
          >
            Submit
          </button>
          <button
            className={`${styles.actions__button} ${styles["actions__button--red"]}`}
            onClick={removeBookHandler}
          >
            Delete
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookSettings;
