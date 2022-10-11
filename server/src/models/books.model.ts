import booksCollection from './books.mongo';

const addBook = async (book: CompleteBook) => {
    await booksCollection.findOneAndUpdate(
        {
            id: book.id,
        },
        book,
        {
            upsert: true,
        }
    );
};

export {
    addBook
};