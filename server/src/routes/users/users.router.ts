import express from "express";
import { checkLoggedIn } from "../../services/passport";

import { httpGetAllUsers, httpGetUserBooks } from "./users.controller";

const usersRouter = express.Router();

// - v1/users routes
usersRouter.get("/", httpGetAllUsers);
usersRouter.get("/:googleId", httpGetUserBooks);

export default usersRouter;
