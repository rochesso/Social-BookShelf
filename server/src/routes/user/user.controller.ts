import { Request, Response } from "express";
import { searchUserById } from "../../models/user.model";
import { getUserData } from "../../models/userData.model";

const CLIENT_URL = process.env.CLIENT_URL;

// api/v1/user get request - search user by email and return user _id
const httpGetLoggedUser = async (req: Request, res: Response) => {
  if (req.isAuthenticated() && req.user) {
    const response = await searchUserById(req.user.id);
    if (response) {
      let user: NewUser = {
        firstName: response.firstName,
        lastName: response.lastName,
        email: response.email,
        picture: response.picture,
        googleId: response.googleId,
      };

      return res.status(200).json(user);
    } else {
      return res.status(400).json({ message: "Ops! Something went wrong." });
    }
  } else {
    return res.status(200).json(null);
  }
};

// api/v1/user/logout get request - logout the user.
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

const httpGetUserData = async (req: Request, res: Response) => {
  if (req.user) {
    const user = req.user;
    const data = await getUserData(user.id);
    if (data) {
      const userData = {
        books: data.books,
        config: data.config,
      };
      return res.status(200).json(userData);
    }
    return res.status(400).json("Error while fetching data!");
  }
};

export { httpGetLoggedUser, httpLogoutUser, httpGetUserData };
