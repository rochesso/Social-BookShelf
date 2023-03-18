import { FormEvent, useState } from "react";
import { useAppDispatch } from "../../hooks/useStore";
import { removeBook, updateBook } from "../../store/book-actions";
import { ReadingStatus } from "../../globals";

import styles from "./BookSettings.module.css";

type AppProps = {
  book: CompleteBook;
  updatingBookHandler: () => void;
  hasDelete: boolean;
};

const BookSettings = ({ book, updatingBookHandler, hasDelete }: AppProps) => {
  const dispatch = useAppDispatch();
  const [currentPage, setCurrentPage] = useState(book.status.currentPage);
  const [isFavorite, setIsFavorite] = useState(book.status.isFavorite);
  const [readingStatus, setReadingStatus] = useState(book.status.reading);

  const currentPageHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(event.target.value);
    if (newValue <= book.pageCount && newValue >= 0) {
      switch (true) {
        case newValue === 0:
          setCurrentPage(newValue);
          setReadingStatus(ReadingStatus.notStarted);
          break;
        case newValue === book.pageCount:
          setCurrentPage(newValue);
          setReadingStatus(ReadingStatus.finished);
          break;
        case newValue > 0:
          setCurrentPage(newValue);
          setReadingStatus(ReadingStatus.started);
      }
    }
  };

  const isFavoriteHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsFavorite((prevState) => !prevState);
  };

  const readingStatusHandler = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newValue = event.target.value as unknown as ReadingStatus;
    switch (newValue) {
      case ReadingStatus.gaveUp:
        if (Number(currentPage) < book.pageCount) {
          setReadingStatus(newValue);
        }
        break;
      case ReadingStatus.finished:
        setReadingStatus(newValue);
        if (book.pageCount > 0) {
          setCurrentPage(book.pageCount);
        }
        break;
      case ReadingStatus.notStarted:
        setReadingStatus(newValue);
        setCurrentPage(0);
        break;
      case ReadingStatus.started:
        if (Number(currentPage) < book.pageCount) {
          setReadingStatus(newValue);
        }
        break;
    }
  };

  const updateBookHandler = async (e: FormEvent) => {
    e.preventDefault();
    const config = {
      currentPage: currentPage,
      isFavorite: isFavorite,
      reading: readingStatus,
      rate: book.status.rate,
    };
    const updatedBook = { ...book, status: config };
    updatingBookHandler();
    await dispatch(updateBook(updatedBook));
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
          <label htmlFor={`${book.googleId}_readingStatus`}>
            Reading Status
          </label>
          <select
            className={styles.reading__select}
            id={`${book.googleId}_readingStatus`}
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
          <label htmlFor={`${book.googleId}_currentPage`}>Current Page</label>
          <input
            className={styles.currentPage__input}
            placeholder="Type your current page!"
            type="number"
            name="currentPage"
            id={`${book.googleId}_currentPage`}
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
            id={`${book.googleId}_isFavorite`}
          />
          <label
            className={styles.favorite__label}
            htmlFor={`${book.googleId}_isFavorite`}
          >
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
          {hasDelete ? (
            <button
              className={`${styles.actions__button} ${styles["actions__button--red"]}`}
              onClick={removeBookHandler}
              type="button"
            >
              Delete
            </button>
          ) : null}
        </div>
      </form>
    </div>
  );
};

export default BookSettings;
