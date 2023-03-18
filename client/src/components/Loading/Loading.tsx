import loadingIcon from "../../assets/svg/loading-svgrepo-com.svg";
import styles from "./Loading.module.css";

const Loading = () => {
  return <img className={styles.loading} src={loadingIcon} alt="Loading" />;
};

export default Loading;
