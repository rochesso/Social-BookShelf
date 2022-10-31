import styles from "./ProgressBar.module.css";
import percentageIcon from "../../assets/svg/percentage-percent-svgrepo-com.svg";

type AppProps = {
  currentPage: number;
  pageCount: number;
};

const ProgressBar = ({ currentPage, pageCount }: AppProps) => {
  let barFillWidth = "0%";

  if (pageCount > 0) {
    barFillWidth = Math.round((currentPage / pageCount) * 100) + "%";
  }
  return (
    <div className={styles.chartBar}>
      <img
        className={styles.chartBar__icon}
        src={percentageIcon}
        alt="Percentage icon"
      />
      <p className={styles.chartBar__text}>{currentPage}</p>
      <div className={styles.chartBar__inner}>
        <div
          className={styles.chartBar__fill}
          style={{ width: barFillWidth }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;
