import { Fragment, useEffect } from "react";
import { useAppDispatch } from "../../hooks/useStore";
import { searchMyLibrary } from "../../store/book-actions";

import BookList from "../../components/Book/BookList";

const MyLibrary = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(searchMyLibrary("", "all"));
  }, [dispatch]);

  return (
    <Fragment>
      <BookList />
    </Fragment>
  );
};

export default MyLibrary;
