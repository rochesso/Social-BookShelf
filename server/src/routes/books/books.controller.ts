import {Request, Response} from 'express';
import {addBook} from '../../models/books.model';

const httpAddBook = async (req: Request, res: Response) => {
    const book = req.body;
    await addBook(book);
    return res.status(201).json(book);
};

export {
    httpAddBook
};
