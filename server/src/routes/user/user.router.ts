import express from "express";

import { httpAddUser, httpLoginUser } from "./user.controller";

const userRouter = express.Router();

// - v1/user routes
userRouter.get("/", httpLoginUser);
userRouter.post("/", httpAddUser);

export default userRouter;
