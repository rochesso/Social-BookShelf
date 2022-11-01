import { useEffect } from "react";
import axios from "axios";
import { Route, Routes } from "react-router-dom";

import { useAppSelector, useAppDispatch } from "./hooks/useStore";
import { fetchUser } from "./store/user-actions";
import { fetchConfig } from "./store/config-actions";

import "./App.css";
import HomeLayout from "./components/Layouts/HomeLayout";
import Search from "./pages/search/Search";
import ProtectedLayout from "./components/Layouts/ProtectedLayout";
import MyBooks from "./pages/myBooks/MyBooks";
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
      await dispatch(fetchConfig());
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
        <Route path="books" element={<MyBooks />} />
      </Route>
    </Routes>
  );
}

export default App;
