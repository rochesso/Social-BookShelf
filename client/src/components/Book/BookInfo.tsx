import styles from "./BookInfo.module.css";

type AppProps = {
  book: CompleteBook;
};

const BookInfo = ({ book }: AppProps) => {
  const { authors, title, categories, pageCount } = book;

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

  return (
    <div className={styles.information}>
      <h3 className={styles.information__title}>{titleString}</h3>
      <h4 className={styles.information__authors}>{authorsString}</h4>
      <p className={styles.information__categories}>{categories}</p>
      <p className={styles.information__pageCount}>{pageCount} pages</p>
    </div>
  );
};

export default BookInfo;
