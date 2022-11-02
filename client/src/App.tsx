import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import axios from "axios";

import "./App.css";

import { useAppSelector, useAppDispatch } from "./hooks/useStore";

import { fetchUser } from "./store/user-actions";
import { fetchUserData } from "./store/book-actions";

import { bookActions } from "./store/book-slice";

import HomeLayout from "./components/Layouts/HomeLayout";
import ProtectedLayout from "./components/Layouts/ProtectedLayout";

import Search from "./pages/search/Search";
import MyLibrary from "./pages/myLibrary/MyLibrary";
import Home from "./pages/home/Home";

// Server needs to have cors with credentials true
// Client needs to send withCredentials = true
axios.defaults.withCredentials = true;

function App() {
  const dispatch = useAppDispatch();

  // const userStore = useAppSelector((state) => state.userStore);
  // const user = userStore.user;

  useEffect(() => {
    const getData = async () => {
      await dispatch(fetchUser());
      await dispatch(fetchUserData());
    };
    getData();
  }, [dispatch]);

  return (
    <Routes>
      <Route element={<HomeLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
      </Route>
      <Route path="/user" element={<ProtectedLayout />}>
        <Route path="books" element={<MyLibrary />} />
      </Route>
    </Routes>
  );
}

export default App;
