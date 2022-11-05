import { useState } from "react";
import styles from "./Filter.module.css";
import { useAppSelector } from "../../hooks/useStore";
import FilterItem from "./FilterItem";

type AppProps = {};

const Filter = () => {
  const bookStore = useAppSelector((state) => state.bookStore);
  const [selected, setSelected] = useState<Filter>("all");

  const selectedHandler = (filter: Filter) => {
    setSelected(filter);
  };

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
        isSelected={isSelected}
        selectedHandler={selectedHandler}
      />
    );
  });

  return <ul className={styles.container}>{filterItems}</ul>;
};

export default Filter;
