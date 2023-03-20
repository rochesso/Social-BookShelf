import plusIcon from "../../assets/svg/plus-white.png";
import styles from "./SearchedBook.module.css";
import { addBook } from "../../store/book-actions";
import { useAppDispatch, useAppSelector } from "../../hooks/useStore";

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
  let authorsString: string[] = [];
  if (authors) {
    if (Array.isArray(authors)) {
      if (authors.join(", ").length > 40) {
        authorsString = [`${authors.join(", ").substring(0, 40)}...`];
      } else {
        authorsString = authors;
      }
    }
  }

  const authorsToShow = authorsString.map((author) => {
    const searchByThisAuthor = async () => {
      const searchType: HTMLSelectElement = document.getElementById(
        "searchType"
      ) as HTMLSelectElement;

      const search: HTMLInputElement = document.getElementById(
        "search"
      ) as HTMLInputElement;

      const formButton = document.getElementById(
        "searchFormButton"
      ) as HTMLFormElement;

      search.value = author;
      searchType.value = "author";
      formButton.click();
    };
    return (
      <span className={styles.author} key={author} onClick={searchByThisAuthor}>
        {author}
      </span>
    );
  });

  // Check if the title is too long
  let titleString;
  if (title) {
    if (title.length > 40) {
      titleString = `${title.substring(0, 40)}...`;
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
      await dispatch(addBook({ ...book, isAdded: true }));
    } else {
      if (API_URL) {
        window.location.replace(API_URL + "/auth/google");
      }
    }
  };

  return (
    <div className={styles.container}>
      <img className={styles.cover} src={cover} alt="Book cover" />
      <div className={styles.information}>
        <h4 className={styles.information__title}>{titleString}</h4>
        <h5 className={styles.information__authors}>{authorsToShow}</h5>
        <p className={styles.information__categories}>{categories}</p>

        <p className={styles.information__pageCount}>
          {pageCount ? pageCount : 0} pages
        </p>

        {/* Button to add a book to your library */}
        <div className={styles.add} onClick={addBookHandler}>
          <img
            className={styles.add__img}
            src={plusIcon}
            alt="Add this book to your library!"
          />
        </div>
      </div>
    </div>
  );
};
export default SearchedBook;
