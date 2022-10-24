import { Request, Response } from "express";
import { addUser, searchUserEmail } from "../../models/users.model";

// /user post request - Add user to database
const httpAddUser = async (req: Request, res: Response) => {
  const user = req.body;
  const isAdded = await addUser(user);
  if (isAdded) {
    return res
      .status(201)
      .json({ message: "User created successfully!", ok: true });
  } else {
    return res.status(201).json({ message: "User already exists!", ok: false });
  }
};

// /user get request - search user by email and return user _id
const httpLoginUser = async (req: Request, res: Response) => {
  if (req.headers.email) {
    const email = req.headers.email.toString();
    const userId = await searchUserEmail(email);
    if (userId) {
      return res.status(200).json({ userId, ok: true });
    } else {
      return res.status(200).json({ message: "User not found!", ok: false });
    }
  }
};

export { httpAddUser, httpLoginUser };
