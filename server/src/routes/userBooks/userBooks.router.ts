import express from "express";

import {
  httpAddUserBooks,
  httpGetAllUserBooks,
  httpRemoveUserBooks,
  httpUpdateUserBooks,
} from "./userBooks.controller";

const userBooksRouter = express.Router();

// - /userBooks routes
userBooksRouter.get("/", httpGetAllUserBooks);
userBooksRouter.post("/add", httpAddUserBooks);
userBooksRouter.post("/remove", httpRemoveUserBooks);
userBooksRouter.post("/update", httpUpdateUserBooks);

export default userBooksRouter;
