import { Request, Response } from "express";
import { searchBooks } from "../../models/googleApi.model";

// - /googleApi/search get request - return a list of books from google books api
const httpSearchBooks = async (req: Request, res: Response) => {
  // q is the searched text
  // searchType can be: author, title or all.
  if (req.query.q && req.query.searchType && req.headers.id != null) {
    const q = req.query.q.toString();
    const searchType = req.query.searchType.toString();
    const id = req.headers.id.toString();

    return res.status(200).json(await searchBooks(q, searchType, id));
  }
};

export default httpSearchBooks;
