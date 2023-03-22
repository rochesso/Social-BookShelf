import { memo } from "react";
import styles from "./PageTitle.module.css";

type AppProps = {
  children: string;
};

const PageTitle = memo(({ children }: AppProps) => {
  return (
    <h3 id="pageTitle" className={styles.title}>
      {children}
    </h3>
  );
});

export default PageTitle;
