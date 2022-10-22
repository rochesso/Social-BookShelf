import userDataCollection from "./userData.mongo";

// create a userData inside userDataCollection
const createUserData = async (_id: string) => {
  const userData: UserData = {
    user: _id,
    books: [],
    config: { sortPreference: "recent" },
  };
  await userDataCollection.create(userData);
};

// search for a userData inside userDataCollection
const searchUserData = async (_id: string) => {
  const userData = await userDataCollection
    .findOne({
      user: _id,
    })
    .exec();
  return userData;
};

// get a userData inside userDataCollection, if it still doesn't exists, it will create a new userData
const getUserData = async (_id: string) => {
  const userData = await searchUserData(_id);
  if (userData) {
    return userData;
  } else {
    await createUserData(_id);
    return await searchUserData(_id);
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

export {
  getUserData,
  addUserBook,
  removeUserBook,
  createUserData,
  searchUserData,
};
