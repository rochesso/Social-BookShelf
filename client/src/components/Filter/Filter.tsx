import { useState } from "react";
import styles from "./Filter.module.css";
import { useAppSelector, useAppDispatch } from "../../hooks/useStore";
import FilterItem from "./FilterItem";
import { searchMyLibrary } from "../../store/book-actions";

const Filter = () => {
  const dispatch = useAppDispatch();

  const bookStore = useAppSelector((state) => state.bookStore);
  const [selected, setSelected] = useState<Filter>("all");

  // Search for a book in your library
  const [search, setSearch] = useState<string>("");
  const searchHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
    dispatch(searchMyLibrary(event.target.value, selected));
  };

  // Select a filter
  const selectedHandler = (filter: Filter) => {
    setSelected(filter);
  };

  // Get all filters and return them with the FilterItem component
  const filters = bookStore.filters;
  const filterItems = filters.map((filter) => {
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
      />
    );
  });

  return (
    <ul className={styles.container}>
      {/* Search for a book in your library */}
      <li>
        <label htmlFor="searchMyLibrary"></label>
        <input
          className={styles.search}
          onChange={searchHandler}
          value={search}
          id="searchMyLibrary"
          placeholder="Search in your Library!"
        />
      </li>
      {/* All filters */}
      {filterItems}
    </ul>
  );
};

export default Filter;
