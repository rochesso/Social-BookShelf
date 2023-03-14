import userDataCollection from "./userData.mongo";
import { searchUserById } from "./user.model";

// create a userData inside userDataCollection
const createUserData = async (_id: string) => {
  const user = await searchUserById(_id);
  if (user) {
    const userData: UserData = {
      user: _id,
      googleId: user.googleId,
      books: [],
      config: { sortPreference: "recent" },
    };
    await userDataCollection.create(userData);
  } else {
    return false;
  }
};

// search for a userData inside userDataCollection
const searchUserData = async (_id: string) => {
  const user = await searchUserById(_id);
  if (user) {
    const response = await userDataCollection
      .findOne({
        user: _id,
      })
      .exec();
    if (response) {
      const userData = response;
      return userData;
    } else {
      return false;
    }
  } else {
    return false;
  }
};

// search user books by googleId
const searchUserBooksByGoogleId = async (googleId: string) => {
  const response = await userDataCollection
    .findOne({
      googleId: googleId,
    })
    .exec();
  if (response) {
    const userBooks = response.books;
    return userBooks;
  } else {
    return false;
  }
};

// get a userData inside userDataCollection, if it still doesn't exists, it will create a new userData
const getUserData = async (_id: string) => {
  try {
    let response = await searchUserData(_id);
    let userData: UserData;
    if (response) {
      userData = response;
      return userData;
    } else {
      const isUserCreated = await createUserData(_id);
      if (isUserCreated) {
        response = await searchUserData(_id);
        if (response) {
          userData = response;

          return userData;
        }
      } else {
        return false;
      }
    }
  } catch (error) {
    console.log("getUserData error!");
  }
};

// Change user configuration.
const changeUserConfig = async (id: string, config: Config) => {
  const userData = await searchUserData(id);
  if (userData) {
    const newConfig: Config = { ...userData.config, ...config };
    const isChanged = await userData.updateOne({ config: newConfig });
    if (isChanged) {
      const message = "User configuration updated!";
      return message;
    } else {
      return false;
    }
  }
};

// Add a book to the userData
const addUserBook = async (id: string, book: CompleteBook) => {
  const userData = await searchUserData(id);
  const date = new Date();
  const newBook: CompleteBook = {
    ...book,
    lastModified: date,
    timeAdded: date,
  };
  if (userData) {
    const books = userData.books;
    const isRepeated = books.some((item) => item.googleId === newBook.googleId);
    if (!isRepeated) {
      const isAdded = await userData
        .updateOne({ $push: { books: [newBook] } })
        .exec();
      if (isAdded) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  } else {
    // const message = "User not found!";
    return false;
  }
};

// Remove a book from userData
const removeUserBook = async (userId: string, bookId: string) => {
  const userData = await searchUserData(userId);
  console.log(bookId);
  if (userData) {
    if (bookId && bookId != "undefined") {
      const isRemoved = await userData
        .updateOne({ $pull: { books: { _id: bookId } } })
        .exec();
      if (isRemoved) {
        const message = "Book removed from your collection!";
        return message;
      } else {
        return false;
      }
    } else {
      return false;
    }
  } else {
    return false;
  }
};

// Update a book from userData
const updateUserBook = async (userId: string, book: CompleteBook) => {
  const userData = await searchUserData(userId);
  if (userData) {
    const date = new Date();
    const updatedBook: CompleteBook = { ...book, lastModified: date };
    const isUpdated = await userData
      .updateOne(
        {
          $set: {
            "books.$[element]": updatedBook,
          },
        },
        {
          arrayFilters: [
            {
              "element._id": book._id,
            },
          ],
        }
      )
      .exec();
    if (isUpdated) {
      const message = "Book updated!";
      return message;
    } else {
      return false;
    }
  }
};

export {
  getUserData,
  addUserBook,
  removeUserBook,
  createUserData,
  searchUserData,
  changeUserConfig,
  updateUserBook,
  searchUserBooksByGoogleId,
};
