import usersCollection from "./users.mongo";

const addUser = async (user: User) => {
  const alreadyExists = await usersCollection
    .findOne({
      email: user.email,
    })
    .exec();
  if (alreadyExists) {
    return false;
  } else {
    await usersCollection.create(user);
    return true;
  }
};

const searchUserEmail = async (email: string) => {
  const result = await usersCollection.findOne({
    email: email,
  });

  if (result) {
    return result._id;
  } else {
    return false;
  }
};

const searchUserId = async (id: string) => {
  try {
    const result = await usersCollection.findOne({
      _id: id,
    });
    if (result) {
      return result;
    } else {
      return false;
    }
  } catch (error) {
    console.error("searchUserId error!");
  }
};

export { addUser, searchUserEmail, searchUserId };
