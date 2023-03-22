import { memo } from "react";

import { useAppSelector } from "../../hooks/useStore";
import styles from "./Login.module.css";
import picture from "../../assets/svg/login-profile.svg";
import anonymous from "../../assets/svg/anonymous-mask.svg";

const API_URL = process.env.REACT_APP_API_URL;

const Login = memo(() => {
  const userStore = useAppSelector((state) => state.userStore);
  const user: User | null = userStore.user;

  const logoutHandler = () => {
    sessionStorage.removeItem("user");
  };

  const logout = (
    <a
      onClick={logoutHandler}
      className={styles.login}
      href={API_URL + "/user/logout"}
    >
      Logout
    </a>
  );

  const login = (
    <a className={styles.login} href={API_URL + "/auth/google"}>
      Login
    </a>
  );

  const content = user ? logout : login;

  return (
    <div className={styles.container}>
      <img
        className={styles.picture}
        src={user ? (user.picture ? user.picture : picture) : anonymous}
        alt="Profile"
      />
      {content}
    </div>
  );
});

export default Login;
