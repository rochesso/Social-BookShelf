import styles from "./FilterItem.module.css";
import { filterBooks } from "../../store/book-actions";
import { useAppDispatch } from "../../hooks/useStore";

type AppProps = {
  filter: Filter["filter"];
};

const FilterItem = ({ filter }: AppProps) => {
  const dispatch = useAppDispatch();

  const filterHandler = (e: any) => {
    dispatch(filterBooks(filter));
  };
  let filterName = null;
  switch (filter) {
    case "all":
      filterName = "All";
      break;
    case "notStarted":
      filterName = "Not Started";
      break;
    case "started":
      filterName = "Started";
      break;
    case "finished":
      filterName = "Finished";
      break;
    case "gaveUp":
      filterName = "Gave up";
      break;
  }

  return (
    <li onClick={filterHandler} className={styles.item}>
      {filterName}
    </li>
  );
};

export default FilterItem;
