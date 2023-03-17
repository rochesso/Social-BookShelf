import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/useStore";
import {
  fetchSocialUserData,
  searchSocialLibrary,
} from "../../store/users-actions";
import { fetchFriends } from "../../store/friends-actions";
import { addFriend, removeFriend } from "../../store/friends-actions";

import BookList from "../../components/Book/BookList";
import styles from "./SocialBooks.module.css";
import Friends from "../../components/Friends/Friends";
import PageTitle from "../../components/PageTitle/PageTitle";

const SocialBooks = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { googleId } = useParams();
  const usersStore = useAppSelector((state) => state.usersStore);
  const friendsStore = useAppSelector((state) => state.friendsStore);

  const socialUser = usersStore.selectedUser;

  useEffect(() => {
    const getData = async () => {
      if (googleId) {
        await dispatch(fetchSocialUserData(googleId));
        await dispatch(searchSocialLibrary("", "all"));
      }
    };
    getData();
  }, [dispatch, googleId]);

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
    <div className={styles.container}>
      <div className={styles.actions}>
        <button className={styles.backIcon} onClick={navigateBack}>
          Go back
        </button>

        {!isAdded ? (
          <button className={styles.follow} onClick={addFriendHandler}>
            Follow
          </button>
        ) : (
          <button className={styles.unfollow} onClick={removeFriendHandler}>
            Unfollow
          </button>
        )}
        <span className={styles.title}>
          <PageTitle>{`Welcome to ${
            socialUser ? socialUser.lastName : null
          }'s Library!`}</PageTitle>
        </span>
      </div>

      <BookList bookList={books} from={"social"} />

      <PageTitle>{`${
        socialUser ? socialUser.lastName : null
      }'s Friends!`}</PageTitle>

      <Friends userList={usersStore.friends} />
    </div>
  );
};

export default SocialBooks;
