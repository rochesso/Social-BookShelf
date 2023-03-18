import { useAppSelector } from "../../hooks/useStore";

import SearchBar from "../../components/GoogleApi/SearchBar";
import SearchList from "../../components/GoogleApi/SearchList";

import Loading from "../../components/Loading/Loading";

import styles from "./Search.module.css";

const Search = () => {
  const googleStore = useAppSelector((state) => state.googleSearchBooksStore);

  return (
    <main className={styles.container}>
      <SearchBar />
      {!googleStore.isSearching ? <SearchList /> : <Loading />}
    </main>
  );
};

export default Search;
