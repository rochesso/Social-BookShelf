import styles from "./BookInfo.module.css";
import bookShelf from "../../assets/svg/shelf-svgrepo-com.svg";
import ProgressBar from "./ProgressBar";

type AppProps = {
  book: CompleteBook;
};

const BookInfo = ({ book }: AppProps) => {
  const { authors, title, categories, pageCount, status } = book;
  const reading = status.reading;

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
  const content = () => {
    switch (reading) {
      case "notStarted":
        return (
          <img className={styles.bookShelf} src={bookShelf} alt="Bookshelf" />
        );
      case "started":
        return (
          <ProgressBar currentPage={status.currentPage} pageCount={pageCount} />
        );
      case "finished":
        return <p>Finished!</p>;
      case "gaveUp":
        return <p>Gave up!</p>;

      default:
      // code block
    }
  };

  return (
    <div className={styles.information}>
      <h3 className={styles.information__title}>{titleString}</h3>
      <h4 className={styles.information__authors}>{authorsString}</h4>
      {content()}
      <p className={styles.information__categories}>{categories}</p>
      <p className={styles.information__pageCount}>{pageCount} pages</p>
    </div>
  );
};

export default BookInfo;
