import React, {useEffect, useState} from 'react';
import { useAppSelector, useAppDispatch } from '../../hooks/useStore'

import useBooks from '../../hooks/useBooks';
import Book from '../../components/Book/Book';
import { configActions } from '../../store/config-slice';
import useConfig from '../../hooks/useConfig';


const Home = () => {
    const dispatch = useAppDispatch();

    const configStore = useAppSelector((state) => state.configStore)
    const bookStore = useAppSelector((state) => state.bookStore)

    const {getAllBooks} = useBooks();
    const {getConfig} = useConfig()

    useEffect(() => {
        // declare the data fetching function
        const fetchData = async () => {
            await getAllBooks();
            await getConfig();

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
        
    return <div><p>{bookStore.totalQuantity}</p>{books}{message}</div>;
};

export default Home;