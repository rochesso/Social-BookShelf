import { Fragment, useEffect } from "react";
import { Navigate, useOutlet } from "react-router-dom";

import { useAppSelector, useAppDispatch } from "../../hooks/useStore";
import { fetchConfig } from "../../store/config-actions";

import Header from "../Header/Header";
import Navbar from "../Navbar/Navbar";

const ProtectedLayout = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const getData = async () => {
      await dispatch(fetchConfig());
    };
    getData();
  }, [dispatch]);

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
