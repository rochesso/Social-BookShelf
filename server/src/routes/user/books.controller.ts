import { Request, Response } from "express";
import {
  addUserBook,
  getUserData,
  removeUserBook,
  updateUserBook,
} from "../../models/userData.model";

// - v1/user/books/:userId get request
const httpGetAllUserBooks = async (req: Request, res: Response) => {
  if (req.user != null) {
    const user = req.user;
    const response = await getUserData(user.id);
    let books: CompleteBook[] = [];
    if (response) {
      if (response.ok) {
        books = response.userData.books;
        return res.status(200).json(books);
      }
    }
    return res.status(200).json("Error while fetching data!");
  } else {
    return res.status(200).json("userId can't be null!");
  }
};

// - v1/user/books/ post request - Add an book to user collection
const httpAddUserBooks = async (req: Request, res: Response) => {
  if (req.user != null) {
    const book = req.body.book;
    const user = req.user;
    const result = await addUserBook(user.id, book);
    return res.status(201).json(result);
  }
};

// - v1/user/books/:userId/:bookId delete request - Remove and book from user collection
const httpRemoveUserBooks = async (req: Request, res: Response) => {
  if (req.user != null) {
    const bookId = req.params.bookId;
    const user = req.user;
    const result = await removeUserBook(user.id, bookId);
    return res.status(201).json(result);
  }
};

// v1/user/books/:userId patch request
const httpUpdateUserBooks = async (req: Request, res: Response) => {
  if (req.user != null) {
    const book = req.body.book;
    const user = req.user;
    const result = await updateUserBook(user.id, book);
    return res.status(200).json(result);
  }
};

export {
  httpAddUserBooks,
  httpGetAllUserBooks,
  httpRemoveUserBooks,
  httpUpdateUserBooks,
};
