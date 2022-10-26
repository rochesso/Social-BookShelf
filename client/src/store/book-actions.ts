import axios from "axios";
import { bookActions } from "./book-slice";
import { googleSearchBooksActions } from "./googleSearchBooks-slice";

const API_URL = process.env.REACT_APP_API_URL;

export const fetchBooks = () => {
  return async (dispatch: (arg: any) => void) => {
    const fetchData = async () => {
      const response = await axios.get(`${API_URL}/user/books`);
      return response.data;
    };

    try {
      const booksData: CompleteBook[] = await fetchData();
      dispatch(bookActions.replaceBooks(booksData));
    } catch (error) {
      //   dispatch(
      //     uiActions.showNotification({
      //       status: "error",
      //       title: "Error!",
      //       message: "Fetching cart data failed!",
      //     })
      //   );
    }
  };
};

export const addBook = (book: CompleteBook) => {
  return async (dispatch: (arg: any) => void) => {
    try {
      await axios.post(API_URL + "/user/books", { book });
      dispatch(googleSearchBooksActions.removeBook(book));
    } catch (error) {
      //   dispatch(
      //     uiActions.showNotification({
      //       status: "error",
      //       title: "Error!",
      //       message: "Fetching cart data failed!",
      //     })
      //   );
    }
  };
};

export const removeBook = (book: CompleteBook) => {
  return async (dispatch: (arg: any) => void) => {
    try {
      await axios.delete(API_URL + "/user/books/" + book._id);
      dispatch(bookActions.removeBook(book));
    } catch (error) {
      //   dispatch(
      //     uiActions.showNotification({
      //       status: "error",
      //       title: "Error!",
      //       message: "Fetching cart data failed!",
      //     })
      //   );
    }
  };
};

// const removeBook = useCallback(
//   async (book: CompleteBook) => {
//     const response = await httpRemoveBook(book);
//     const success = response.ok;
//     if (success) {
//       dispatch(bookActions.removeBook(book));
//     } else {
//     }
//   },
//   [dispatch]
// );

// const updateBook = useCallback(async (book: CompleteBook) => {
//   const response = await httpUpdateBook(book);
//   const success = response.ok;
//   if (success) {
//     console.log("book updated");
//     getAllBooks();
//   } else {
//     console.log("book not updated");
//   }
// }, []);
