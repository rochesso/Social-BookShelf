import { Fragment, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/useStore";
import { searchMyLibrary } from "../../store/book-actions";

import BookList from "../../components/Book/BookList";

const MyLibrary = () => {
  const dispatch = useAppDispatch();
  const BookStore = useAppSelector((state) => state.bookStore);

  useEffect(() => {
    dispatch(searchMyLibrary("", "all"));
  }, [dispatch]);

  const books = BookStore.filteredBooks;

  return (
    <Fragment>
      <BookList bookList={books} from={"user"} />
    </Fragment>
  );
};

export default MyLibrary;
