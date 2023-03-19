import axios, { AxiosError } from "axios";
import { SortPreferences } from "../globals";
import { bookActions } from "./book-slice";
import { googleSearchBooksActions } from "./googleSearchBooks-slice";
import { userActions } from "./user-slice";
import { friendsActions } from "./friends-slice";

const API_URL = process.env.REACT_APP_API_URL;

export const fetchUserData = () => {
  return async (dispatch: (arg: any) => void) => {
    const fetchData = async () => {
      const response = await axios.get(`${API_URL}/user/data`);
      return response;
    };

    try {
      const response = await fetchData();
      switch (Number(response.status)) {
        case 200:
          dispatch(bookActions.fetchedDataToggle(true));
          const booksData: CompleteBook[] = response.data.books;
          const configData: Config = response.data.config;
          const friendsData: User[] = response.data.friends;
          dispatch(bookActions.setSortPreference(configData.sortPreference));
          dispatch(bookActions.replaceBooks(booksData));
          dispatch(friendsActions.replaceFriends(friendsData));
          dispatch(bookActions.getFilters());
          dispatch(bookActions.sortBooks());
          break;
      }
    } catch (error) {
      const axiosError = error as AxiosError;
      const axiosErrorStatus = axiosError.response?.status;
      switch (axiosErrorStatus) {
        case 401:
          dispatch(userActions.logoutUser());
          break;
      }
    }
  };
};

export const addBook = (book: CompleteBook) => {
  return async (dispatch: (arg: any) => void) => {
    try {
      dispatch(bookActions.addBook(book));
      dispatch(googleSearchBooksActions.removeBook(book));
      const response = await axios.post(API_URL + "/user/books", { book });
      switch (Number(response.status)) {
        case 201:
          // dispatch(fetchUserData());
          dispatch(bookActions.getFilters());
          dispatch(bookActions.sortBooks());
          break;
      }
    } catch (error) {
      dispatch(googleSearchBooksActions.addBook(book));
      dispatch(bookActions.removeBook(book));
      const axiosError = error as AxiosError;
      const axiosErrorStatus = axiosError.response?.status;
      switch (axiosErrorStatus) {
        case 401:
          dispatch(userActions.logoutUser());
          break;
      }
    }
  };
};

export const removeBook = (book: CompleteBook) => {
  return async (dispatch: (arg: any) => void) => {
    try {
      dispatch(bookActions.removeBook(book));
      const response = await axios.delete(API_URL + "/user/books/" + book._id);
      switch (Number(response.status)) {
        case 200:
          dispatch(bookActions.getFilters());
          break;
      }
    } catch (error) {
      dispatch(bookActions.addBook(book));
      const axiosError = error as AxiosError;
      const axiosErrorStatus = axiosError.response?.status;
      switch (axiosErrorStatus) {
        case 401:
          dispatch(userActions.logoutUser());
          break;
        case 400:
          dispatch(fetchUserData());
          break;
      }
    }
  };
};

export const updateBook = (book: CompleteBook) => {
  return async (dispatch: (arg: any) => void) => {
    try {
      dispatch(bookActions.updateBook(book));
      const response = await axios.patch(API_URL + "/user/books/", { book });
      switch (Number(response.status)) {
        case 200:
          dispatch(bookActions.getFilters());
          break;
      }
    } catch (error) {
      const axiosError = error as AxiosError;
      const axiosErrorStatus = axiosError.response?.status;
      switch (axiosErrorStatus) {
        case 401:
          dispatch(userActions.logoutUser());
          break;
      }
    }
  };
};

export const filterBooks = (filter: Filter) => {
  return async (dispatch: (arg: any) => void) => {
    dispatch(bookActions.filterBooks(filter));
  };
};

export const searchMyLibrary = (search: string, filter: Filter) => {
  return async (dispatch: (arg: any) => void) => {
    dispatch(bookActions.filterBooks(filter));
    dispatch(bookActions.searchMyLibrary(search));
    dispatch(bookActions.sortBooks());
  };
};

export const sortPreferenceAction = (preference: SortPreferences) => {
  return async (dispatch: (arg: any) => void) => {
    try {
      const sortPreference: Config["sortPreference"] = preference;
      dispatch(bookActions.setSortPreference(preference));
      dispatch(bookActions.sortBooks());
      const response = await axios.patch(API_URL + "/user/config", {
        sortPreference,
      });
      switch (Number(response.status)) {
        case 200:
          return true;
      }
    } catch (error) {
      const axiosError = error as AxiosError;
      const axiosErrorStatus = axiosError.response?.status;
      switch (axiosErrorStatus) {
        case 401:
          dispatch(userActions.logoutUser());
          return false;
      }
    }
  };
};
