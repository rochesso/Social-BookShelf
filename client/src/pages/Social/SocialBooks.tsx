import { useEffect, Fragment } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/useStore";
import {
  fetchSocialUserData,
  searchSocialLibrary,
} from "../../store/users-actions";
import { usersActions } from "../../store/users-slice";
import { addFriend, removeFriend } from "../../store/friends-actions";

import BookList from "../../components/Book/BookList";
import styles from "./SocialBooks.module.css";
import Friends from "../../components/Friends/Friends";
import PageTitle from "../../components/PageTitle/PageTitle";
import Loading from "../../components/Loading/Loading";

const SocialBooks = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { googleId } = useParams();
  const usersStore = useAppSelector((state) => state.usersStore);
  const friendsStore = useAppSelector((state) => state.friendsStore);

  const socialUser = usersStore.selectedUser;
  const books = usersStore.filteredBooks;

  useEffect(() => {
    const getData = async () => {
      if (googleId) {
        dispatch(usersActions.selectLoadedUser(googleId));
        const selectedUser = usersStore.selectedUser;
        if (!selectedUser || selectedUser === undefined) {
          await dispatch(fetchSocialUserData(googleId));
          await dispatch(searchSocialLibrary("", "all"));
        } else {
          await dispatch(searchSocialLibrary("", "all"));
        }
      }
    };
    getData();
  }, [dispatch, googleId, usersStore.selectedUser]);

  const navigateBack = () => {
    navigate(-1);
  };

  const addFriendHandler = async () => {
    if (socialUser) {
      await dispatch(addFriend(socialUser.user));
    } else {
      return false;
    }
  };

  const removeFriendHandler = async () => {
    if (googleId) {
      await dispatch(removeFriend(googleId));
    } else {
      return false;
    }
  };

  const isAdded = friendsStore.friends.some(
    (friend) => friend.googleId === googleId
  );

  return (
    <Fragment>
      {usersStore.isLoading ? (
        <Loading />
      ) : (
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
                socialUser ? socialUser.user.lastName : null
              }'s Library!`}</PageTitle>
            </span>
          </div>

          <BookList bookList={books} from={"social"} />

          <PageTitle>{`${
            socialUser ? socialUser.user.lastName : null
          }'s Friends!`}</PageTitle>

          <Friends userList={socialUser ? socialUser.friends : []} />
        </div>
      )}
    </Fragment>
  );
};

export default SocialBooks;
