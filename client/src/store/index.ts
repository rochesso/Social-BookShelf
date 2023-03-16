import { configureStore } from "@reduxjs/toolkit";

import bookSlice from "./book-slice";
import googleSearchBooksSlice from "./googleSearchBooks-slice";
import userSlice from "./user-slice";
import usersSlice from "./users-slice";
import friendsSlice from "./friends-slice";

const store = configureStore({
  reducer: {
    bookStore: bookSlice.reducer,
    googleSearchBooksStore: googleSearchBooksSlice.reducer,
    userStore: userSlice.reducer,
    usersStore: usersSlice.reducer,
    friendsStore: friendsSlice.reducer,
  },
  devTools: true,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
