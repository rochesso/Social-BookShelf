import { Fragment, useEffect } from "react";
import axios from "axios";
import { Route, Routes } from "react-router-dom";

import { useAppSelector, useAppDispatch } from "./hooks/useStore";
import { fetchUser } from "./store/user-actions";

import SearchBar from "./components/GoogleApi/SearchBar";
import Home from "./pages/home/Home";
import Navbar from "./components/Navbar/Navbar";

import "./App.css";
import Header from "./components/header/header";
import MyBooks from "./pages/myBooks/MyBooks";

// Server needs to have cors with credentials true
// Client needs to send withCredentials = true
axios.defaults.withCredentials = true;

function App() {
  const dispatch = useAppDispatch();
  const userStore = useAppSelector((state) => state.userStore);
  const user: User | null = userStore.user;

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  return (
    <Fragment>
      <Header />
      {user ? <Navbar /> : null}
      <Routes>
        <Route path="/" element={<Home />} />
        {user ? <Route path="/books" element={<MyBooks />} /> : null}
      </Routes>
    </Fragment>
  );
}

export default App;
