import { Fragment } from "react";
import { useAppSelector } from "../../hooks/useStore";

import SearchBar from "../../components/GoogleApi/SearchBar";
import SearchList from "../../components/GoogleApi/SearchList";

import Loading from "../../components/Loading/Loading";

const Search = () => {
  const googleStore = useAppSelector((state) => state.googleSearchBooksStore);

  return (
    <Fragment>
      <SearchBar />
      {!googleStore.isSearching ? <SearchList /> : <Loading />}
    </Fragment>
  );
};

export default Search;
