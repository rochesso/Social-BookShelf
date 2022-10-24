import express from "express";

import { httpChangeUserConfig, httpGetUserConfig } from "./config.controller";

const userConfigRouter = express.Router();

// - v1/user/config routes
userConfigRouter.get("/:userId", httpGetUserConfig);
userConfigRouter.patch("/:userId", httpChangeUserConfig);

export default userConfigRouter;
