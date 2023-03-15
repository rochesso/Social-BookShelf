import { updateBook } from "../../store/book-actions";
import { useAppDispatch } from "../../hooks/useStore";

import styles from "./RateItem.module.css";
import starIcon from "../../assets/svg/star-svgrepo-com.svg";
import { Fragment } from "react";

type AppProps = {
  rate: number;
  book: CompleteBook;
  isColored: boolean;
  from: string;
};

const RateItem = ({ rate, book, isColored, from }: AppProps) => {
  const dispatch = useAppDispatch();

  const updateBookHandler = async () => {
    const status: Status = { ...book.status, rate: rate };
    const updatedBook: CompleteBook = { ...book, status };
    await dispatch(updateBook(updatedBook));
  };

  // When you are on the social page the ability to click on a start needs to be removed
  let content;
  if (from === "user") {
    content = (
      <img
        onClick={updateBookHandler}
        className={
          isColored
            ? `${styles.star} ${styles.star__colored}`
            : `${styles.star} ${styles.star__black}`
        }
        src={starIcon}
        alt="Rate stars."
      />
    );
    // When on a social page
  } else {
    content = (
      <img
        className={
          isColored
            ? `${styles.starSocial} ${styles.starSocial__colored}`
            : `${styles.starSocial} ${styles.starSocial__black}`
        }
        src={starIcon}
        alt="Rate stars."
      />
    );
  }

  return <Fragment>{content}</Fragment>;
};

export default RateItem;
