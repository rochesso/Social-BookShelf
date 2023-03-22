import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  googleId: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  authors: { type: [String], required: true, default: [""] },
  categories: { type: [String], required: true, default: [""] },
  industryIdentifiers: { type: [Object], required: true },
  imageLinks: { type: Object, required: true },
  publishedDate: { type: String, required: true },
  pageCount: { type: Number, required: true, min: 0, max: 9999 },
  averageRating: { type: Number, required: true },
  language: { type: String, required: true },
  isAdded: { type: Boolean, required: true },
  lastModified: { type: Date, required: true },
  timeAdded: { type: Date, required: true },
  status: {
    currentPage: { type: Number, required: true, min: 0, max: 9999 },
    reading: { type: String, required: true },
    isFavorite: { type: Boolean, required: true },
    rate: { type: Number, required: true },
  },
});

const userDataSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
  googleId: { type: String, required: true },
  books: [bookSchema],
  friends: [
    { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
  ],
  config: {
    sortPreference: { type: String, required: true },
  },
});

export default mongoose.model<UserData>(
  "userData",
  userDataSchema,
  "usersData"
);
