import axios from "axios";
import { bookActions } from "./book-slice";
import { configActions } from "./config-slice";

const API_URL = process.env.REACT_APP_API_URL;

export const fetchConfig = () => {
  return async (dispatch: (arg: any) => void) => {
    const fetchData = async () => {
      const response = await axios.get(`${API_URL}/user/config`);
      return response.data;
    };

    try {
      const data = await fetchData();
      const config: Config = data;
      dispatch(configActions.replaceConfig(config));
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
