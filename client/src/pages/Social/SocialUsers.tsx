import { useEffect, memo } from "react";
import Loading from "../../components/Loading/Loading";
import PageTitle from "../../components/PageTitle/PageTitle";
import Users from "../../components/Users/Users";
import { useAppDispatch, useAppSelector } from "../../hooks/useStore";
import { fetchUsers } from "../../store/users-actions";

import styles from "./SocialUsers.module.css";

const SocialUsers = memo(() => {
  const dispatch = useAppDispatch();
  const usersStore = useAppSelector((state) => state.usersStore);

  useEffect(() => {
    const getData = async () => {
      if (usersStore.users.length === 0) {
        await dispatch(fetchUsers());
      }
    };
    getData();
  }, [dispatch, usersStore.users.length]);

  return (
    <main className={styles.container}>
      <PageTitle> Discover what is being read by other users!</PageTitle>
      {!usersStore.isLoading ? (
        <Users userList={usersStore.users} />
      ) : (
        <Loading />
      )}
    </main>
  );
});

export default SocialUsers;
