import express from "express";

import googleApiRouter from "./googleApi/googleApi.router";
import userBooksRouter from "./userBooks/userBooks.router";
import usersRouter from "./users/users.router";
import userConfigRouter from "./userConfig/userConfig.router";

const api = express.Router();

// api routes
api.use("/googleApi", googleApiRouter);
api.use("/userBooks", userBooksRouter);
api.use("/user", usersRouter);
api.use("/userConfig", userConfigRouter);

export default api;
