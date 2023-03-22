import mongoose from "mongoose";

interface IPost {
  title: string;
  content: string;
}

// 定義資料表結構, 第二個 object為可選
const postSchema = new mongoose.Schema<IPost>({
  title: {
    type: "string",
    required: [true, "文章標題未填寫"],
  },
  content: {
    type: "string",
    required: [true, "文章內容未填寫"],
  },
});

// 開頭字小寫
// 結尾強制加上 s
const Post = mongoose.model<IPost>("Post", postSchema);

export { Post, IPost };
