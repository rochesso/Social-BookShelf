import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define a type for the slice state
interface bookState {
  books: CompleteBook[];
  totalQuantity: number;
  filters: Filter["filter"][];
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
    (sessionStorage.getItem("sortPreference") as Config["sortPreference"]) ||
    "title",
};

const bookSlice = createSlice({
  name: "configStore",
  initialState,
  reducers: {
    setSortPreference(state, action: PayloadAction<Config["sortPreference"]>) {
      state.sortPreference = action.payload;
      sessionStorage.setItem("sortPreference", action.payload);
    },
    getFilters(state) {
      const filters = Array.from(
        new Set(state.books.map((book) => book.status.reading))
      );
      state.filters = [...filters, "all"];
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
      const newBook = action.payload;
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
      const updatedBook = action.payload;
      const date = new Date().toString();
      // books
      let existingBookIndex = state.books.findIndex(
        (item) => item._id === updatedBook._id
      );
      if (existingBookIndex >= 0) {
        state.books[existingBookIndex] = { ...updatedBook, lastModified: date };
      } else {
        return console.log("Book not updated!");
      }
      // Filtered Books
      let existingFilteredBookIndex = state.filteredBooks.findIndex(
        (item) => item._id === updatedBook._id
      );
      if (existingFilteredBookIndex >= 0) {
        state.filteredBooks[existingFilteredBookIndex] = {
          ...updatedBook,
          lastModified: date,
        };
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
        case "recent":
          state.filteredBooks.sort((a, b) => {
            if (a.lastModified > b.lastModified) {
              return -1;
            } else {
              return 0;
            }
          });
          break;
        case "title":
          state.filteredBooks.sort((a, b) => {
            if (a.title < b.title) {
              return -1;
            } else {
              return 0;
            }
          });
          break;
      }
    },
    filterBooks(state, action: PayloadAction<Filter["filter"]>) {
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
