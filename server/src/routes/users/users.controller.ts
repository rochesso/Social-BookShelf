import { Request, Response } from "express";
import { getAllUsers } from "../../models/user.model";
import {
  searchFriendDataByGoogleId,
  addFriend,
  removeFriend,
} from "../../models/userData.model";

const CLIENT_URL = process.env.CLIENT_URL;

// api/v1/users get request - search user by email and return user _id
const httpGetAllUsers = async (req: Request, res: Response) => {
  const response = await getAllUsers();
  if (response) {
    const users: User[] = response;

    // Remove yourself from the users list
    const filteredUsers = users.filter(
      (user) => user.googleId !== req.user?.googleId
    );
    return res.status(200).json(filteredUsers);
  } else {
    return res.status(400).json({ message: "Ops! Something went wrong." });
  }
};

// api/v1/users/:googleId
const httpGetSocialUserData = async (req: Request, res: Response) => {
  const googleId = req.params.googleId;
  const response = await searchFriendDataByGoogleId(googleId);
  if (response) {
    const socialUser = response.friend;
    const socialUserBooks = response.friendBooks;

    // Remove yourself from the friends list
    const filteredSocialUserFriends: User[] = response.friendsOfFriend.filter(
      (friend) => friend.googleId !== req.user?.googleId
    );

    const socialUserData = {
      socialUser,
      socialUserBooks,
      filteredSocialUserFriends,
    };
    return res.status(200).json(socialUserData);
  }
  return res.status(400).json("Error while fetching data!");
};

const httpAddFriend = async (req: Request, res: Response) => {
  if (req.user) {
    const friendGoogleId = req.params.googleId;
    const user = req.user;
    const response = await addFriend(user, friendGoogleId);
    if (response) {
      return res.status(200).json(response);
    }
    return res.status(304).json("Friend already exist");
  } else {
    return false;
  }
};

const httpRemoveFriend = async (req: Request, res: Response) => {
  if (req.user) {
    const friendGoogleId = req.params.googleId;
    const user = req.user;
    const result = await removeFriend(user.id, friendGoogleId);
    if (result) {
      return res.status(200).json(result);
    } else {
      const message =
        "Friend not removed from your collection or something went wrong!";
      return res.status(400).json(message);
    }
  }
};

export {
  httpGetAllUsers,
  httpGetSocialUserData,
  httpAddFriend,
  httpRemoveFriend,
};
