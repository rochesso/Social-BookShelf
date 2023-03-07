import styles from "./Footer.module.css";

const Header = () => {
  return (
    <footer className={styles.container}>
      <p className={styles.text}>
        This website was created by{" "}
        <span className={styles.author}>Arthur Rochesso</span> for educational
        purposes only!
      </p>
    </footer>
  );
};

export default Header;
