import { Link } from "react-router-dom";

import styles from "./Friends.module.css";

type AppProps = {
  userList: User[];
};

const Friends = ({ userList }: AppProps) => {
  const users = userList.map((user) => {
    if (user.googleId) {
      return (
        <Link
          key={user.googleId}
          className={styles.user}
          to={`/users/${user.googleId}`}
        >
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
      <div className={styles.users}>{users}</div>
    </div>
  );
};

export default Friends;
