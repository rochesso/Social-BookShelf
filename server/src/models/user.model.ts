import usersCollection from "./user.mongo";

const addUser = async (googleProfile: any) => {
  const response = await searchUserByGoogleId(googleProfile.id);
  if (response) {
    const existingUser: User = response;
    console.log("User already exist!");
    return existingUser;
  } else {
    let user: NewUser;
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
    const result = await usersCollection.findById(_id);
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

export { addUser, searchUserByGoogleId, searchUserById };
