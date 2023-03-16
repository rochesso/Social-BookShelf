import { Fragment, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/useStore";
import {
  fetchSocialUserData,
  searchSocialLibrary,
  fetchUsers,
} from "../../store/users-actions";
import { fetchFriends } from "../../store/friends-actions";
import { addFriend, removeFriend } from "../../store/friends-actions";

import BookList from "../../components/Book/BookList";
import backIcon from "../../assets/svg/back-arrows-svgrepo-com.svg";
import styles from "./SocialBooks.module.css";
import Friends from "../../components/Friends/Friends";

const SocialBooks = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { googleId } = useParams();
  const usersStore = useAppSelector((state) => state.usersStore);
  const friendsStore = useAppSelector((state) => state.friendsStore);

  const user: User | undefined = usersStore.users.find(
    (user) => user.googleId === googleId
  );

  useEffect(() => {
    const getData = async () => {
      if (googleId) {
        await dispatch(fetchSocialUserData(googleId));
        await dispatch(searchSocialLibrary("", "all"));
        await dispatch(fetchFriends());
        if (usersStore.users.length === 0) {
          await dispatch(fetchUsers());
        }
      }
    };
    getData();
  }, [dispatch, googleId, usersStore.users.length]);

  const navigateBack = () => {
    navigate(-1);
  };

  const addFriendHandler = async () => {
    if (googleId) {
      await dispatch(addFriend(googleId));
      await dispatch(fetchFriends());
    } else {
      return false;
    }
  };

  const removeFriendHandler = async () => {
    if (googleId) {
      await dispatch(removeFriend(googleId));
      await dispatch(fetchFriends());
    } else {
      return false;
    }
  };

  const isAdded = friendsStore.friends.some(
    (friend) => friend.googleId === googleId
  );

  const books = usersStore.filteredBooks;

  return (
    <Fragment>
      <img
        className={styles.backIcon}
        onClick={navigateBack}
        src={backIcon}
        alt="Go back"
      />
      {!isAdded ? (
        <button className={styles.follow} onClick={addFriendHandler}>
          Follow
        </button>
      ) : (
        <button className={styles.follow} onClick={removeFriendHandler}>
          Unfollow
        </button>
      )}

      <h3 className={styles.user}>
        Welcome to {user ? user.lastName : null}'s Library!
      </h3>

      <BookList bookList={books} from={"social"} />

      <h3 className={styles.user}>{user ? user.lastName : null}'s Friends!</h3>

      <Friends userList={usersStore.friends} />
    </Fragment>
  );
};

export default SocialBooks;
