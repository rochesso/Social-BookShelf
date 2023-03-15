// users is used for the social part of the website
// users will be all users registered in the website
// books will be the books of a selected user in the social page
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define a type for the slice state
interface bookState {
  users: User[];
  books: CompleteBook[];
  filters: Filter[];
  filteredBooks: CompleteBook[];
}

// Define the initial state using that type
const initialState: bookState = {
  books: [],
  users: [],
  filters: [],
  filteredBooks: [],
};

const usersSlice = createSlice({
  name: "usersStore",
  initialState,
  reducers: {
    replaceUsers(state, action: PayloadAction<User[]>) {
      const users = action.payload;
      if (Array.isArray(users)) {
        if (users.length > 0) {
          state.users = users;
        }
      }
    },
    replaceBooks(state, action: PayloadAction<CompleteBook[]>) {
      const books = action.payload;
      if (Array.isArray(books)) {
        if (books.length > 0) {
          state.books = books;
        } else {
          state.books = [];
        }
      }
    },
    getFilters(state) {
      const filters = Array.from(
        new Set(state.books.map((book) => book.status.reading))
      );
      if (filters.length > 1) {
        state.filters = [...filters, "all", "favorites"];
      } else {
        state.filters = ["all", "favorites"];
      }
    },

    filterSocialBooks(state, action: PayloadAction<Filter>) {
      if (action.payload === "all") {
        state.filteredBooks = state.books;
      } else if (action.payload === "favorites") {
        const filteredBooks = state.books.filter(
          (book) => book.status.isFavorite === true
        );
        state.filteredBooks = filteredBooks;
      } else {
        const filteredBooks = state.books.filter(
          (book) => book.status.reading === action.payload
        );
        state.filteredBooks = filteredBooks;
      }
    },
    searchSocialLibrary(state, action: PayloadAction<string>) {
      const searchedBooks = state.filteredBooks.filter(
        (book) =>
          book.title.toLowerCase().includes(action.payload.toLowerCase()) ||
          book.authors
            .join(", ")
            .toLowerCase()
            .includes(action.payload.toLowerCase())
      );
      state.filteredBooks = searchedBooks;
    },
  },
});

export const usersActions = usersSlice.actions;

export default usersSlice;
