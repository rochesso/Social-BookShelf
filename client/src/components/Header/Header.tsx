import { memo } from "react";

import { useAppSelector } from "../../hooks/useStore";
import styles from "./Header.module.css";
import Login from "./Login";

const Header = memo(() => {
  const userStore = useAppSelector((state) => state.userStore);
  const user: User | null = userStore.user;

  return (
    <header id="header" className={styles.container}>
      <h2 className={styles.name}>
        Welcome {user ? user.firstName : "Guest"}!
      </h2>
      <h1 className={styles.title}>Social Bookshelf</h1>
      <Login />
    </header>
  );
});

export default Header;
