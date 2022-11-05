import { useAppSelector } from "../../hooks/useStore";
import NavItem from "./NavItem";

import styles from "./Navbar.module.css";

const Navbar = () => {
  const userStore = useAppSelector((state) => state.userStore);
  const user = userStore.user;
  return (
    <div className={styles.container}>
      <ul className={styles.list}>
        <NavItem to="/" text="Home" />
        <NavItem to="/search" text="Search" />

        {user ? <NavItem to="/user/books" text="My Library" /> : null}
        {user ? <NavItem to="/user/tbrRoulette" text="TBR Roulette" /> : null}
      </ul>
    </div>
  );
};

export default Navbar;
