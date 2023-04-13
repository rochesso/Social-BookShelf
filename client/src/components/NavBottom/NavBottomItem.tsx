import { NavLink } from "react-router-dom";

import styles from "./NavBottomItem.module.css";

type AppProps = {
  to: string;
  title: string;
  sliceHandler?: () => void;
};

const NavBottomItem = ({ title, to, sliceHandler }: AppProps) => {
  return (
    <li>
      <NavLink
        onClick={sliceHandler}
        className={({ isActive }) =>
          isActive ? `${styles.link} ${styles.active}` : `${styles.link}`
        }
        to={to}
      >
        {title}
      </NavLink>
    </li>
  );
};

export default NavBottomItem;
