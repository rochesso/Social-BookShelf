import express from "express";

import googleApiRouter from "./googleApi/googleApi.router";
import userDataRouter from "./user";
import authRouter from "./auth/auth.router";

import usersDataRouter from "./users/users.router";

const api = express.Router();

// api /v1 routes
api.use("/googleApi", googleApiRouter);
api.use("/user", userDataRouter);
api.use("/auth/google", authRouter);

// This route is for the social part of the app
api.use("/users", usersDataRouter);

export default api;
