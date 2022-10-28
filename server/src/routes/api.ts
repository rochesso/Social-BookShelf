import express, { Request, Response, NextFunction } from "express";

import googleApiRouter from "./googleApi/googleApi.router";
import userDataRouter from "./user";
import authRouter from "./auth/auth.router";

const api = express.Router();

// api /v1 routes
api.use("/googleApi", googleApiRouter);
api.use("/user", userDataRouter);
api.use("/auth/google", authRouter);

export default api;
