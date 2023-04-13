import { memo, Fragment } from "react";

import styles from "./NavBottom.module.css";
import NavBottomItem from "./NavBottomItem";

type AppProps = {
  fromExplore: boolean;
  initialSlice: number;
  setSlice: (value: number) => void;
};

const NavBottom = memo(({ fromExplore, initialSlice, setSlice }: AppProps) => {
  // Resets the slice used in the books infinite scroll
  const sliceHandler = () => {
    setSlice(initialSlice);
  };
  const links = (
    <Fragment>
      <NavBottomItem
        sliceHandler={sliceHandler}
        title={"Friends"}
        to={"friends"}
      />

      <NavBottomItem title={"Books"} to={"books"} />
    </Fragment>
  );

  return (
    <nav id="navBottom" className={styles.container}>
      <ul className={styles.list} id={styles.list}>
        {fromExplore ? links : null}
        <li>
          <a className={styles.link} href="#header">
            Go to top
          </a>
        </li>
      </ul>
    </nav>
  );
});

export default NavBottom;
