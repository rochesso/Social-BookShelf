import { Request, Response } from "express";
import { searchBooks } from "../../models/googleApi.model";

const httpSearchBooks = async (req: Request, res: Response) => {
  // q is the searched text
  if (req.query.q && req.query.searchType && req.headers.id != null) {
    const q = req.query.q.toString();
    const searchType = req.query.searchType.toString();
    const id = req.headers.id.toString();

    return res.status(200).json(await searchBooks(q, searchType, id));
  }
};

export default httpSearchBooks;
