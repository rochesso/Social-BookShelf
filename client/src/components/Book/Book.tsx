import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/useStore";
import { addBook } from "../../store/book-actions";
import { ReadingStatus } from "../../globals";

import BookInfo from "./BookInfo";
import BookSettings from "./BookSettings";
import favoriteIcon from "../../assets/svg/lover-favorite-svgrepo-com.svg";
import plusIcon from "../../assets/svg/plus-white.png";

import styles from "./Book.module.css";

import settingsIcon from "../../assets/svg/settings-svgrepo-com (1).svg";

const API_URL = process.env.REACT_APP_API_URL;

type AppProps = {
  book: CompleteBook;
  hasDelete: boolean;
  from: string;
};

const Book = ({ book, hasDelete, from }: AppProps) => {
  const dispatch = useAppDispatch();

  const bookStore = useAppSelector((state) => state.bookStore);
  const userStore = useAppSelector((state) => state.userStore);
  const user = userStore.user;
  const userBooks = bookStore.books;

  const { imageLinks, status } = book;
  const [isUpdating, setIsUpdating] = useState(false);

  const updatingBookHandler = () => {
    setIsUpdating((prevState) => !prevState);
  };

  // used when on the social page to add someone else book to your library
  const addBookHandler = async () => {
    if (user) {
      const status = {
        currentPage: 0,
        isFavorite: false,
        rate: 0,
        reading: ReadingStatus.notStarted,
      };
      const newBook = { ...book, isAdded: true };
      dispatch(addBook({ ...newBook, status }));
    } else {
      if (API_URL) {
        window.location.replace(API_URL + "/auth/google");
      }
    }
  };

  // Check image available
  let cover: string = "null";
  if (imageLinks) {
    if (imageLinks.thumbnail) {
      cover = imageLinks.thumbnail;
    } else {
      cover = imageLinks.smallThumbnail;
    }
  }

  return (
    <div className={styles.book}>
      {/* Favorite heart icon */}
      {status.isFavorite ? (
        <img
          className={styles.favoriteIcon}
          src={favoriteIcon}
          alt="Favorite icon, heart."
        />
      ) : null}
      <div className={styles.container}>
        <img className={styles.cover} src={cover} alt="Book cover" />

        {isUpdating ? (
          <BookSettings
            hasDelete={hasDelete}
            book={book}
            updatingBookHandler={updatingBookHandler}
          />
        ) : (
          <BookInfo book={book} from={from} />
        )}
        {/* Button to open the form to updated a book */}
        {/* or if in social page add button */}
        {from === "user" ? (
          <div className={styles.settings} onClick={updatingBookHandler}>
            <img
              className={styles.settings__img}
              src={settingsIcon}
              alt="Settings icon!"
            />
          </div>
        ) : userBooks.find((item) => item.googleId === book.googleId) ? null : (
          <div className={styles.add} onClick={addBookHandler}>
            <img
              className={styles.add__img}
              src={plusIcon}
              alt="Add this book to your library!"
            />
          </div>
        )}
      </div>
    </div>
  );
};
export default Book;
