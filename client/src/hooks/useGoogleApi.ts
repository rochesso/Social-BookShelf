import { useCallback, useState } from "react";

import { googleSearchBooksActions } from "../store/googleSearchBooks-slice";
import { useAppDispatch } from "../hooks/useStore";
import { httpSearchBooksGoogleApi } from "./requests";

// Can be used as following:
// import useGoogleApi from '../../hooks/useGoogleApi';
// const {searchBooksGoogleApi} = useGoogleApi();
function useGoogleApi() {
  const dispatch = useAppDispatch();
  const [errorMessage, setErrorMessage] = useState<null | string>(null);

  const searchBooksGoogleApi = useCallback(
    async (text: string, type: string) => {
      dispatch(googleSearchBooksActions.isSearchingToggle(true));
      const result = await httpSearchBooksGoogleApi(text, type);
      // If any book is found
      if (Array.isArray(result.data)) {
        dispatch(googleSearchBooksActions.isSearchingToggle(false));
        dispatch(googleSearchBooksActions.replaceBooks(result.data));
        setErrorMessage(null);
        // if no books are found
      } else if (typeof result.data === "string") {
        dispatch(googleSearchBooksActions.isSearchingToggle(false));
        dispatch(googleSearchBooksActions.replaceBooks([]));
        setErrorMessage(result.data);
      } else {
        dispatch(googleSearchBooksActions.isSearchingToggle(false));
      }
    },
    [dispatch]
  );

  return {
    searchBooksGoogleApi,
    errorMessage,
  };
}

export default useGoogleApi;
