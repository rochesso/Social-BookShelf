import { Fragment } from "react";
import SearchBar from "../../components/GoogleApi/SearchBar";
import SearchList from "../../components/GoogleApi/SearchList";

const Home = () => {
  return (
    <Fragment>
      <SearchBar />
      <SearchList />
    </Fragment>
  );
};

export default Home;
