import { Request, Response } from "express";
import {
  addUserBook,
  getUserData,
  removeUserBook,
} from "../../models/userData.model";

// - /userBooks get request
const httpGetAllUserBooks = async (req: Request, res: Response) => {
  if (req.headers.id != null) {
    const id = req.headers.id.toString();
    const data = await getUserData(id);
    let books: CompleteBook[] = [];
    if (data) {
      if (data.books.length > 0) {
        books = data.books;
      }
    }
    return res.status(200).json(books);
  }
};

// - /userBooks/add post request - Add an book to user collection
const httpAddUserBooks = async (req: Request, res: Response) => {
  const book = req.body.book;
  const id = req.body.id;
  const result = await addUserBook(id, book);
  return res.status(201).json(result);
};

// - /userBooks/remove post request - Remove and book from user collection
const httpRemoveUserBooks = async (req: Request, res: Response) => {
  const book = req.body.book;
  const id = req.body.id;
  const result = await removeUserBook(id, book);
  return res.status(201).json(result);
};

export { httpAddUserBooks, httpGetAllUserBooks, httpRemoveUserBooks };
