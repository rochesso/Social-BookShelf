import { useEffect, Fragment } from "react";
import { useAppSelector, useAppDispatch } from "../../hooks/useStore";

import BookList from "../../components/Book/BookList";
import { fetchBooks } from "../../store/book-actions";
import { bookActions } from "../../store/book-slice";
import { fetchUser } from "../../store/user-actions";

const MyBooks = () => {
  const dispatch = useAppDispatch();
  const configStore = useAppSelector((state) => state.configStore);

  useEffect(() => {
    const getData = async () => {
      await dispatch(fetchBooks());
      dispatch(bookActions.sortBooks(configStore.config.sortPreference));
    };
    getData();
  }, [dispatch]);

  return (
    <Fragment>
      <BookList />
    </Fragment>
  );
};

export default MyBooks;
