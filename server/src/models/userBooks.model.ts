import userBooksCollection from "./userBooks.mongo";

const searchUserBooks = async (_id: string) => {
  const result = await userBooksCollection
    .findOne({
      user: _id,
    })
    .exec();

  if (result) {
    return result;
  } else {
    await userBooksCollection.create({ user: _id, books: [] });
    return await userBooksCollection
      .findOne({
        user: _id,
      })
      .exec();
  }
};

const addUserBook = async (id: string, book: CompleteBook) => {
  const user = await searchUserBooks(id);
  if (user) {
    const books = user.books;
    const isRepeated = books.some((item) => item.id === book.id);
    if (!isRepeated) {
      await user.updateOne({ $push: { books: [book] } });
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

const removeUserBook = async (id: string, book: CompleteBook) => {
  const user = await searchUserBooks(id);
  if (user) {
    await user.updateOne({ $pull: { books: { _id: book._id } } });
    const message = "Book removed from your collection!";
    const ok = true;
    return { message, ok };
  }
};

export { searchUserBooks, addUserBook, removeUserBook };
