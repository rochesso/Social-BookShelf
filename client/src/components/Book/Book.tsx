import React from 'react';

import plusIcon from '../../assets/svg/plus-svgrepo-com (1).svg';
import styles from './Book.module.css';
import useBooks from '../../hooks/useBooks';


type AppProps = {
    book: CompleteBook
};

const Book = ({book}: AppProps) => {
    const {authors, title, isAdded, categories, imageLinks} = book;
    const {addBook, removeBook} = useBooks();

    //check if author is too long
    let authorsString;
    if (authors) {
        if (authors.length > 1) {
            if (authors.join(', ').length > 50) {
                authorsString = [`${authors.join(', ').substring(0, 50)}...`];
            } else {
                authorsString = [`${authors.join(', ')}`];
            }
        } else {
            authorsString = authors;
        }
    }

    // Check if the title is too long
    let titleString;
    if (title.length > 50) {
        titleString = `${title.substring(0, 50)}...`;
    } else {
        titleString = `${title}`;
    }

    // Check image available
    let cover: string;
    if (imageLinks.thumbnail) {
        cover = imageLinks.thumbnail;
    } else {
        cover = imageLinks.smallThumbnail;
    }

    const addBookHandler = async () => {
        await addBook({...book, isAdded:true});
    };

    const removeBookHandler = async () => {
        await removeBook(book);
    }

    return <div className={styles.container}>
        <img className={styles.cover} src={cover} alt="Book cover"/>
        <div className={styles.information}>
            <h3 className={styles.information__title}>{titleString}</h3>
            <h4 className={styles.information__authors}>{authorsString}</h4>
            <p className={styles.information__categories}>{categories}</p>

{/* Button to add a book to your library */}
            {!isAdded ? <div className={styles.add} onClick={addBookHandler}>
                <img className={styles.add__button} src={plusIcon}
                     alt="Add this book to your library!"/>
                <p className={styles.add__text}>Add to your library!</p>
            </div> : null}

{/* Button to remove a book from your library */}
            {isAdded ? <div className={styles.add} onClick={removeBookHandler}>
                <img className={styles.add__button} src={plusIcon}
                     alt="Remove this book to your library!"/>
                <p className={styles.add__text}>Remove from your library!</p>
            </div> : null}
        </div>
    </div>;
};
export default Book;