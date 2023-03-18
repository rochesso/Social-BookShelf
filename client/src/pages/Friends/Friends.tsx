import { NavLink } from "react-router-dom";
import Friends from "../../components/Friends/Friends";
import PageTitle from "../../components/PageTitle/PageTitle";
import { useAppSelector } from "../../hooks/useStore";

import styles from "./Friends.module.css";

const SocialUsers = () => {
  const friendsStore = useAppSelector((state) => state.friendsStore);

  return (
    <main className={styles.container}>
      <PageTitle>Discover what your friends are reading!</PageTitle>
      {friendsStore.friends.length > 0 ? (
        <Friends userList={friendsStore.friends} />
      ) : (
        <p className={styles.warning}>
          What are you waiting to make new friends?{" "}
          <NavLink className={styles.search} to={"/users"}>
            Click here
          </NavLink>{" "}
          to start!
        </p>
      )}
    </main>
  );
};

export default SocialUsers;
