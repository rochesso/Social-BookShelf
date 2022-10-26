import express, { Request, Response, NextFunction } from "express";

import googleApiRouter from "./googleApi/googleApi.router";
import userDataRouter from "./user";
import authRouter from "./auth/auth.router";

const api = express.Router();

function checkLoggedIn(req: Request, res: Response, next: NextFunction) {
  const isLoggedIn = req.isAuthenticated() && req.user;
  if (!isLoggedIn) {
    return res.status(401).json({
      error: "You must log in!",
    });
  }
  next();
}

// api /v1 routes
api.use("/googleApi", checkLoggedIn, googleApiRouter);
api.use("/user", checkLoggedIn, userDataRouter);
api.use("/auth/google", authRouter);

export default api;
