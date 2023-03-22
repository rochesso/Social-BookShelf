import { useState, memo, useCallback, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/useStore";
import { addBook } from "../../store/book-actions";
import { ReadingStatus } from "../../globals";
import { LazyLoadImage } from "react-lazy-load-image-component";

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

const Book = memo(({ book, hasDelete, from }: AppProps) => {
  const dispatch = useAppDispatch();

  const bookStore = useAppSelector((state) => state.bookStore);
  const userStore = useAppSelector((state) => state.userStore);
  const user = userStore.user;
  const userBooks = bookStore.books;

  const { imageLinks, status } = book;
  const [isUpdating, setIsUpdating] = useState(false);

  const updatingBookHandler = useCallback(() => {
    setIsUpdating((prevState) => !prevState);
  }, []);

  // used on the social page to add someone else's book to your library
  const addBookHandler = useCallback(async () => {
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
  }, [book, dispatch, user]);

  // Check if cover image is available
  let cover: string = "null";
  if (imageLinks) {
    if (imageLinks.thumbnail) {
      cover = imageLinks.thumbnail;
    } else {
      cover = imageLinks.smallThumbnail;
    }
  }

  // Check if you already has the book
  const hasTheBook = useMemo(
    () => userBooks.find((item) => item.googleId === book.googleId),
    [book.googleId, userBooks]
  );

  // Content to render
  const favoriteImage = status.isFavorite ? (
    <LazyLoadImage
      className={styles.favoriteIcon}
      src={favoriteIcon}
      alt="Favorite icon, heart."
      loading="lazy"
    />
  ) : null;

  const coverImage = (
    <LazyLoadImage
      className={styles.cover}
      src={cover}
      alt="Book cover"
      loading="lazy"
    />
  );

  const sideContent = isUpdating ? (
    <BookSettings
      hasDelete={hasDelete}
      book={book}
      updatingBookHandler={updatingBookHandler}
    />
  ) : (
    <BookInfo book={book} from={from} />
  );

  const settingsGear = (
    <div className={styles.settings} onClick={updatingBookHandler}>
      <LazyLoadImage
        className={styles.settings__img}
        src={settingsIcon}
        alt="Settings icon!"
        loading="lazy"
      />
    </div>
  );

  const plusButton = (
    <div className={styles.add} onClick={addBookHandler}>
      <LazyLoadImage
        className={styles.add__img}
        src={plusIcon}
        alt="Add this book to your library!"
        loading="lazy"
      />
    </div>
  );

  return (
    <div className={styles.book}>
      {/* Favorite heart icon */}
      {favoriteImage}
      <div className={styles.container}>
        {coverImage}
        {sideContent}
        {/* Button to open the form to updated a book */}
        {/* or if in social page add button */}
        {from === "user" ? settingsGear : hasTheBook ? null : plusButton}
      </div>
    </div>
  );
});
export default Book;
