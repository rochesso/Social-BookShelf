import  {useEffect} from 'react';
import { useAppSelector, useAppDispatch } from '../../hooks/useStore'

import useBooks from '../../hooks/useBooks';
import Book from '../../components/Book/Book';
// import { configActions } from '../../store/config-slice';
import { bookActions } from "../../store/book-slice";
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
            const sortPreference = configStore.config.sortPreference;
            console.log(sortPreference)
            dispatch(bookActions.sortBooks(sortPreference));

        };
        // call the function
        fetchData()

            // make sure to catch any error
            .catch(console.error);
    }, [configStore.config.sortPreference, dispatch, getAllBooks, getConfig]);

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