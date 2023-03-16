import { useEffect } from "react";
import Users from "../../components/Users/Users";
import { useAppDispatch, useAppSelector } from "../../hooks/useStore";
import { fetchUsers } from "../../store/users-actions";

import styles from "./SocialUsers.module.css";

const SocialUsers = () => {
  const dispatch = useAppDispatch();
  const usersStore = useAppSelector((state) => state.usersStore);

  useEffect(() => {
    const getData = async () => {
      await dispatch(fetchUsers());
    };
    getData();
  }, [dispatch]);

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>
        Discover what is being read by other users!
      </h3>
      <div className={styles.users}>
        <Users userList={usersStore.users} />
      </div>
    </div>
  );
};

export default SocialUsers;
