import passport from "passport";
import { Request, Response } from "express";

const CLIENT_URL = process.env.CLIENT_URL;

const passportLogin = passport.authenticate("google", {
  scope: ["profile", "email"],
});

const passportCallback = passport.authenticate("google", {
  failureRedirect: "/api/v1/auth/google/loginFailed",
  successRedirect: CLIENT_URL,
  session: true,
});

const httpLoginFailed = async (req: Request, res: Response) => {
  return res.status(401).json({ message: "Failed to login!" });
};

export { passportLogin, passportCallback, httpLoginFailed };
