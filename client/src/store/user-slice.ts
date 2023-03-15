import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define a type for the slice state
interface userState {
  user: User | null;
}

// Define the initial state using that type
const initialState: userState = {
  user: sessionStorage.getItem("user") as unknown as User,
};

const userSlice = createSlice({
  name: "userStore",
  initialState,
  reducers: {
    loginUser(state, action: PayloadAction<User>) {
      const user = action.payload;
      if (user) {
        state.user = user;
        if (user.googleId) {
          sessionStorage.setItem("user", user.googleId);
        }
      } else {
        state.user = null;
        sessionStorage.removeItem("user");
      }
    },
    logoutUser(state) {
      state.user = null;
      sessionStorage.removeItem("user");
    },
  },
});

export const userActions = userSlice.actions;

export default userSlice;
