import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.container}>
      <p className={styles.text}>
        This website was created by{" "}
        <a
          href="https://www.linkedin.com/in/rochesso/"
          className={styles.author}
          target="_blank"
          rel="noreferrer"
        >
          Arthur Rochesso
        </a>{" "}
        for educational purposes only!
      </p>
    </footer>
  );
};

export default Footer;
