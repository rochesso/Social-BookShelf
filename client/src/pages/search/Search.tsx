import { Fragment } from "react";
import SearchBar from "../../components/GoogleApi/SearchBar";
import SearchList from "../../components/GoogleApi/SearchList";

const Search = () => {
  return (
    <Fragment>
      <SearchBar />
      <SearchList />
    </Fragment>
  );
};

export default Search;
