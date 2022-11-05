import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SortPreferences } from "../globals";

// Define a type for the slice state
interface bookState {
  books: CompleteBook[];
  totalQuantity: number;
  filters: Filter[];
  filteredBooks: CompleteBook[];
  sortPreference: Config["sortPreference"];
}

// Define the initial state using that type
const initialState: bookState = {
  books: [],
  totalQuantity: 0,
  filters: [],
  filteredBooks: [],
  sortPreference:
    (sessionStorage.getItem("sortPreference") as SortPreferences) ||
    SortPreferences.title,
};

const bookSlice = createSlice({
  name: "configStore",
  initialState,
  reducers: {
    setSortPreference(state, action: PayloadAction<SortPreferences>) {
      state.sortPreference = action.payload;
      sessionStorage.setItem("sortPreference", action.payload);
    },
    getFilters(state) {
      const filters = Array.from(
        new Set(state.books.map((book) => book.status.reading))
      );
      if (filters.length > 1) {
        state.filters = [...filters, "all"];
      } else {
        state.filters = ["all"];
      }
    },
    replaceBooks(state, action: PayloadAction<CompleteBook[]>) {
      const books = action.payload;
      if (Array.isArray(books)) {
        if (books.length > 0) {
          state.books = books;
          state.filteredBooks = books;
          state.totalQuantity = books.length;
        }
      }
    },
    addBook(state, action: PayloadAction<CompleteBook>) {
      const date = new Date().toString();
      const newBook: CompleteBook = {
        ...action.payload,
        lastModified: date,
        timeAdded: date,
      };
      const existingBook = state.books.some(
        (item) => item.googleId === newBook.googleId
      );
      if (!existingBook) {
        state.books.push(newBook);
        state.filteredBooks.push(newBook);
        state.totalQuantity++;
      } else {
        return console.log("Book already exists!");
      }
    },
    updateBook(state, action: PayloadAction<CompleteBook>) {
      const date = new Date().toString();
      const updatedBook = { ...action.payload, lastModified: date };
      // books
      let bookId: string;
      let existingBookIndex: number;
      if (updatedBook._id) {
        bookId = updatedBook._id;
        existingBookIndex = state.books.findIndex(
          (item) => item._id === bookId
        );
      } else {
        bookId = updatedBook.googleId;
        existingBookIndex = state.books.findIndex(
          (item) => item.googleId === bookId
        );
      }
      if (existingBookIndex >= 0) {
        state.books[existingBookIndex] = updatedBook;
      } else {
        return console.log("Book not updated!");
      }
      // Filtered Books
      let existingFilteredBookIndex: number;
      if (updatedBook._id) {
        existingFilteredBookIndex = state.filteredBooks.findIndex(
          (item) => item._id === bookId
        );
      } else {
        existingFilteredBookIndex = state.filteredBooks.findIndex(
          (item) => item.googleId === bookId
        );
      }
      if (existingBookIndex >= 0) {
        state.filteredBooks[existingFilteredBookIndex] = updatedBook;
      } else {
        return console.log("Book not updated!");
      }
    },
    removeBook(state, action: PayloadAction<CompleteBook>) {
      const book = action.payload;
      const existingBook = state.books.some((item) => item._id === book._id);
      if (existingBook) {
        state.books = state.books.filter((item) => item._id !== book._id);
        state.filteredBooks = state.filteredBooks.filter(
          (item) => item._id !== book._id
        );
        state.totalQuantity--;
      } else {
        return console.log("Book not removed!");
      }
    },
    sortBooks(state) {
      switch (state.sortPreference) {
        case SortPreferences.lastModified:
          state.filteredBooks.sort((a, b) => {
            if (a.lastModified > b.lastModified) {
              return -1;
            } else {
              return 0;
            }
          });
          break;
        case SortPreferences.timeAdded:
          state.filteredBooks.sort((a, b) => {
            console.log(a.timeAdded);
            if (a.timeAdded > b.timeAdded) {
              return -1;
            } else {
              return 0;
            }
          });
          break;
        case SortPreferences.title:
          state.filteredBooks.sort((a, b) => {
            if (a.title < b.title) {
              return -1;
            } else {
              return 0;
            }
          });
          break;
        case SortPreferences.author:
          state.filteredBooks.sort((a, b) => {
            if (a.authors < b.authors) {
              return -1;
            } else {
              return 0;
            }
          });
          break;
      }
    },
    filterBooks(state, action: PayloadAction<Filter>) {
      if (action.payload === "all") {
        state.filteredBooks = state.books;
      } else {
        const filteredBooks = state.books.filter(
          (book) => book.status.reading === action.payload
        );
        state.filteredBooks = filteredBooks;
      }
    },
  },
});

export const bookActions = bookSlice.actions;

export default bookSlice;
