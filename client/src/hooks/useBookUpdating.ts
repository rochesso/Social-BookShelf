import { useCallback, useState } from "react";

// Can be used as following:
// import useGoogleApi from '../../hooks/useGoogleApi';
// const {searchBooksGoogleApi} = useGoogleApi();
function useBookUpdating() {
  const [isUpdating, setIsUpdating] = useState(false);

  const updatingBookHandler = useCallback(() => {
    setIsUpdating((prevState) => !prevState);
  }, []);

  return {
    updatingBookHandler,
    isUpdating,
  };
}

export default useBookUpdating;
