import styles from "./PageTitle.module.css";

type AppProps = {
  children: string;
};

const PageTitle = ({ children }: AppProps) => {
  return <h3 className={styles.title}>{children}</h3>;
};

export default PageTitle;
