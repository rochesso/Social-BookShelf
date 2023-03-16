// users is used for the social part of the website
// users will be all users registered in the website
// books will be the books of a selected user in the social page
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SortPreferences } from "../globals";

// Define a type for the slice state
interface socialUsersState {
  users: User[];
  books: CompleteBook[];
  friends: User[];
  filters: Filter[];
  filteredBooks: CompleteBook[];
  sortPreference: Config["sortPreference"];
}

// Define the initial state using that type
const initialState: socialUsersState = {
  books: [],
  users: [],
  friends: [],
  filters: [],
  filteredBooks: [],
  sortPreference: SortPreferences.lastModified,
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
        } else {
          state.users = [];
        }
      }
    },
    replaceFriends(state, action: PayloadAction<User[]>) {
      const friends = action.payload;
      if (Array.isArray(friends)) {
        if (friends.length > 0) {
          state.friends = friends;
        } else {
          state.friends = [];
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
    setSortPreference(state, action: PayloadAction<SortPreferences>) {
      state.sortPreference = action.payload;
      sessionStorage.setItem("sortPreference", action.payload);
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
  },
});

export const usersActions = usersSlice.actions;

export default usersSlice;
