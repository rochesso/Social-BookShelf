import { useCallback } from "react";
import { httpAddBook, httpGetAllBooks, httpRemoveBook } from "./requests";
import { useAppSelector, useAppDispatch } from "../hooks/useStore";
import { bookActions } from "../store/book-slice";
import { searchBookGoogleActions } from "../store/searchBookGoogle-slice";

// Can be used as following:
// import useBooks from '../../hooks/useBooks';
// const {addBook} = useBooks();

function useBooks() {
  const dispatch = useAppDispatch();

  const addBook = useCallback(async (book: CompleteBook) => {
    const response = await httpAddBook(book);
    const success = response.ok;
    if (success) {
      console.log(response.message);
      dispatch(searchBookGoogleActions.removeBook(book));
    } else {
      console.log(response.message);
    }
  }, []);

  const removeBook = useCallback(async (book: CompleteBook) => {
    const response = await httpRemoveBook(book);
    const success = response.ok;
    if (success) {
      console.log(response.message);
      dispatch(bookActions.removeBook(book));
    } else {
      console.log(response.message);
    }
  }, []);

  const getAllBooks = useCallback(async () => {
    const response = await httpGetAllBooks();
    dispatch(bookActions.replaceBooks(response));
  }, []);

  return {
    addBook,
    getAllBooks,
    removeBook,
  };
}

export default useBooks;
