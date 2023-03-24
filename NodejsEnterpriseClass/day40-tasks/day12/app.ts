// Day 12 - 設計基本路由

// https://hackmd.io/_2_FdGD4T6yz-6MewRSTxQ

import express from "express";
import { loginRouter } from "./routes/login";
import { registerRouter } from "./routes/register";
import { postsRouter } from "./routes/posts";
import { userRouter } from "./routes/user";

const app = express();

app.use("/login", loginRouter);
app.use("/register", registerRouter);
app.use("/posts", postsRouter);
app.use("/user", userRouter);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
