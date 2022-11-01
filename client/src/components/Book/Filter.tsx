import styles from "./Filter.module.css";
import { useAppSelector } from "../../hooks/useStore";
import FilterItem from "./FilterItem";

type AppProps = {};

const Filter = () => {
  const bookStore = useAppSelector((state) => state.bookStore);

  const filters = bookStore.filters;
  const filterItems = filters.map((filter) => (
    <FilterItem key={filter} filter={filter} />
  ));

  return <ul className={styles.container}>{filterItems}</ul>;
};

export default Filter;
