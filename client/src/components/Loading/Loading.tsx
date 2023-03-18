import loadingIcon from "../../assets/svg/loading-svgrepo-com.svg";
import styles from "./Loading.module.css";

const Loading = () => {
  return (
    <div className={styles.container}>
      <img className={styles.loading} src={loadingIcon} alt="Loading" />;
    </div>
  );
};

export default Loading;
