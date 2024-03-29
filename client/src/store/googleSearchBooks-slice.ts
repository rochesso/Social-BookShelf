import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define a type for the slice state
interface bookState {
  searchedBooks: CompleteBook[];
  totalQuantity: number;
  isSearching: boolean;
}

// Define the initial state using that type
const initialState: bookState = {
  isSearching: false,
  searchedBooks: [],
  totalQuantity: 0,
};

const googleSearchBooksSlice = createSlice({
  name: "googleSearchBooksStore",
  initialState,
  reducers: {
    isSearchingToggle(state, action: PayloadAction<boolean>) {
      state.isSearching = action.payload;
    },
    replaceBooks(state, action: PayloadAction<CompleteBook[]>) {
      const books = action.payload;
      if (books.length >= 0) {
        state.searchedBooks = books;
        state.totalQuantity = books.length;
      }
    },
    addBook(state, action: PayloadAction<CompleteBook>) {
      const newBook = action.payload;
      const existingBook = state.searchedBooks.some(
        (item) => item.googleId === newBook.googleId
      );
      if (!existingBook) {
        state.searchedBooks.push(newBook);
        state.totalQuantity++;
      } else {
        return console.log("Book already exists!");
      }
    },
    removeBook(state, action: PayloadAction<CompleteBook>) {
      const book = action.payload;
      const existingBook = state.searchedBooks.some(
        (item) => item.googleId === book.googleId
      );
      if (existingBook) {
        state.searchedBooks = state.searchedBooks.filter(
          (item) => item.googleId !== book.googleId
        );
        state.totalQuantity--;
      } else {
        return undefined;
      }
    },
  },
});

export const googleSearchBooksActions = googleSearchBooksSlice.actions;

export default googleSearchBooksSlice;
