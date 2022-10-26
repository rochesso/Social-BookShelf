import express from "express";

import { httpChangeUserConfig, httpGetUserConfig } from "./config.controller";

const configRouter = express.Router();

// - v1/user/config routes
configRouter.get("/", httpGetUserConfig);
configRouter.patch("/", httpChangeUserConfig);

export default configRouter;
