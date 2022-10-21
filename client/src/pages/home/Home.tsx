import React, {useEffect, useState} from 'react';
import { useAppSelector, useAppDispatch } from '../../hooks/useStore'

import useBooks from '../../hooks/useBooks';
import Book from '../../components/Book/Book';
import { bookActions } from '../../store/book-slice';

const Home = () => {
    const dispatch = useAppDispatch();
    const bookStore = useAppSelector((state) => state.bookStore)
    const {getAllBooks} = useBooks();

    useEffect(() => {
        // declare the data fetching function
        const fetchData = async () => {
            await getAllBooks();
        };
        // call the function
        fetchData()

            // make sure to catch any error
            .catch(console.error);
    }, []);

    let books;
    let message;
    if (Array.isArray(bookStore.books)) {
        if (bookStore.books.length > 0) {
            books = bookStore.books.map(book => <Book key={book.id} book={book}/>);
    } else {
        message = 'Start adding books to your collection!'
    }
        }
        
    return <div>{books}{message}</div>;
};

export default Home;