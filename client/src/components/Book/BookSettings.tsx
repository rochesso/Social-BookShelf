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

  const currentPageHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue: number = Number(event.target.value);
    setCurrentPage(newValue);
  };

  const isFavoriteHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsFavorite(!isFavorite);
  };

  const currentPageRef = useRef<HTMLInputElement>(null);
  const readingRef = useRef<HTMLSelectElement>(null);
  const favoriteRef = useRef<HTMLInputElement>(null);

  const updateBookHandler = async (e: FormEvent) => {
    e.preventDefault();

    if (currentPageRef.current && readingRef.current && favoriteRef.current) {
      const currentPage = currentPageRef.current.value;
      const isFavorite = favoriteRef.current.checked;
      let reading =
        (readingRef.current.value as unknown as "notStarted") ||
        "started" ||
        "finished" ||
        "gaveUp";

      if (reading === "notStarted" || "started" || "finished" || "gaveUp") {
        let config: Status = {
          currentPage: Number(currentPage),
          isFavorite: isFavorite,
          reading: reading,
        };
        const updatedBook = { ...book, status: config };
        await dispatch(updateBook(updatedBook));
        updatingBookHandler();
        dispatch(bookActions.updateBook(updatedBook));
        dispatch(bookActions.sortBooks(configStore.config.sortPreference));
      }
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
        <div>
          <input
            ref={favoriteRef}
            type="checkbox"
            name="isFavorite"
            checked={isFavorite}
            onChange={isFavoriteHandler}
          />
          <label htmlFor="isFavorite"> Favorite?</label>
        </div>

        <button
          className={styles.form__button}
          form={book.googleId}
          type="submit"
        >
          Submit
        </button>
      </form>
      <div onClick={removeBookHandler}>Remove</div>
    </div>
  );
};

export default BookSettings;
