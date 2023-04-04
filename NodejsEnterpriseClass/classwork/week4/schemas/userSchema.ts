import { Schema } from "mongoose";
import { IUser } from "../interfaces/models/userInterface";

const userSchema = new Schema<IUser>({
  name: {
    type: String,
    required: [true, "請輸入您的名字"],
  },
  email: {
    type: String,
    required: [true, "請輸入您的 Email"],
    unique: true, // 唯一值
    lowercase: true, // 英文轉小寫
    select: false, // 預設不返回
  },
  photo: String,
});

export { userSchema };
