import mongoose from "mongoose";

const usersSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
});

export default mongoose.model<User>("user", usersSchema, "users");
