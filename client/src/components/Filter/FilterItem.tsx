import styles from "./FilterItem.module.css";
import { filterBooks } from "../../store/book-actions";
import { useAppDispatch } from "../../hooks/useStore";
import { ReadingStatus } from "../../globals";

type AppProps = {
  filter: Filter;
  isSelected: boolean;
  selectedHandler: (filter: Filter) => void;
};

// Filter by Reading Status.
const FilterItem = ({ filter, isSelected, selectedHandler }: AppProps) => {
  const dispatch = useAppDispatch();

  const filterHandler = (e: any) => {
    dispatch(filterBooks(filter));
    selectedHandler(filter);
  };
  let filterName = null;
  switch (filter) {
    case "all":
      filterName = "All";
      break;
    case ReadingStatus.notStarted:
      filterName = "Not Started";
      break;
    case ReadingStatus.started:
      filterName = "Started";
      break;
    case ReadingStatus.finished:
      filterName = "Finished";
      break;
    case ReadingStatus.gaveUp:
      filterName = "Gave up";
      break;
  }

  return (
    <li
      onClick={filterHandler}
      className={isSelected ? `${styles.item} ${styles.selected}` : styles.item}
    >
      {filterName}
    </li>
  );
};

export default FilterItem;
