import { useAppSelector } from "../../hooks/useStore";
import styles from "./Header.module.css";
import Login from "./Login";

const Header = () => {
  const userStore = useAppSelector((state) => state.userStore);
  const user: User | null = userStore.user;

  return (
    <header className={styles.container}>
      <span className={styles.span}></span>
      <h1 className={styles.title}>
        Welcome {user ? user.firstName : "Guest"}!
      </h1>
      <span className={styles.login}>
        <Login />
      </span>
    </header>
  );
};

export default Header;
