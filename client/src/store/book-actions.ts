import axios, { AxiosError } from "axios";
import { bookActions } from "./book-slice";
import { googleSearchBooksActions } from "./googleSearchBooks-slice";
import { userActions } from "./user-slice";

const API_URL = process.env.REACT_APP_API_URL;

export const fetchBooks = () => {
  return async (dispatch: (arg: any) => void) => {
    const fetchData = async () => {
      const response = await axios.get(`${API_URL}/user/books`);
      return response;
    };

    try {
      const response = await fetchData();
      switch (Number(response.status)) {
        case 200:
          const booksData: CompleteBook[] = response.data;
          dispatch(bookActions.replaceBooks(booksData));
          break;
        case 401:
          dispatch(userActions.logoutUser(true));
          break;
      }
    } catch (error) {
      const axiosError = error as AxiosError;
      const axiosErrorStatus = axiosError.response?.status;
      switch (axiosErrorStatus) {
        case 401:
          dispatch(userActions.logoutUser(true));
          break;
      }
    }
  };
};

export const addBook = (book: CompleteBook) => {
  return async (dispatch: (arg: any) => void) => {
    try {
      const response = await axios.post(API_URL + "/user/books", { book });
      switch (Number(response.status)) {
        case 201:
          dispatch(googleSearchBooksActions.removeBook(book));
          break;
        case 401:
          dispatch(userActions.logoutUser(true));
          break;
      }
    } catch (error) {
      const axiosError = error as AxiosError;
      const axiosErrorStatus = axiosError.response?.status;
      switch (axiosErrorStatus) {
        case 401:
          dispatch(userActions.logoutUser(true));
          break;
      }
    }
  };
};

export const removeBook = (book: CompleteBook) => {
  return async (dispatch: (arg: any) => void) => {
    try {
      const response = await axios.delete(API_URL + "/user/books/" + book._id);
      switch (Number(response.status)) {
        case 200:
          dispatch(bookActions.removeBook(book));
          break;
        case 401:
          dispatch(userActions.logoutUser(true));
          break;
      }
    } catch (error) {
      const axiosError = error as AxiosError;
      const axiosErrorStatus = axiosError.response?.status;
      switch (axiosErrorStatus) {
        case 401:
          dispatch(userActions.logoutUser(true));
          break;
      }
    }
  };
};

export const updateBook = (book: CompleteBook) => {
  return async (dispatch: (arg: any) => void) => {
    try {
      const response = await axios.patch(API_URL + "/user/books/", { book });
      switch (Number(response.status)) {
        case 200:
          break;
        case 401:
          dispatch(userActions.logoutUser(true));
          break;
      }
    } catch (error) {
      const axiosError = error as AxiosError;
      const axiosErrorStatus = axiosError.response?.status;
      switch (axiosErrorStatus) {
        case 401:
          dispatch(userActions.logoutUser(true));
          break;
      }
    }
  };
};
