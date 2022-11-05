import { NavLink } from "react-router-dom";

import styles from "./NavItem.module.css";

type AppProps = {
  to: string;
  text: string;
};

const NavItem = ({ text, to }: AppProps) => {
  return (
    <li className={styles.container}>
      <NavLink
        end={true}
        className={({ isActive }) =>
          isActive ? `${styles.link} ${styles.active}` : `${styles.link}`
        }
        to={to}
      >
        <span className={styles.text}>{text}</span>
      </NavLink>
    </li>
  );
};

export default NavItem;
