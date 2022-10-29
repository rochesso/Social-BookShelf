import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define a type for the slice state
interface userState {
  user: User | null;
}

// Define the initial state using that type
const initialState: userState = {
  user: null,
};

const userSlice = createSlice({
  name: "userStore",
  initialState,
  reducers: {
    loginUser(state, action: PayloadAction<User>) {
      const user = action.payload;
      if (user) {
        state.user = user;
      } else {
        state.user = null;
      }
    },
    logoutUser(state, action: PayloadAction<boolean>) {
      const logoutUser = action.payload;
      if (logoutUser) {
        state.user = null;
      }
    },
  },
});

export const userActions = userSlice.actions;

export default userSlice;
