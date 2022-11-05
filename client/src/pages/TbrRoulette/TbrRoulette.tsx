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
    if (books.length > 0) {
      const randomBookIndex = (books: CompleteBook[]) => {
        return Math.floor(Math.random() * books.length);
      };
      const tbrRouletteFunction = () => {
        bookToReadIndex = randomBookIndex(books);
        while (
          books[bookToReadIndex].status.reading ===
          (ReadingStatus.finished || ReadingStatus.gaveUp)
        ) {
          bookToReadIndex = randomBookIndex(books);
        }
        console.log(bookToReadIndex);
        return bookToReadIndex;
      };

      rouletteBookIndexToRead = () => {
        setChosenBookIndex(tbrRouletteFunction());
      };
    }
  }

  return (
    <div className={styles.container}>
      <button onClick={rouletteBookIndexToRead}>
        Roulette a book to read!
      </button>
      {chosenBookIndex === 0 || chosenBookIndex ? (
        <Book book={books[chosenBookIndex]} />
      ) : null}
    </div>
  );
};

export default TbrRoulette;
