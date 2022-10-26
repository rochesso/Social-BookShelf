import { Request, Response } from "express";
import { searchBooks } from "../../models/googleApi.model";

// - /googleApi/search get request - return a list of books from google books api
const httpSearchBooks = async (req: Request, res: Response) => {
  // q is the searched text
  // searchType can be: author, title or all.
  if (req.query.q && req.query.searchType && req.user) {
    const q = req.query.q.toString();
    const searchType = req.query.searchType.toString();
    const user = req.user;

    return res.status(200).json(await searchBooks(q, searchType, user.id));
  } else {
    if (req.query.q && req.query.searchType) {
      const q = req.query.q.toString();
      const searchType = req.query.searchType.toString();

      return res.status(200).json(await searchBooks(q, searchType));
    }
  }
};

export default httpSearchBooks;
