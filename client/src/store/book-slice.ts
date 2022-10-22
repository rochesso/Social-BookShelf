import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define a type for the slice state
interface bookState {
  books: CompleteBook[];
  totalQuantity: number;
}

// Define the initial state using that type
const initialState: bookState = {
  books: [],
  totalQuantity: 0,
};

const bookSlice = createSlice({
  name: "configStore",
  initialState,
  reducers: {
    replaceBooks(state, action: PayloadAction<CompleteBook[]>) {
      const books = action.payload;
      if (Array.isArray(books)) {
        if (books.length > 0) {
          state.books = books;
          state.totalQuantity = books.length;
        }
      }
    },
    addBook(state, action: PayloadAction<CompleteBook>) {
      const newBook = action.payload;
      const existingBook = state.books.some((item) => item._id === newBook._id);
      if (!existingBook) {
        state.books.push(newBook);
        state.totalQuantity++;
      } else {
        return console.log("Book already exists!");
      }
    },
    removeBook(state, action: PayloadAction<CompleteBook>) {
      const newBook = action.payload;
      const existingBook = state.books.some((item) => item._id === newBook._id);
      if (existingBook) {
        state.books = state.books.filter((item) => item._id !== newBook._id);
        state.totalQuantity--;
      } else {
        return console.log("Book not removed!");
      }
    },
  },
});

export const bookActions = bookSlice.actions;

export default bookSlice;
