import express from "express";

import {
  passportLogin,
  passportCallback,
  httpLoginFailed,
} from "./auth.controller";

const authRouter = express.Router();

// routes for authentication
// v1/auth/google
authRouter.get("/", passportLogin);
authRouter.get("/loginFailed", httpLoginFailed);
authRouter.get("/callback", passportCallback);

export default authRouter;
