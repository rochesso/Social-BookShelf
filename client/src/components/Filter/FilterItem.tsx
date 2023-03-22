import { memo } from "react";
import styles from "./FilterItem.module.css";
import { useAppDispatch } from "../../hooks/useStore";
import { ReadingStatus } from "../../globals";

type AppProps = {
  filter: Filter;
  count: number;
  search: string;
  isSelected: boolean;
  selectedHandler: (filter: Filter) => void;
  searchAction: any;
  initialSlice: number;
  setSlice: (value: number) => void;
};

// Filter by Reading Status.
// Added later the option to search for a book
const FilterItem = memo(
  ({
    count,
    filter,
    search,
    isSelected,
    selectedHandler,
    searchAction,
    setSlice,
    initialSlice,
  }: AppProps) => {
    const dispatch = useAppDispatch();

    const filterHandler = (e: any) => {
      dispatch(searchAction(search, filter));
      selectedHandler(filter);
      setSlice(initialSlice);
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
        className={
          isSelected ? `${styles.item} ${styles.selected}` : styles.item
        }
      >
        {filterName} <span className={styles.count}>{count ? count : 0}</span>
      </li>
    );
  }
);

export default FilterItem;
