import express from "express";
import { checkLoggedIn } from "../../services/passport";

import booksRouter from "./books.router";
import configRouter from "./config.router";
import userRouter from "./user.router";

const userData = express.Router();

// v1/user
userData.use("/", userRouter);

// v1/user/books
userData.use("/books", checkLoggedIn, booksRouter);

// v1/user/config
userData.use("/config", checkLoggedIn, configRouter);

export default userData;
