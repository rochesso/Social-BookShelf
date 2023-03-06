import styles from "./Footer.module.css";

const Header = () => {
  return (
    <footer className={styles.container}>
      <p className={styles.text}>
        This site was created by Arthur Rochesso for educational purposes only!
      </p>
    </footer>
  );
};

export default Header;
