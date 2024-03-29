import { NavLink } from "react-router-dom";
import styles from "./Home.module.css";
import library from "../../assets/svg/library-study/1749-min-cropped.jpg";

const Home = () => {
  return (
    <main className={styles.container}>
      <img className={styles.image} src={library} alt="library"></img>
      <p className={styles.text}>
        Start your virtual shelf by searching for a book on the search page or{" "}
        <NavLink className={styles.search} to={"/search"}>
          click here
        </NavLink>
        . Add it to your library, rate it, mark as favourite, change the reading
        status or save which page you are! This is where you keep track of all
        your books :)
      </p>
    </main>
  );
};

export default Home;
