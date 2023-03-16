import { Fragment } from "react";
import { useAppSelector } from "../../hooks/useStore";

import styles from "./BookList.module.css";

import Book from "./Book";
import Filter from "../Filter/Filter";

import {
  searchMyLibrary,
  sortPreferenceAction,
} from "../../store/book-actions";
import {
  searchSocialLibrary,
  sortSocialAction,
} from "../../store/users-actions";

type AppProps = {
  bookList: CompleteBook[];
  from: "user" | "social";
};

const BookList = ({ bookList, from }: AppProps) => {
  const bookStore = useAppSelector((state) => state.bookStore);
  const usersStore = useAppSelector((state) => state.usersStore);

  let filter: JSX.Element = <ul></ul>;
  if (from === "user") {
    filter = (
      <Filter
        store={bookStore}
        searchAction={searchMyLibrary}
        sortAction={sortPreferenceAction}
      />
    );
  } else if (from === "social") {
    filter = (
      <Filter
        store={usersStore}
        searchAction={searchSocialLibrary}
        sortAction={sortSocialAction}
      />
    );
  }

  const books = bookList.map((book) => (
    <Book key={book.googleId} book={book} hasDelete={true} from={from} />
  ));

  return (
    <Fragment>
      <div className={styles.actions}>{filter}</div>
      <div className={styles.container}>{books}</div>
    </Fragment>
  );
};

export default BookList;
