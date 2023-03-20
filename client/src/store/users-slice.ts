// users is used for the social part of the website
// users will be all users registered in the website
// books will be the books of a selected user in the social page
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SortPreferences } from "../globals";

// Define a type for the slice state
interface socialUsersState {
  isLoading: boolean;
  users: User[];
  loadedUsers: SocialUser[];
  selectedUser: SocialUser | undefined;
  books: CompleteBook[];
  filters: Filter[];
  filteredBooks: CompleteBook[];
  sortPreference: Config["sortPreference"];
}

// Define the initial state using that type
const initialState: socialUsersState = {
  // Related to the selected user
  selectedUser: undefined,
  books: [],
  filters: [],
  filteredBooks: [],
  sortPreference: SortPreferences.lastModified,
  isLoading: false,
  // All users with an account
  users: [],
  // Users with data already downloaded
  loadedUsers: [],
};

const usersSlice = createSlice({
  name: "usersStore",
  initialState,
  reducers: {
    // Save the downloaded data so it doesn't need to be download again later, unless the page is refreshed
    addLoadedUser(state, action: PayloadAction<SocialUser>) {
      const loadedUsers = state.loadedUsers;
      const isLoaded = state.loadedUsers.some(
        (loadedUser) =>
          loadedUser.user.googleId === action.payload.user.googleId
      );
      if (!isLoaded) {
        loadedUsers.push(action.payload);
      }
    },

    // Check if the user data is already downloaded
    selectLoadedUser(state, action: PayloadAction<string>) {
      const loadedUsers = state.loadedUsers;
      const selectedUser = loadedUsers.find(
        (loadedUser) => loadedUser.user.googleId === action.payload
      );
      if (selectedUser) {
        state.selectedUser = selectedUser;
        state.books = selectedUser.books;
      } else {
        state.selectedUser = undefined;
        state.books = [];
      }
    },

    isLoadingToggle(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },

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
    replaceSelectedUser(state, action: PayloadAction<SocialUser>) {
      const selectedUser = action.payload;
      if (selectedUser) {
        state.selectedUser = selectedUser;
      } else {
        state.selectedUser = undefined;
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
      if (filters.length > 0) {
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
