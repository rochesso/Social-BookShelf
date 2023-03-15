import { Fragment, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/useStore";
import { fetchBooks, searchSocialLibrary } from "../../store/users-actions";
import BookList from "../../components/Book/BookList";
import backIcon from "../../assets/svg/back-arrows-svgrepo-com.svg";
import styles from "./SocialBooks.module.css";

const SocialBooks = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { googleId } = useParams();
  const usersStore = useAppSelector((state) => state.usersStore);
  const user: User | undefined = usersStore.users.find(
    (user) => user.googleId === googleId
  );

  useEffect(() => {
    const getBooks = async () => {
      if (googleId) {
        await dispatch(fetchBooks(googleId));
        await dispatch(searchSocialLibrary("", "all"));
      }
    };
    getBooks();
  }, [dispatch, googleId]);

  const navigateBack = () => {
    navigate(-1);
  };

  const books = usersStore.filteredBooks;

  return (
    <Fragment>
      <img
        className={styles.backIcon}
        onClick={navigateBack}
        src={backIcon}
        alt="Go back"
      />
      <h3 className={styles.user}>
        Welcome to {user ? user.lastName : null} Library!
      </h3>
      <BookList bookList={books} from={"social"} />
    </Fragment>
  );
};

export default SocialBooks;
