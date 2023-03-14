import { useAppSelector } from "../../hooks/useStore";

import NavItem from "./NavItem";
import styles from "./Navbar.module.css";

const Navbar = () => {
  const userStore = useAppSelector((state) => state.userStore);
  const user = userStore.user;

  const expandMenu = () => {
    const element = document.getElementById(
      `${styles.list}`
    ) as any as HTMLElement;
    element.classList.toggle(`${styles.listOpen}`);
  };
  return (
    <nav className={styles.container}>
      <div onClick={expandMenu} className={styles.menu}>
        Teste
      </div>
      <ul className={styles.list} id={styles.list}>
        <NavItem to="/" text="Home" />
        <NavItem to="/search" text="Search" />

        {user ? <NavItem to="/user/books" text="My Library" /> : null}
        {user ? <NavItem to="/user/tbrRoulette" text="TBR Roulette" /> : null}
      </ul>
    </nav>
  );
};

export default Navbar;
