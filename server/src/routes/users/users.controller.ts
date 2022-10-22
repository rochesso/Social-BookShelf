import { Request, Response } from "express";
import { addUser, searchUserEmail } from "../../models/users.model";

// /user/add - Add user to database
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

// /user/login - search user by email and return user _id
const httpLoginUser = async (req: Request, res: Response) => {
  const email = req.body.email;
  console.log(email);
  const userId = await searchUserEmail(email);
  if (userId) {
    return res.status(201).json({ userId, ok: true });
  } else {
    return res.status(201).json({ message: "User not found!", ok: false });
  }
};

export { httpAddUser, httpLoginUser };
