import { Fragment } from "react";
import bookshelfIcon from "../../assets/svg/shelf-svgrepo-com.svg";
import styles from "./Home.module.css";

const Home = () => {
  return (
    <Fragment>
      <img className={styles.img} src={bookshelfIcon} alt="Bookshelf" />
      <p className={styles.text}>
        Start your virtual shelf by searching for a book on the search box. Add
        it to your shelf, rate it, comment on it, link a song to the book, this
        space is your online book club :)
      </p>
    </Fragment>
  );
};

export default Home;
