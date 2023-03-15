import { Fragment } from "react";
import { useAppSelector } from "../../hooks/useStore";

import styles from "./BookList.module.css";

import Book from "./Book";
import Filter from "../Filter/Filter";
import SortingPreference from "../SortingPreference/SortingPreference";

import { searchMyLibrary } from "../../store/book-actions";
import { searchSocialLibrary } from "../../store/users-actions";

type AppProps = {
  bookList: CompleteBook[];
  from: "user" | "social";
};

const BookList = ({ bookList, from }: AppProps) => {
  const bookStore = useAppSelector((state) => state.bookStore);
  const usersStore = useAppSelector((state) => state.usersStore);

  let filter: JSX.Element = <ul></ul>;
  if (from === "user") {
    filter = <Filter store={bookStore} handler={searchMyLibrary} />;
  } else if (from === "social") {
    filter = <Filter store={usersStore} handler={searchSocialLibrary} />;
  }

  const books = bookList.map((book) => (
    <Book key={book.googleId} book={book} hasDelete={true} from={from} />
  ));

  return (
    <Fragment>
      <div className={styles.actions}>
        {filter}
        {from === "user" ? <SortingPreference /> : null}
      </div>
      <div className={styles.container}>{books}</div>
    </Fragment>
  );
};

export default BookList;
