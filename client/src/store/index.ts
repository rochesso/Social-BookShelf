import { configureStore } from "@reduxjs/toolkit";

import bookSlice from "./book-slice";
import googleSearchBooksSlice from "./googleSearchBooks-slice";
import userSlice from "./user-slice";

const store = configureStore({
  reducer: {
    bookStore: bookSlice.reducer,
    googleSearchBooksStore: googleSearchBooksSlice.reducer,
    userStore: userSlice.reducer,
  },
  devTools: true,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
