import { useEffect, Fragment, memo, useState } from "react";
import { useParams, useNavigate, Routes, Route } from "react-router-dom";
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
import NavBottom from "../../components/NavBottom/NavBottom";

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
      // Resets the slice if you re-render the this page
      setSlice(initialSlice);
      if (googleId) {
        // Check if you already downloaded the user data
        dispatch(usersActions.selectLoadedUser(googleId));
        const selectedUser = usersStore.selectedUser;
        if (!selectedUser || selectedUser === undefined) {
          // Download the user data if you still didn't
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

  // Content to render
  const friendsRoute = (
    <Fragment>
      {hasFriends() ? (
        <Friends userList={friends} />
      ) : (
        <p
          className={styles.warning}
        >{`${socialUser?.user.lastName} is not following anyone!`}</p>
      )}
    </Fragment>
  );

  const friendsTitle = (
    <span className={styles.title}>
      <PageTitle>{`${
        socialUser ? socialUser.user.lastName : null
      }'s Friends!`}</PageTitle>
    </span>
  );

  const booksRoute = (
    <Fragment>
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
    </Fragment>
  );

  const booksTitle = (
    <span className={styles.title}>
      <PageTitle>{`Welcome to ${
        socialUser ? socialUser.user.lastName : null
      }'s Library!`}</PageTitle>
    </span>
  );

  const followButton = isLoggedIn ? (
    !isAdded ? (
      <button className={styles.follow} onClick={addFriendHandler}>
        Follow
      </button>
    ) : (
      <button className={styles.unfollow} onClick={removeFriendHandler}>
        Unfollow
      </button>
    )
  ) : null;

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

            {followButton}

            <Routes>
              <Route path="books" element={booksTitle}></Route>
              <Route path="friends" element={friendsTitle}></Route>
            </Routes>
          </div>

          <Routes>
            <Route path="books" element={booksRoute}></Route>
            <Route path="friends" element={friendsRoute}></Route>
          </Routes>
        </main>
      )}
      <NavBottom
        initialSlice={initialSlice}
        setSlice={setSlice}
        fromExplore={true}
      />
    </Fragment>
  );
});

export default SocialBooks;
