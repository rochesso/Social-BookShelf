import { Fragment } from "react";
import { Navigate, useOutlet } from "react-router-dom";
import { useAppSelector } from "../../hooks/useStore";
import Header from "../Header/Header";
import Navbar from "../Navbar/Navbar";

const HomeLayout = () => {
  const userStore = useAppSelector((state) => state.userStore);
  const outlet = useOutlet();

  if (userStore.user) {
    // return <Navigate to="/user/books" replace />;
  }

  return (
    <Fragment>
      <Header />
      <Navbar />
      {outlet}
    </Fragment>
  );
};

export default HomeLayout;
