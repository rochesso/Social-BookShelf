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

import Search from "./pages/Search/Search";
import MyLibrary from "./pages/MyLibrary/MyLibrary";
import Home from "./pages/Home/Home";
import Friends from "./pages/Friends/Friends";

import TbrRoulette from "./pages/TbrRoulette/TbrRoulette";

import styles from "./App.module.css";
import SocialUsers from "./pages/Social/SocialUsers";
import SocialBooks from "./pages/Social/SocialBooks";

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
            <Route path="/users/:googleId" element={<SocialBooks />} />
            <Route path="/users" element={<SocialUsers />} />
          </Route>
          <Route path="/user" element={<ProtectedLayout />}>
            <Route path="books" element={<MyLibrary />} />
            <Route path="tbrRoulette" element={<TbrRoulette />} />
            <Route path="friends" element={<Friends />} />
          </Route>
        </Routes>
      </main>

      <Footer />
    </Fragment>
  );
}

export default App;
