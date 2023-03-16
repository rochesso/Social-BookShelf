import { useEffect } from "react";
import Friends from "../../components/Friends/Friends";
import { useAppDispatch, useAppSelector } from "../../hooks/useStore";
import { fetchFriends } from "../../store/friends-actions";

import styles from "./Friends.module.css";

const SocialUsers = () => {
  const dispatch = useAppDispatch();
  const friendsStore = useAppSelector((state) => state.friendsStore);

  useEffect(() => {
    dispatch(fetchFriends());
  }, [dispatch]);

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
