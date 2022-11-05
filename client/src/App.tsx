import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import axios from "axios";

import "./App.css";

import { useAppDispatch } from "./hooks/useStore";

import { fetchUser } from "./store/user-actions";
import { fetchUserData } from "./store/book-actions";

import HomeLayout from "./components/Layouts/HomeLayout";
import ProtectedLayout from "./components/Layouts/ProtectedLayout";

import Search from "./pages/search/Search";
import MyLibrary from "./pages/myLibrary/MyLibrary";
import Home from "./pages/home/Home";
import Settings from "./pages/settings/Settings";

// Server needs to have cors with credentials true
// Client needs to send withCredentials = true
axios.defaults.withCredentials = true;

function App() {
  const dispatch = useAppDispatch();

  // const userStore = useAppSelector((state) => state.userStore);
  // const user = userStore.user;

  useEffect(() => {
    const getData = async () => {
      const user = await dispatch(fetchUser());
      if (user) {
        await dispatch(fetchUserData());
      }
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
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  );
}

export default App;
