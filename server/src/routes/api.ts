import express from "express";

import googleApiRouter from "./googleApi/googleApi.router";
import userDataRouter from "./user";

const api = express.Router();

// api /v1 routes
api.use("/googleApi", googleApiRouter);
api.use("/user", userDataRouter);

export default api;
