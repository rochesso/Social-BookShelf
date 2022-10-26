import  {useEffect} from 'react';
import { useAppSelector, useAppDispatch } from '../../hooks/useStore'

import Book from '../../components/Book/Book';
// import { configActions } from '../../store/config-slice';
import { fetchBooks } from "../../store/book-actions";


const Home = () => {
    const dispatch = useAppDispatch();

    const configStore = useAppSelector((state) => state.configStore)
    const bookStore = useAppSelector((state) => state.bookStore)

    useEffect(() => {
            dispatch(fetchBooks());
    }, []);

    let books;
    let message;
    if (Array.isArray(bookStore.books)) {
        if (bookStore.books.length > 0) {
            books = bookStore.books.map(book => <Book key={book.googleId} book={book}/>);
    } else {
        message = 'Start adding books to your collection!'
    }
        }
        
    return <div><p>{bookStore.totalQuantity}</p>{books}{message}</div>;
};

export default Home;