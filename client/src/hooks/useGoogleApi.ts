import {useCallback, useState} from 'react';

import {httpSearchBooksGoogleApi} from './requests';

// Can be used as following:
// import useGoogleApi from '../../hooks/useGoogleApi';
// const {searchBooksGoogleApi} = useGoogleApi();
function useGoogleApi() {
    const [booksResult, setBooksResult] = useState<CompleteBook[]>([]);
    const [errorMessage, setErrorMessage] = useState<null | string>(null);

    const searchBooksGoogleApi = useCallback(
        async (text: string, type: string) => {
            const result = await httpSearchBooksGoogleApi(text, type);
            // If any book is found
            if (Array.isArray(result.data)) {
                setBooksResult(result.data);
                setErrorMessage(null);
                // if no books are found
            } else if (typeof result.data === 'string') {
                setBooksResult([]);
                setErrorMessage(result.data);
            }
        },
        []
    );

    return {
        searchBooksGoogleApi,
        booksResult,
        errorMessage
    };
}

export default useGoogleApi;
