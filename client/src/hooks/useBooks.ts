import { useCallback } from "react";
import {
  httpAddBook,
  httpGetAllBooks,
  httpRemoveBook,
  httpUpdateBook,
} from "./requests";
import { useAppDispatch } from "../hooks/useStore";
import { bookActions } from "../store/book-slice";
import { googleSearchBooksActions } from "../store/googleSearchBooks-slice";

// Can be used as following:
// import useBooks from '../../hooks/useBooks';
// const {addBook} = useBooks();

function useBooks() {
  const dispatch = useAppDispatch();

  const addBook = useCallback(
    async (book: CompleteBook) => {
      const response = await httpAddBook(book);
      const success = response.ok;
      if (success) {
        dispatch(googleSearchBooksActions.removeBook(book));
      } else {
      }
    },
    [dispatch]
  );

  const removeBook = useCallback(
    async (book: CompleteBook) => {
      const response = await httpRemoveBook(book);
      const success = response.ok;
      if (success) {
        dispatch(bookActions.removeBook(book));
      } else {
      }
    },
    [dispatch]
  );

  const updateBook = useCallback(async (book: CompleteBook) => {
    const response = await httpUpdateBook(book);
    const success = response.ok;
    if (success) {
      console.log("book updated");
      getAllBooks();
    } else {
      console.log("book not updated");
    }
  }, []);

  const getAllBooks = useCallback(async () => {
    const response = await httpGetAllBooks();
    dispatch(bookActions.replaceBooks(response));
  }, [dispatch]);

  return {
    addBook,
    getAllBooks,
    removeBook,
    updateBook,
  };
}

export default useBooks;
