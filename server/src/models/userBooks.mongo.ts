import mongoose from "mongoose";

const userBooksSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
  books: [
    {
      id: { type: String, required: true },
      title: { type: String, required: true },
      description: { type: String, required: true },
      authors: { type: [String], required: true, default: [""] },
      categories: { type: [String], required: true, default: [""] },
      isbn: { type: [Object], required: true },
      imageLinks: { type: Object, required: true },
      publishedDate: { type: String, required: true },
      pageCount: { type: Number, required: true },
      averageRating: { type: Number, required: true },
      language: { type: String, required: true },
      isAdded: { type: Boolean, required: true },
    },
  ],
});

export default mongoose.model<UserBooks>(
  "userBooks",
  userBooksSchema,
  "usersBooks"
);
