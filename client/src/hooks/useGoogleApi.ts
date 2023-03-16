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
      const result = await httpSearchBooksGoogleApi(text, type);
      // If any book is found
      if (Array.isArray(result.data)) {
        dispatch(googleSearchBooksActions.replaceBooks(result.data));
        setErrorMessage(null);
        // if no books are found
      } else if (typeof result.data === "string") {
        dispatch(googleSearchBooksActions.replaceBooks([]));
        setErrorMessage(result.data);
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
