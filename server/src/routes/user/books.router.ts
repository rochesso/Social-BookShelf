import express from "express";

import {
  httpAddUserBooks,
  httpGetAllUserBooks,
  httpRemoveUserBooks,
  httpUpdateUserBooks,
} from "./books.controller";

const userBooksRouter = express.Router();

// - v1/user/books routes
userBooksRouter.get("/:userId", httpGetAllUserBooks);
userBooksRouter.post("/:userId", httpAddUserBooks);
userBooksRouter.delete("/:userId/:bookId", httpRemoveUserBooks);
userBooksRouter.patch("/:userId", httpUpdateUserBooks);

export default userBooksRouter;
