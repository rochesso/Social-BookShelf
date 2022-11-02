import { NavLink } from "react-router-dom";
import { useAppSelector } from "../../hooks/useStore";

import styles from "./Navbar.module.css";

const Navbar = () => {
  const userStore = useAppSelector((state) => state.userStore);
  const user = userStore.user;
  return (
    <div className={styles.container}>
      <ul className={styles.list}>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/search">Search</NavLink>
        </li>

        {user ? (
          <li>
            <NavLink to="/user/books">My Library</NavLink>
          </li>
        ) : null}
      </ul>
    </div>
  );
};

export default Navbar;
