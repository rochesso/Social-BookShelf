import { Request, Response } from "express";
import { getUserData, changeUserConfig } from "../../models/userData.model";

// - /userConfig get request - get user configurations
const httpGetUserConfig = async (req: Request, res: Response) => {
  if (req.params.userId != null) {
    const userId = req.params.userId;
    const response = await getUserData(userId);
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
  const config = req.body.config;
  const id = req.body.id;
  const result = await changeUserConfig(id, config);
  return res.status(201).json(result);
};

export { httpChangeUserConfig, httpGetUserConfig };
