import { Request, Response } from "express";
import {
  addUserBook,
  getUserData,
  removeUserBook,
  updateUserBook,
} from "../../models/userData.model";

// - v1/user/books get request
const httpGetAllUserBooks = async (req: Request, res: Response) => {
  if (req.user) {
    const user = req.user;
    const userData = await getUserData(user.id);
    let books: CompleteBook[] = [];
    if (userData) {
      books = userData.books;
      return res.status(200).json(books);
    }
    return res.status(400).json("Error while fetching data!");
  }
};

// - v1/user/books/ post request - Add an book to user collection
const httpAddUserBooks = async (req: Request, res: Response) => {
  if (req.user) {
    const book = req.body.book;
    const user = req.user;
    const result = await addUserBook(user.id, book);
    if (result) {
      const message = "Book successfully created!";
      return res.status(201).json(message);
    } else {
      const message =
        "Book already exist in your collection or something went wrong!";
      return res.status(400).json(message);
    }
  }
};

// - v1/user/books/:bookId delete request - Remove and book from user collection
const httpRemoveUserBooks = async (req: Request, res: Response) => {
  if (req.user) {
    const bookId = req.params.bookId;
    const user = req.user;
    const result = await removeUserBook(user.id, bookId);
    if (result) {
      return res.status(200).json(result);
    } else {
      const message =
        "Book not removed from your collection or something went wrong!";
      return res.status(400).json(message);
    }
  }
};

// v1/user/books patch request
const httpUpdateUserBooks = async (req: Request, res: Response) => {
  if (req.user != null) {
    const book = req.body.book;
    const user = req.user;
    const result = await updateUserBook(user.id, book);
    if (result) {
      return res.status(200).json(result);
    } else {
      const message = "Book not updated or something went wrong!";
      return res.status(400).json(message);
    }
  }
};

export {
  httpAddUserBooks,
  httpGetAllUserBooks,
  httpRemoveUserBooks,
  httpUpdateUserBooks,
};
