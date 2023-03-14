import { Request, Response } from "express";
import { getAllUsers } from "../../models/user.model";
import { searchUserBooksByGoogleId } from "../../models/userData.model";

const CLIENT_URL = process.env.CLIENT_URL;

// api/v1/users get request - search user by email and return user _id
const httpGetAllUsers = async (req: Request, res: Response) => {
  const response = await getAllUsers();
  if (response) {
    const users: User[] = response;
    return res.status(200).json(users);
  } else {
    return res.status(400).json({ message: "Ops! Something went wrong." });
  }
};

// api/v1/users/:googleId
const httpGetUserBooks = async (req: Request, res: Response) => {
  const googleId = req.params.googleId;
  const books = await searchUserBooksByGoogleId(googleId);
  if (books) {
    return res.status(200).json(books);
  }
  return res.status(400).json("Error while fetching data!");
};

export { httpGetAllUsers, httpGetUserBooks };
