import BookInfo from "./BookInfo";
import BookSettings from "./BookSettings";
import useBookUpdating from "../../hooks/useBookUpdating";

import styles from "./Book.module.css";

import settingsIcon from "../../assets/svg/settings-svgrepo-com (1).svg";

type AppProps = {
  book: CompleteBook;
};

const Book = ({ book }: AppProps) => {
  const { imageLinks } = book;
  const { isUpdating, updatingBookHandler } = useBookUpdating();

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
    <div className={styles.container}>
      <img className={styles.cover} src={cover} alt="Book cover" />
      {isUpdating ? (
        <BookSettings book={book} updatingBookHandler={updatingBookHandler} />
      ) : (
        <BookInfo book={book} />
      )}
      {/* Button to add a book to your library */}
      <div className={styles.settings} onClick={updatingBookHandler}>
        <img
          className={styles.settings__img}
          src={settingsIcon}
          alt="Remove this book from your library!"
        />
      </div>
    </div>
  );
};
export default Book;
