import express from "express";

import { httpGetLoggedUser, httpLogoutUser } from "./user.controller";

const userRouter = express.Router();

// - v1/user routes
userRouter.get("/", httpGetLoggedUser);
userRouter.get("/logout", httpLogoutUser);

export default userRouter;
