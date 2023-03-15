import styles from "./FilterItem.module.css";
import { useAppDispatch } from "../../hooks/useStore";
import { ReadingStatus } from "../../globals";

type AppProps = {
  filter: Filter;
  search: string;
  isSelected: boolean;
  selectedHandler: (filter: Filter) => void;
  handler: any;
};

// Filter by Reading Status.
// Added later the option to search for a book
const FilterItem = ({
  filter,
  search,
  isSelected,
  selectedHandler,
  handler,
}: AppProps) => {
  const dispatch = useAppDispatch();

  const filterHandler = (e: any) => {
    dispatch(handler(search, filter));
    selectedHandler(filter);
  };
  let filterName = null;
  switch (filter) {
    case "all":
      filterName = "All";
      break;
    case "favorites":
      filterName = "Favorites";
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
