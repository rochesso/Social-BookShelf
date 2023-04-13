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
          to={`/users/${user.googleId}/books`}
        >
          <img
            className={styles.picture}
            src={user.picture}
            alt={`${user.lastName} profile`}
          />
          <p className={styles.name}>{user.lastName}</p>
        </Link>
      );
    } else {
      return null;
    }
  });

  return <section className={styles.users}>{users}</section>;
};

export default Friends;
