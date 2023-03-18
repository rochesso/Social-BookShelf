import Friends from "../../components/Friends/Friends";
import PageTitle from "../../components/PageTitle/PageTitle";
import { useAppSelector } from "../../hooks/useStore";

import styles from "./Friends.module.css";

const SocialUsers = () => {
  const friendsStore = useAppSelector((state) => state.friendsStore);

  return (
    <main className={styles.container}>
      <PageTitle>Discover what your friends are reading!</PageTitle>
      <Friends userList={friendsStore.friends} />
    </main>
  );
};

export default SocialUsers;
