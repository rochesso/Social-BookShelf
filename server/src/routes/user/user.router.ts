import express from "express";
import { checkLoggedIn } from "../../services/passport";

import { httpGetLoggedUser, httpLogoutUser } from "./user.controller";

const userRouter = express.Router();

// - v1/user routes
userRouter.get("/", httpGetLoggedUser);
userRouter.get("/logout", checkLoggedIn, httpLogoutUser);

export default userRouter;
