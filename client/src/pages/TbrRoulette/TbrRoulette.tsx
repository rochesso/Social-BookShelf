import { useState } from "react";
import { ReadingStatus } from "../../globals";
import Book from "../../components/Book/Book";
import { useAppSelector } from "../../hooks/useStore";

import styles from "./TbrRoulette.module.css";

const TbrRoulette = () => {
  const bookStore = useAppSelector((state) => state.bookStore);
  const books: CompleteBook[] = bookStore.filteredBooks;
  const [chosenBookIndex, setChosenBookIndex] = useState<number>();
  let bookToReadIndex: number;
  let rouletteBookIndexToRead: () => void = () => {};

  if (Array.isArray(books)) {
    if (
      (books.length > 0 &&
        books.some(
          (book) => book.status.reading === ReadingStatus.notStarted
        )) ||
      books.some((book) => book.status.reading === ReadingStatus.started)
    ) {
      const randomBookIndex = (books: CompleteBook[]) => {
        return Math.floor(Math.random() * books.length);
      };
      const tbrRouletteFunction = () => {
        bookToReadIndex = randomBookIndex(books);
        while (
          books[bookToReadIndex].status.reading === ReadingStatus.finished ||
          books[bookToReadIndex].status.reading === ReadingStatus.gaveUp
        ) {
          bookToReadIndex = randomBookIndex(books);
        }
        return bookToReadIndex;
      };

      rouletteBookIndexToRead = () => {
        setChosenBookIndex(tbrRouletteFunction());
      };
    }
  }

  return (
    <main className={styles.container}>
      <button className={styles.button} onClick={rouletteBookIndexToRead}>
        Roulette a book to read!
      </button>
      {chosenBookIndex === 0 || chosenBookIndex ? (
        <Book hasDelete={false} book={books[chosenBookIndex]} from="user" />
      ) : null}
    </main>
  );
};

export default TbrRoulette;
