import mongoose, { Model } from "mongoose";

const { DATABASE_URL } = process.env;

export const connect = async () => {
  const conn = await mongoose
    .connect(DATABASE_URL)
    .catch((err) => console.log(err));
  console.log("Mongoose Connection Established");

  // Todo Schema
  const TodoSchema = new mongoose.Schema({
    item: String,
    completed: Boolean,
  });

  // Todo Model
  const Todo = mongoose.models.Todo || mongoose.model("Todo", TodoSchema);

  return { conn, Todo };
};
