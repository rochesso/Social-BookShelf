import plusIcon from "../../assets/svg/plus-white.png";
import styles from "./SearchedBook.module.css";
import { addBook } from "../../store/book-actions";
import { useAppDispatch, useAppSelector } from "../../hooks/useStore";
import { Navigate } from "react-router-dom";

const API_URL = process.env.REACT_APP_API_URL;

type AppProps = {
  book: CompleteBook;
};

const SearchedBook = ({ book }: AppProps) => {
  const userStore = useAppSelector((state) => state.userStore);
  const user = userStore.user;

  const { authors, title, categories, imageLinks, pageCount } = book;
  const dispatch = useAppDispatch();

  //check if author is too long
  let authorsString;
  if (authors) {
    if (Array.isArray(authors)) {
      if (authors.length > 1) {
        if (authors.join(", ").length > 50) {
          authorsString = [`${authors.join(", ").substring(0, 50)}...`];
        } else {
          authorsString = [`${authors.join(", ")}`];
        }
      } else {
        authorsString = authors;
      }
    }
  }

  // Check if the title is too long
  let titleString;
  if (title) {
    if (title.length > 50) {
      titleString = `${title.substring(0, 50)}...`;
    } else {
      titleString = `${title}`;
    }
  }

  // Check image available
  let cover: string = "null";
  if (imageLinks) {
    if (imageLinks.thumbnail) {
      cover = imageLinks.thumbnail;
    } else {
      cover = imageLinks.smallThumbnail;
    }
  }

  const addBookHandler = async () => {
    if (user) {
      dispatch(addBook({ ...book, isAdded: true }));
    } else {
      if (API_URL) {
        window.location.replace(API_URL + "/auth/google");
      }
    }
  };

  // const removeBookHandler = async () => {
  //     await removeBook(book);
  // }

  // const updateBookHandler = async () => {
  //     await updateBook({...book, status: {currentPage: 12, isFavorite: true, reading: 'started'}});
  // }

  return (
    <div className={styles.container}>
      <img className={styles.cover} src={cover} alt="Book cover" />
      <div className={styles.information}>
        <h3 className={styles.information__title}>{titleString}</h3>
        <h4 className={styles.information__authors}>{authorsString}</h4>
        <p className={styles.information__categories}>{categories}</p>
        <p className={styles.information__pageCount}>{pageCount} pages</p>
        {/* Button to add a book to your library */}
        <div className={styles.add} onClick={addBookHandler}>
          <img
            className={styles.add__img}
            src={plusIcon}
            alt="Add this book to your library!"
          />
          {/* <p className={styles.add__text}>A</p> */}
        </div>
      </div>
    </div>
  );
};
export default SearchedBook;
