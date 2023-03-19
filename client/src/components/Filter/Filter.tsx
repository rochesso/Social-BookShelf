import { useState, useRef, useEffect } from "react";
import { useAppDispatch } from "../../hooks/useStore";
import FilterItem from "./FilterItem";
import SortingPreference from "../SortingPreference/SortingPreference";
import clearIcon from "../../assets/svg/close.svg";
import styles from "./Filter.module.css";

type AppProps = {
  store: any;
  searchAction: any;
  sortAction: any;
};

const Filter = ({ store, searchAction, sortAction }: AppProps) => {
  const dispatch = useAppDispatch();

  const [filters, setFilters] = useState<Filter[]>([]);
  const [selected, setSelected] = useState<Filter>("all");

  const searchTextRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setFilters(store.filters);
  }, [store.filters]);

  // Search for a book in your library
  const searchHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (searchTextRef.current) {
      dispatch(searchAction(searchTextRef.current.value, selected));
    }
  };

  // Select a filter
  const selectedHandler = (filter: Filter) => {
    setSelected(filter);
  };

  // Clear the search input
  const clearSearch = () => {
    if (searchTextRef.current) {
      searchTextRef.current.value = "";
      dispatch(searchAction(searchTextRef.current.value, selected));
      searchTextRef.current.focus();
    }
  };

  // Get all filters and return them with the FilterItem component
  const filterItems = filters.map((filter) => {
    if (searchTextRef.current) {
      const search = searchTextRef.current.value;
      let isSelected = false;
      if (filter === selected) {
        isSelected = true;
      }
      return (
        <FilterItem
          key={filter}
          filter={filter}
          search={search}
          isSelected={isSelected}
          selectedHandler={selectedHandler}
          searchAction={searchAction}
        />
      );
    }
    return null;
  });

  return (
    <ul className={styles.container}>
      {/* Search for a book in your library */}
      <li className={styles.search}>
        <label className={styles.search__label} htmlFor="searchMyLibrary">
          Search in your Library
        </label>
        <input
          className={styles.search__input}
          onChange={searchHandler}
          ref={searchTextRef}
          id="searchMyLibrary"
          placeholder="Search"
        />
        <div className={styles.search__clear}>
          <img
            className={styles.search__clearIcon}
            src={clearIcon}
            alt="Cross"
            onClick={clearSearch}
          />
        </div>
      </li>
      {/* All filters */}
      {filterItems}

      {/* Sort preference */}
      <li>
        <SortingPreference store={store} sortAction={sortAction} />
      </li>
    </ul>
  );
};

export default Filter;
