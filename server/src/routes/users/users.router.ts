import express from "express";
import { checkLoggedIn } from "../../services/passport";

import {
  httpGetAllUsers,
  httpGetSocialUserData,
  httpAddFriend,
  httpRemoveFriend,
} from "./users.controller";

const usersRouter = express.Router();

// - v1/users routes
usersRouter.get("/", httpGetAllUsers);
usersRouter.get("/:googleId", httpGetSocialUserData);
usersRouter.post("/:googleId", checkLoggedIn, httpAddFriend);
usersRouter.delete("/:googleId", checkLoggedIn, httpRemoveFriend);

export default usersRouter;
