import { Request, Response } from "express";
import { getUserData, changeUserConfig } from "../../models/userData.model";

// - /userConfig get request - get user configurations
const httpGetUserConfig = async (req: Request, res: Response) => {
  if (req.user) {
    const user = req.user;
    const userData = await getUserData(user.id);
    if (userData) {
      let config: Config;
      config = userData.config;
      return res.status(200).json(config);
    } else {
      const message = "Something went wrong!";
      return res.status(400).json(message);
    }
  }
};

// - /userConfig post request - change user configurations
// - Instead of receiving a single Config object, for example: req.body.config
// - it will receive all configs separately, for example; req.body.config1, req.body.config2
// - the client needs to send an object like this: {config1: 'test1', config2: 'test2', ...}
const httpChangeUserConfig = async (req: Request, res: Response) => {
  if (req.user) {
    const user = req.user;
    const config: Config = req.body;
    const result = await changeUserConfig(user.id, config);
    if (result) {
      return res.status(200).json(result);
    } else {
      const message = "Configuration not updated or something went wrong!";
      return res.status(400).json(message);
    }
  }
};

export { httpChangeUserConfig, httpGetUserConfig };
