import { Fragment } from "react";
import { Link, Navigate, useOutlet } from "react-router-dom";
import { useAppSelector } from "../../hooks/useStore";
import Header from "../Header/Header";
import Navbar from "../Navbar/Navbar";

const ProtectedLayout = () => {
  const userStore = useAppSelector((state) => state.userStore);
  const outlet = useOutlet();

  if (!userStore.user) {
    return <Navigate to="/" />;
  }

  return (
    <Fragment>
      <Header />
      <Navbar />
      {outlet}
    </Fragment>
  );
};

export default ProtectedLayout;
