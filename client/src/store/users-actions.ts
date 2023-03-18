// users is used for the social part of the website
// users will be all users registered in the website
// books will be the books of a selected user in the social page
import axios, { AxiosError } from "axios";
import { usersActions } from "./users-slice";
import { userActions } from "./user-slice";

const API_URL = process.env.REACT_APP_API_URL;

export const fetchUsers = () => {
  return async (dispatch: (arg: any) => void) => {
    const fetchData = async () => {
      const response = await axios.get(`${API_URL}/users`);
      return response;
    };

    try {
      dispatch(usersActions.isLoadingToggle(true));
      const response = await fetchData();
      switch (Number(response.status)) {
        case 200:
          dispatch(usersActions.isLoadingToggle(false));
          const socialUsers: User[] = response.data;
          dispatch(usersActions.replaceUsers(socialUsers));
          break;
      }
    } catch (error) {
      dispatch(usersActions.isLoadingToggle(false));
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

export const fetchSocialUserData = (googleId: string) => {
  return async (dispatch: (arg: any) => void) => {
    const fetchData = async () => {
      const response = await axios.get(`${API_URL}/users/${googleId}`);
      return response;
    };

    try {
      dispatch(usersActions.isLoadingToggle(true));
      const response = await fetchData();
      switch (Number(response.status)) {
        case 200:
          const selectedUser: SocialUser = await response.data;
          dispatch(usersActions.replaceSelectedUser(selectedUser));
          // Save the downloaded data so it doesn't need to be download again later, unless the page is refreshed
          dispatch(usersActions.addLoadedUser(selectedUser));
          dispatch(usersActions.replaceBooks(selectedUser.books));
          dispatch(usersActions.getFilters());
          dispatch(usersActions.sortBooks());
          dispatch(usersActions.isLoadingToggle(false));
          break;
      }
    } catch (error) {
      dispatch(usersActions.isLoadingToggle(false));
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

export const filterSocialBooks = (filter: Filter) => {
  return async (dispatch: (arg: any) => void) => {
    dispatch(usersActions.filterSocialBooks(filter));
  };
};

export const searchSocialLibrary = (search: string, filter: Filter) => {
  return async (dispatch: (arg: any) => void) => {
    dispatch(usersActions.filterSocialBooks(filter));
    dispatch(usersActions.searchSocialLibrary(search));
    dispatch(usersActions.sortBooks());
  };
};

export const sortSocialAction = (preference: SortPreferences) => {
  return async (dispatch: (arg: any) => void) => {
    try {
      dispatch(usersActions.setSortPreference(preference));
      dispatch(usersActions.sortBooks());
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };
};
