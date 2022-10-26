import express from "express";

import {
  httpAddUserBooks,
  httpGetAllUserBooks,
  httpRemoveUserBooks,
  httpUpdateUserBooks,
} from "./books.controller";

const booksRouter = express.Router();

// - v1/user/books routes
booksRouter.get("/", httpGetAllUserBooks);
booksRouter.post("/", httpAddUserBooks);
booksRouter.delete("/:bookId", httpRemoveUserBooks);
booksRouter.patch("/", httpUpdateUserBooks);

export default booksRouter;
