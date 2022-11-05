import { updateBook } from "../../store/book-actions";
import { useAppDispatch } from "../../hooks/useStore";

import styles from "./RateItem.module.css";
import starIcon from "../../assets/svg/star-svgrepo-com.svg";

type AppProps = {
  rate: number;
  book: CompleteBook;
  isColored: boolean;
};

const Rate = ({ rate, book, isColored }: AppProps) => {
  const dispatch = useAppDispatch();

  const updateBookHandler = async () => {
    const status: Status = { ...book.status, rate: rate };
    const updatedBook: CompleteBook = { ...book, status };
    await dispatch(updateBook(updatedBook));
  };
  return (
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
};

export default Rate;
