import styles from "./FilterItem.module.css";
import { searchMyLibrary } from "../../store/book-actions";
import { useAppDispatch } from "../../hooks/useStore";
import { ReadingStatus } from "../../globals";

type AppProps = {
  filter: Filter;
  search: string;
  isSelected: boolean;
  selectedHandler: (filter: Filter) => void;
};

// Filter by Reading Status.
// Added later the option to search for a book
const FilterItem = ({
  filter,
  search,
  isSelected,
  selectedHandler,
}: AppProps) => {
  const dispatch = useAppDispatch();

  const filterHandler = (e: any) => {
    dispatch(searchMyLibrary(search, filter));
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
