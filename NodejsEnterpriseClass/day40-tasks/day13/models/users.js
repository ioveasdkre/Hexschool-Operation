const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    nickName: {
      type: String,
      required: [true, "請輸入您的暱稱"],
    },
    gender: {
      type: String,
      required: [true, "請選擇您的生理性別"],
      enum: ["男性", "女性", "跨性別", "不透露"],
    },
    avatar: {
      type: String,
      default: "",
    },
    createdAt: {
      type: Date,
      default: Date.now,
      select: false,
    },
  },
  { versionKey: false }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
