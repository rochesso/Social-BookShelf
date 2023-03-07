import { Fragment } from "react";
import { NavLink } from "react-router-dom";
import bookshelfIcon from "../../assets/svg/StackOfBooks2.svg";
import styles from "./Home.module.css";

const Home = () => {
  return (
    <Fragment>
      <img className={styles.img} src={bookshelfIcon} alt="Bookshelf" />
      <p className={styles.text}>
        Start your virtual shelf by searching for a book on the search page or{" "}
        <NavLink className={styles.search} to={"/search"}>
          click here
        </NavLink>
        . Add it to your library, rate, mark as favorite, change the reading
        status or save which page you are! This is where you keep track of all
        your books :)
      </p>
    </Fragment>
  );
};

export default Home;
