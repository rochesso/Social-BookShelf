import { Request, Response } from "express";
import {
  addUserBook,
  searchUserBooks,
  removeUserBook,
} from "../../models/userBooks.model";

const httpGetAllUserBooks = async (req: Request, res: Response) => {
  if (req.headers.id != null) {
    const id = req.headers.id.toString();
    const data = await searchUserBooks(id);
    let books: CompleteBook[] = [];
    if (data) {
      if (data.books.length > 0) {
        books = data.books;
      }
    }
    return res.status(200).json(books);
  }
};

const httpAddUserBooks = async (req: Request, res: Response) => {
  const book = req.body.book;
  const id = req.body.id;
  const result = await addUserBook(id, book);
  return res.status(201).json(result);
};

const httpRemoveUserBooks = async (req: Request, res: Response) => {
  const book = req.body.book;
  const id = req.body.id;
  const result = await removeUserBook(id, book);
  return res.status(201).json(result);
};

export { httpAddUserBooks, httpGetAllUserBooks, httpRemoveUserBooks };
