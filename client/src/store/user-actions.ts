import axios from "axios";
import { userActions } from "./user-slice";

const API_URL = process.env.REACT_APP_API_URL;

export const fetchUser = () => {
  return async (dispatch: (arg: any) => void) => {
    const fetchData = async () => {
      const response = await axios.get(`${API_URL}/user`);
      return response.data;
    };

    try {
      const user: User = await fetchData();
      dispatch(userActions.loginUser(user));
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
