import { useAppSelector } from "../../hooks/useStore";
import LazyLoad from "react-lazy-load";
import InfiniteScroll from "react-infinite-scroll-component";

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
import { useEffect, useState } from "react";

type AppProps = {
  bookList: CompleteBook[];
  from: "user" | "social";
};

const BookList = ({ bookList, from }: AppProps) => {
  const bookStore = useAppSelector((state) => state.bookStore);
  const usersStore = useAppSelector((state) => state.usersStore);
  const books = bookStore.filteredBooks;

  const [slice, setSlice] = useState(10);
  const [displayBooks, setDisplayBooks] = useState<any[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(true);

  useEffect(() => {
    setDisplayBooks(
      books.slice(0, slice).map((book: CompleteBook) => (
        <LazyLoad>
          <Book key={book.googleId} book={book} hasDelete={true} from={from} />
        </LazyLoad>
      ))
    );
    if (books.length < 11) {
      setHasMore(false);
    } else {
      setHasMore(true);
    }
  }, [books, from, slice]);

  const addSlice = () => {
    setDisplayBooks([...displayBooks, ...nextSlice()]);

    setSlice(slice + 3);
    if (slice >= books.length) {
      setHasMore(false);
    }
  };

  const nextSlice = () => {
    return books.slice(slice, slice + 3).map((book: CompleteBook) => (
      <LazyLoad>
        <Book key={book.googleId} book={book} hasDelete={true} from={from} />
      </LazyLoad>
    ));
  };

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

  return (
    <section className={styles.container}>
      <div className={styles.actions}>{filter}</div>

      {bookList.length > 0 ? (
        <InfiniteScroll
          dataLength={displayBooks.length}
          scrollableTarget="scrollable-div"
          next={addSlice}
          className={styles.books}
          scrollThreshold={0.8}
          hasMore={hasMore}
          loader={"Loading more Books..."}
        >
          {displayBooks}
        </InfiniteScroll>
      ) : (
        <p className={styles.warning}>No books found</p>
      )}
    </section>
  );
};

export default BookList;
