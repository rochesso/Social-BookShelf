import { Request, Response } from "express";

const CLIENT_URL = process.env.CLIENT_URL;

// /user get request - search user by email and return user _id
const httpGetLoggedUser = async (req: Request, res: Response) => {
  if (req.user && req.isAuthenticated()) {
    const userData: User = req.user;
    const user = {
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
    };
    if (userData) {
      return res.status(200).json({ user, ok: true });
    } else {
      return res.status(200).json({ message: "User not found!", ok: false });
    }
  } else {
    return res.status(401).json({ message: "User not logged in!", ok: false });
  }
};

const httpLogoutUser = async (req: Request, res: Response) => {
  req.logout((err) => {
    if (err) {
      return err;
    }
  });
  if (CLIENT_URL) {
    res.redirect(CLIENT_URL);
  }
};

export { httpGetLoggedUser, httpLogoutUser };
