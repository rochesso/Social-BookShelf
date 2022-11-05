import styles from "./ReadingStatus.module.css";

type AppProps = {
  icon: string;
  text: string;
};

const ReadingStatus = ({ icon, text }: AppProps) => {
  return (
    <div className={styles.status}>
      <img className={styles.status__icon} src={icon} alt="Bookshelf" />
      <p className={styles.status__text}>{text}</p>
    </div>
  );
};

export default ReadingStatus;
