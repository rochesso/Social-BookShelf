import { useAppSelector } from "../../hooks/useStore";

import NavItem from "./NavItem";
import styles from "./Navbar.module.css";

const Navbar = () => {
  const userStore = useAppSelector((state) => state.userStore);
  const user = userStore.user;

  return (
    <nav className={styles.container}>
      <ul className={styles.list} id={styles.list}>
        <NavItem to="/" text="Home" />
        <NavItem to="/search" text="Search" />
        <NavItem to="/users" text="Explore" />

        {user ? <NavItem to="/user/books" text="My Library" /> : null}
        {user ? <NavItem to="/user/tbrRoulette" text="TBR Roulette" /> : null}
        {user ? <NavItem to="/user/friends" text="Friends" /> : null}
      </ul>
    </nav>
  );
};

export default Navbar;
