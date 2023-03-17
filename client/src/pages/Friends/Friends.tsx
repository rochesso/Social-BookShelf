import Friends from "../../components/Friends/Friends";
import { useAppSelector } from "../../hooks/useStore";

import styles from "./Friends.module.css";

const SocialUsers = () => {
  const friendsStore = useAppSelector((state) => state.friendsStore);

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Discover what your friends are reading!</h3>
      <div className={styles.users}>
        <Friends userList={friendsStore.friends} />
      </div>
    </div>
  );
};

export default SocialUsers;
