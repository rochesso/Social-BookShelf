import usersCollection from "./user.mongo";

const addUser = async (googleProfile: any) => {
  const response = await searchUserByGoogleId(googleProfile.id);
  if (response) {
    const existingUser: User = response;
    console.log("User already exist!");
    return existingUser;
  } else {
    let user: NewUser;
    console.log(googleProfile);
    if (
      googleProfile.name?.givenName &&
      googleProfile.name?.familyName &&
      googleProfile.emails
    ) {
      user = {
        firstName: googleProfile.name.givenName,
        lastName: googleProfile.name.familyName,
        email: googleProfile.emails[0].value,
        googleId: googleProfile.id,
        picture: googleProfile.photos[0].value,
      };
      await usersCollection.create(user);
      console.log("User created!");
      const response = await searchUserByGoogleId(googleProfile.id);
      if (response) {
        const createdUser: User = response;
        return createdUser;
      }
    }
  }
};

const searchUserByGoogleId = async (googleId: string) => {
  const result = await usersCollection.findOne({
    googleId: googleId,
  });
  if (result) {
    const user: User = result;
    return user;
  } else {
    return false;
  }
};

const searchUserById = async (_id: string) => {
  try {
    const result = await usersCollection
      .findById(_id)
      .select({ firstName: 1, lastName: 1, email: 1, picture: 1, googleId: 1 })
      .exec();
    if (result) {
      const user: User = result;
      return user;
    } else {
      return false;
    }
  } catch (error) {
    console.error("searchUserId error!");
  }
};

const getAllUsers = async () => {
  try {
    const result = await usersCollection
      .find()
      .select({ firstName: 1, lastName: 1, googleId: 1, picture: 1, _id: 0 })
      .exec();
    if (result) {
      const users: User[] = result;
      return users;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error getting all users!");
  }
};

export { addUser, searchUserByGoogleId, searchUserById, getAllUsers };
