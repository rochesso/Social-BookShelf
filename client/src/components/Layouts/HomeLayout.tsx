import { Fragment } from "react";
import { useOutlet } from "react-router-dom";
import { useAppSelector } from "../../hooks/useStore";

const HomeLayout = () => {
  const userStore = useAppSelector((state) => state.userStore);
  const outlet = useOutlet();

  if (userStore.user) {
    // return <Navigate to="/user/books" replace />;
  }

  return <Fragment>{outlet}</Fragment>;
};

export default HomeLayout;
