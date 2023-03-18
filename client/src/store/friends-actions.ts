import axios, { AxiosError } from "axios";
import { friendsActions } from "./friends-slice";
import { userActions } from "./user-slice";

const API_URL = process.env.REACT_APP_API_URL;

export const fetchFriends = () => {
  return async (dispatch: (arg: any) => void) => {
    const fetchData = async () => {
      const response = await axios.get(`${API_URL}/user/data`);
      return response.data.friends;
    };

    try {
      const friends: User[] = await fetchData();
      dispatch(friendsActions.replaceFriends(friends));
      return friends;
    } catch (error) {
      //   dispatch(
      //     uiActions.showNotification({
      //       status: "error",
      //       title: "Error!",
      //       message: "Fetching cart data failed!",
      //     })
      //   );
    }
  };
};

export const addFriend = (friend: User) => {
  return async (dispatch: (arg: any) => void) => {
    try {
      dispatch(friendsActions.addFriends(friend));
      const response = await axios.post(API_URL + `/users/${friend.googleId}`);
      switch (Number(response.status)) {
        case 201:
          // dispatch(fetchFriends());
          break;
      }
    } catch (error) {
      const axiosError = error as AxiosError;
      const axiosErrorStatus = axiosError.response?.status;
      switch (axiosErrorStatus) {
        case 401:
          dispatch(userActions.logoutUser());
          break;
      }
    }
  };
};

export const removeFriend = (googleId: string) => {
  return async (dispatch: (arg: any) => void) => {
    try {
      dispatch(friendsActions.removeFriends(googleId));
      const response = await axios.delete(API_URL + `/users/${googleId}`);
      switch (Number(response.status)) {
        case 200:
          // dispatch(fetchFriends());
          break;
      }
    } catch (error) {
      const axiosError = error as AxiosError;
      const axiosErrorStatus = axiosError.response?.status;
      switch (axiosErrorStatus) {
        case 401:
          dispatch(userActions.logoutUser());
          break;
        case 400:
          dispatch(fetchFriends());
          break;
      }
    }
  };
};
