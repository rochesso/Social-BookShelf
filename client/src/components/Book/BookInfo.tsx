import bookshelfIcon from "../../assets/svg/shelf-svgrepo-com.svg";
import doneIcon from "../../assets/svg/done.svg";
import notDoneIcon from "../../assets/svg/close.svg";

import ProgressBar from "./ProgressBar";
import Rate from "./Rate";
import ReadingStatusComponent from "./ReadingStatus";

import styles from "./BookInfo.module.css";
import { ReadingStatus } from "../../globals";

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
      case ReadingStatus.notStarted:
        return (
          <ReadingStatusComponent icon={bookshelfIcon} text="Time to Start!" />
        );
      case ReadingStatus.started:
        return (
          <ProgressBar currentPage={status.currentPage} pageCount={pageCount} />
        );
      case ReadingStatus.finished:
        return <ReadingStatusComponent icon={doneIcon} text="Congrats!" />;

      case ReadingStatus.gaveUp:
        return (
          <ReadingStatusComponent icon={notDoneIcon} text="Another Try?" />
        );

      default:
      // code block
    }
  };

  return (
    <div className={styles.information}>
      <h3 className={styles.information__title}>{titleString}</h3>
      <h4 className={styles.information__authors}>{authorsString}</h4>
      {content()}
      <Rate book={book} />
      <p className={styles.information__categories}>{categories}</p>
      <p className={styles.information__pageCount}>{pageCount} pages</p>
    </div>
  );
};

export default BookInfo;
