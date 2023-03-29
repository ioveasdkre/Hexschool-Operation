import { Schema, model } from "mongoose";

interface IUser {
  name: string;
  email: string;
}

const userSchema = new Schema({
  name: String,
  email: String,
});

const User = model<IUser>("User", userSchema);

export { User };
