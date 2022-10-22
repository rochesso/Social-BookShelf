import { useCallback } from "react";
import { httpGetConfig } from "./requests";
import { useAppDispatch } from "../hooks/useStore";
import { configActions } from "../store/config-slice";

// Can be used as following:
// import useBooks from '../../hooks/useBooks';
// const {addBook} = useBooks();

function useConfig() {
  const dispatch = useAppDispatch();

  const getConfig = useCallback(async () => {
    const response = await httpGetConfig();
    if (response) {
      const success = response.ok;
      if (success) {
        dispatch(configActions.replaceConfig(response.config));
      } else {
      }
    }
  }, [dispatch]);

  //   const replaceConfig = useCallback(
  //     async (book: CompleteBook) => {
  //       const response = await httpRemoveBook(book);
  //       const success = response.ok;
  //       if (success) {
  //         dispatch(bookActions.removeBook(book));
  //       } else {
  //       }
  //     },
  //     [dispatch]
  //   );

  return {
    getConfig,
    // replaceConfig,
  };
}

export default useConfig;
