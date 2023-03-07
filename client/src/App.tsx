import { Fragment, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import axios from "axios";

import { useAppDispatch } from "./hooks/useStore";

import { fetchUser } from "./store/user-actions";
import { fetchUserData } from "./store/book-actions";

import HomeLayout from "./components/Layouts/HomeLayout";
import ProtectedLayout from "./components/Layouts/ProtectedLayout";

import Header from "./components/Header/Header";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";

import Search from "./pages/search/Search";
import MyLibrary from "./pages/myLibrary/MyLibrary";
import Home from "./pages/home/Home";
import TbrRoulette from "./pages/TbrRoulette/TbrRoulette";

import styles from "./App.module.css";

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
    <Fragment>
      <Header />
      <Navbar />

      <main className={styles.container}>
        <Routes>
          <Route element={<HomeLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
          </Route>
          <Route path="/user" element={<ProtectedLayout />}>
            <Route path="books" element={<MyLibrary />} />
            <Route path="tbrRoulette" element={<TbrRoulette />} />
          </Route>
        </Routes>
      </main>

      <Footer />
    </Fragment>
  );
}

export default App;
