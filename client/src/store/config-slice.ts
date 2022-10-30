import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define a type for the slice state
interface configState {
  config: Config;
}

// Define the initial state using that type
const initialState: configState = {
  config: {
    sortPreference: sessionStorage.getItem("sortPreference") as unknown as
      | "title"
      | "recent"
      | "author"
      | "title",
  },
};

const configSlice = createSlice({
  name: "configStore",
  initialState,
  reducers: {
    replaceConfig(state, action: PayloadAction<Config>) {
      const config = action.payload;
      if (config) {
        state.config = config;
        sessionStorage.setItem("sortPreference", config.sortPreference);
      }
    },
  },
});

export const configActions = configSlice.actions;

export default configSlice;
