import { useAppSelector } from "../../hooks/useStore";
import NavbarMobile from "../Navbar/NavbarMobile";
import styles from "./Header.module.css";
import Login from "./Login";

const Header = () => {
  const userStore = useAppSelector((state) => state.userStore);
  const user: User | null = userStore.user;

  return (
    <header className={styles.container}>
      <h2 className={styles.name}>
        Welcome {user ? user.firstName : "Guest"}!
      </h2>
      <span className={styles.span}>
        <h1 className={styles.title}>Social Bookshelf</h1>
      </span>
      <span className={styles.login}>
        <Login />
      </span>
    </header>
  );
};

export default Header;
