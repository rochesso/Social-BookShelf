import { Request, Response } from "express";
import { getUserData, changeUserConfig } from "../../models/userData.model";

// - /userConfig get request - get user configurations
const httpGetUserConfig = async (req: Request, res: Response) => {
  if (req.user != null) {
    const user = req.user;
    const response = await getUserData(user.id);
    if (response) {
      const success = response.ok;
      let config: Config;
      if (success) {
        config = response.userData.config;
        return res.status(200).json({ config, ok: success });
      } else {
        return res.status(200).json({ ok: success });
      }
    }
  }
};

// - /userConfig post request - change user configurations
const httpChangeUserConfig = async (req: Request, res: Response) => {
  if (req.user != null) {
    const user = req.user;
    const config = req.body.config;
    const result = await changeUserConfig(user.id, config);
    return res.status(201).json(result);
  }
};

export { httpChangeUserConfig, httpGetUserConfig };
