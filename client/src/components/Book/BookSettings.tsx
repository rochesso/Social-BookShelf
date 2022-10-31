import { FormEvent, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/useStore";
import { removeBook, updateBook, fetchBooks } from "../../store/book-actions";
import { fetchConfig } from "../../store/config-actions";
import { bookActions } from "../../store/book-slice";

import styles from "./BookSettings.module.css";

type AppProps = {
  book: CompleteBook;
  updatingBookHandler: () => void;
};

const BookSettings = ({ book, updatingBookHandler }: AppProps) => {
  const dispatch = useAppDispatch();
  const configStore = useAppSelector((state) => state.configStore);
  const [currentPage, setCurrentPage] = useState<number>(
    book.status.currentPage
  );
  const [isFavorite, setIsFavorite] = useState<boolean>(book.status.isFavorite);

  const currentPageRef = useRef<HTMLInputElement>(null);
  const readingRef = useRef<HTMLSelectElement>(null);
  const favoriteRef = useRef<HTMLInputElement>(null);

  const currentPageHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue: number = Number(event.target.value);
    if (newValue <= book.pageCount && newValue >= 0) {
      setCurrentPage(newValue);
    }
  };

  const isFavoriteHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsFavorite(!isFavorite);
  };

  const updateBookHandler = async (e: FormEvent) => {
    e.preventDefault();

    if (currentPageRef.current && readingRef.current && favoriteRef.current) {
      const currentPage = currentPageRef.current.value;
      const isFavorite = favoriteRef.current.checked;
      let reading = readingRef.current.value as unknown as
        | "notStarted"
        | "started"
        | "finished"
        | "gaveUp";
      let config: Status;
      if (reading == "gaveUp" && Number(currentPage) < book.pageCount) {
        config = {
          currentPage: Number(currentPage),
          isFavorite: isFavorite,
          reading: "gaveUp",
        };
      } else if (Number(currentPage) === book.pageCount) {
        config = {
          currentPage: Number(currentPage),
          isFavorite: isFavorite,
          reading: "finished",
        };
      } else if (Number(currentPage) > 0) {
        config = {
          currentPage: Number(currentPage),
          isFavorite: isFavorite,
          reading: "started",
        };
      } else if (Number(currentPage) === 0) {
        config = {
          currentPage: Number(currentPage),
          isFavorite: isFavorite,
          reading: "notStarted",
        };
      } else {
        config = { ...book.status };
      }
      const updatedBook = { ...book, status: config };
      await dispatch(updateBook(updatedBook));
      updatingBookHandler();
      dispatch(bookActions.updateBook(updatedBook));
      dispatch(bookActions.sortBooks(configStore.config.sortPreference));
    }
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
            ref={readingRef}
            id="readingStatus"
            name="readingStatus"
            defaultValue={book.status.reading}
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
            ref={currentPageRef}
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
            ref={favoriteRef}
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
