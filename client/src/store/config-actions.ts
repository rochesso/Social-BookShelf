import axios, { AxiosError } from "axios";
import { bookActions } from "./book-slice";
import { configActions } from "./config-slice";
import { userActions } from "./user-slice";

const API_URL = process.env.REACT_APP_API_URL;

export const fetchConfig = () => {
  return async (dispatch: (arg: any) => void) => {
    const fetchData = async () => {
      const response = await axios.get(`${API_URL}/user/config`);
      return response;
    };

    try {
      const response = await fetchData();
      switch (response.status) {
        case 200:
          const config: Config = response.data;
          dispatch(configActions.replaceConfig(config));
          break;
        case 401:
          dispatch(userActions.logoutUser(true));
      }
    } catch (error) {
      const axiosError = error as AxiosError;
      const axiosErrorStatus = axiosError.response?.status;
      switch (axiosErrorStatus) {
        case 401:
          dispatch(userActions.logoutUser(true));
          break;
      }

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
