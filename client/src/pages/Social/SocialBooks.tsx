import { useEffect, Fragment, memo, useState } from "react";
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

const SocialBooks = memo(() => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { googleId } = useParams();
  const usersStore = useAppSelector((state) => state.usersStore);
  const friendsStore = useAppSelector((state) => state.friendsStore);

  // Quantity of books that is showed on the initial render
  const initialSlice = 10;
  const [slice, setSlice] = useState(initialSlice);

  const socialUser = usersStore.selectedUser;
  const filteredBooks = usersStore.filteredBooks;
  const books = usersStore.books;

  useEffect(() => {
    const getData = async () => {
      setSlice(initialSlice);
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

  const isLoggedIn = sessionStorage.getItem("user") as unknown as string;

  let friends: User[] = [];
  const hasFriends = () => {
    if (socialUser) {
      if (socialUser.friends.length > 0) {
        friends = socialUser.friends;
        return true;
      } else {
        friends = [];
        return false;
      }
    }
    friends = [];
    return false;
  };

  return (
    <Fragment>
      {usersStore.isLoading ? (
        <Loading />
      ) : (
        <main className={styles.container}>
          <div className={styles.actions}>
            <button className={styles.backIcon} onClick={navigateBack}>
              Go back
            </button>

            {isLoggedIn ? (
              !isAdded ? (
                <button className={styles.follow} onClick={addFriendHandler}>
                  Follow
                </button>
              ) : (
                <button
                  className={styles.unfollow}
                  onClick={removeFriendHandler}
                >
                  Unfollow
                </button>
              )
            ) : null}
            <span className={styles.title}>
              <PageTitle>{`Welcome to ${
                socialUser ? socialUser.user.lastName : null
              }'s Library!`}</PageTitle>
            </span>
          </div>

          {books.length > 0 ? (
            <BookList
              initialSlice={initialSlice}
              slice={slice}
              setSlice={setSlice}
              bookList={filteredBooks}
              from={"social"}
            />
          ) : (
            <p
              className={styles.warning}
            >{`${socialUser?.user.lastName} has no books yet!`}</p>
          )}

          <PageTitle>{`${
            socialUser ? socialUser.user.lastName : null
          }'s Friends!`}</PageTitle>

          {hasFriends() ? (
            <Friends userList={friends} />
          ) : (
            <p
              className={styles.warning}
            >{`${socialUser?.user.lastName} is not following anyone!`}</p>
          )}
        </main>
      )}
    </Fragment>
  );
});

export default SocialBooks;
