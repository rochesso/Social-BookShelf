// users is used for the social part of the website
// users will be all users registered in the website
// books will be the books of a selected user in the social page
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define a type for the slice state
interface friendsState {
  friends: User[];
}

// Define the initial state using that type
const initialState: friendsState = {
  friends: [],
};

const friendsSlice = createSlice({
  name: "friendsStore",
  initialState,
  reducers: {
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
    addFriends(state, action: PayloadAction<User>) {
      const friend: User = action.payload;
      const existingFriend = state.friends.some(
        (item) => item.googleId === friend.googleId
      );
      if (!existingFriend) {
        state.friends.push(friend);
      } else {
        return console.log("Friend already exists!");
      }
    },
    removeFriends(state, action: PayloadAction<User>) {
      const friend = action.payload;
      const existingFriend = state.friends.some(
        (item) => item.googleId === friend.googleId
      );
      if (existingFriend) {
        state.friends = state.friends.filter(
          (item) => item.googleId !== friend.googleId
        );
      } else {
        return console.log("Book not removed!");
      }
    },
  },
});

export const friendsActions = friendsSlice.actions;

export default friendsSlice;
