import { Fragment } from "react";
import { Navigate, useOutlet } from "react-router-dom";

import { useAppSelector } from "../../hooks/useStore";

const ProtectedLayout = () => {
  const userStore = useAppSelector((state) => state.userStore);
  const outlet = useOutlet();

  if (!userStore.user) {
    return <Navigate to="/" />;
  }

  return <Fragment>{outlet}</Fragment>;
};

export default ProtectedLayout;
