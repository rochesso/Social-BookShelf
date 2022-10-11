import {useCallback} from 'react';
import {httpAddBook} from './requests';

// Can be used as following:
// import useBooks from '../../hooks/useBooks';
// const {addBook} = useBooks();

function useBooks() {
    const addBook = useCallback(
        async (book: CompleteBook) => {

            const response = await httpAddBook(book);
            const success = response.ok;
            if (success) {
                console.log('Book added!');
            } else {
                console.log('Book not added!');

            }
        },
        [httpAddBook]
    );

    return {
        addBook
    };
}

export default useBooks;