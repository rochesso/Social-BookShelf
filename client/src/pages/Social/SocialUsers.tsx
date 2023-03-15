import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/useStore";
import { fetchUsers } from "../../store/users-actions";

import styles from "./SocialUsers.module.css";

const SocialUsers = () => {
  const dispatch = useAppDispatch();
  const usersStore = useAppSelector((state) => state.usersStore);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const users = usersStore.users.map((user) => {
    if (user.googleId) {
      return (
        <Link key={user.googleId} className={styles.user} to={user.googleId}>
          <div className={styles.user__profile}>
            <img
              className={styles.user__picture}
              src={user.picture}
              alt={`${user.lastName} profile`}
            />
          </div>
          <p className={styles.user__name}>{user.lastName}</p>
        </Link>
      );
    } else {
      return null;
    }
  });

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>
        Discover what is being read by other users!
      </h3>
      <div className={styles.users}>{users}</div>
    </div>
  );
};

export default SocialUsers;
