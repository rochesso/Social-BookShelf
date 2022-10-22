import express from "express";

import {
  httpChangeUserConfig,
  httpGetUserConfig,
} from "./userConfig.controller";

const userConfigRouter = express.Router();

// - /userConfig routes
userConfigRouter.get("/", httpGetUserConfig);
userConfigRouter.post("/", httpChangeUserConfig);

export default userConfigRouter;
