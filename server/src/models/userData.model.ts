import userDataCollection from "./userData.mongo";
import { searchUserId } from "./users.model";

// create a userData inside userDataCollection
const createUserData = async (_id: string) => {
  const user = await searchUserId(_id);
  if (user) {
    const userData: UserData = {
      user: _id,
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
  const user = await searchUserId(_id);
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

// get a userData inside userDataCollection, if it still doesn't exists, it will create a new userData
const getUserData = async (_id: string) => {
  let response = await searchUserData(_id);
  let userData: UserData;
  if (response) {
    userData = response;
    const message = "User data found!";
    const ok = true;
    return { userData, message, ok };
  } else {
    const isUserCreated = await createUserData(_id);
    if (isUserCreated) {
      response = await searchUserData(_id);
      if (response) {
        userData = response;
        const message = "User data created!";
        const ok = true;
        return { userData, message, ok };
      }
    } else {
      return false;
    }
  }
};

// Change user configuration.
const changeUserConfig = async (id: string, config: Config) => {
  const user = await searchUserData(id);
  if (user) {
    await user.updateOne({ config: config });
    const message = "User configuration updated!";
    const ok = true;
    return { message, ok };
  }
};

// Add a book to the userData
const addUserBook = async (id: string, book: CompleteBook) => {
  const user = await searchUserData(id);
  const date = new Date();
  const newBook: CompleteBook = { ...book, lastModified: date };
  if (user) {
    const books = user.books;
    const isRepeated = books.some((item) => item.id === newBook.id);
    if (!isRepeated) {
      await user.updateOne({ $push: { books: [newBook] } });
      const message = "Book added to your collection!!";
      const ok = true;
      return { message, ok };
    } else {
      const message = "Book already exists in your collection";
      const ok = false;
      return { message, ok };
    }
  } else {
    const message = "User not found!";
    const ok = false;
    return { message, ok };
  }
};

// Remove a book from userData
const removeUserBook = async (id: string, book: CompleteBook) => {
  const user = await searchUserData(id);
  if (user) {
    await user.updateOne({ $pull: { books: { _id: book._id } } });
    const message = "Book removed from your collection!";
    const ok = true;
    return { message, ok };
  }
};

const updateUserBook = async (id: string, book: CompleteBook) => {
  const userData = await searchUserData(id);
  if (userData) {
    await userData.updateOne(
      {
        $set: {
          "books.$[element].status": book.status,
        },
      },
      {
        arrayFilters: [
          {
            "element._id": book._id,
          },
        ],
      }
    );
    const message = "Book updated!";
    const ok = true;
    return { message, ok };
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
};
