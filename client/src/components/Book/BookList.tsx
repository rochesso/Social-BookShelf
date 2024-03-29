import { useMemo, memo, useCallback } from "react";
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
  slice: number;
  initialSlice: number;
  setSlice: (value: number) => void;
};

const BookList = memo(
  ({ bookList, from, slice, setSlice, initialSlice }: AppProps) => {
    const bookStore = useAppSelector((state) => state.bookStore);
    const usersStore = useAppSelector((state) => state.usersStore);

    // Quantity of books to render as you scroll down
    const increment = 8;

    const [displayBooks, setDisplayBooks] = useState<JSX.Element[]>([]);
    const [hasMore, setHasMore] = useState<boolean>(true);

    const books: CompleteBook[] = useMemo(() => {
      if (from === "user") {
        return bookStore.filteredBooks;
      } else {
        return usersStore.filteredBooks;
      }
    }, [bookStore.filteredBooks, usersStore.filteredBooks, from]);

    const filter: JSX.Element = useMemo(() => {
      if (from === "user") {
        return (
          <Filter
            initialSlice={initialSlice}
            setSlice={setSlice}
            store={bookStore}
            searchAction={searchMyLibrary}
            sortAction={sortPreferenceAction}
          />
        );
      } else {
        return (
          <Filter
            initialSlice={initialSlice}
            setSlice={setSlice}
            store={usersStore}
            searchAction={searchSocialLibrary}
            sortAction={sortSocialAction}
          />
        );
      }
    }, [bookStore, from, usersStore, initialSlice, setSlice]);

    useEffect(() => {
      if (slice === initialSlice) {
        setDisplayBooks(
          books.slice(0, slice).map((book: CompleteBook) => (
            <LazyLoad key={book.googleId}>
              <Book book={book} hasDelete={true} from={from} />
            </LazyLoad>
          ))
        );
        // If you have less books than the initialSlice disable the scroll
        if (books.length <= initialSlice) {
          setHasMore(false);
          // If you have more books than the initialSlice enable the scroll
        } else {
          setHasMore(true);
        }
        // When you update a book it allows react to re-render the change
      } else {
        setDisplayBooks(
          books.slice(0, slice).map((book: CompleteBook) => (
            <LazyLoad key={book.googleId}>
              <Book book={book} hasDelete={true} from={from} />
            </LazyLoad>
          ))
        );
      }
    }, [books, from, slice, initialSlice]);

    // Functions used in the infinite scroll
    const nextSlice = useCallback(() => {
      return books.slice(slice, slice + increment).map((book: CompleteBook) => (
        <LazyLoad key={book.googleId}>
          <Book book={book} hasDelete={true} from={from} />
        </LazyLoad>
      ));
    }, [books, slice, from]);

    const addSlice = useCallback(() => {
      const newBooks = [...displayBooks, ...nextSlice()];
      setDisplayBooks(newBooks);

      setSlice(slice + increment);
      if (slice + increment >= books.length) {
        setHasMore(false);
      }
    }, [books.length, displayBooks, slice, nextSlice, setSlice]);

    // Content to render
    const bookListToRender = (
      <InfiniteScroll
        dataLength={displayBooks.length}
        scrollableTarget="scrollableTarget"
        next={addSlice}
        className={styles.books}
        scrollThreshold={0.8}
        hasMore={hasMore}
        loader={"Loading more Books..."}
      >
        {displayBooks}
      </InfiniteScroll>
    );

    const warning = <p className={styles.warning}>No books found!</p>;

    return (
      <section className={styles.container}>
        <div className={styles.actions}>{filter}</div>

        {bookList.length > 0 ? bookListToRender : warning}
      </section>
    );
  }
);

export default BookList;
