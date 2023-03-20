// Day 12 - 設計基本路由

// https://hackmd.io/_2_FdGD4T6yz-6MewRSTxQ

import express from "express";
import { loginRoute } from "./routes/login";
import { registerRouter } from "./routes/register";
import { postsRoute } from "./routes/posts";
import { userRoute } from "./routes/user";

const app = express();

app.use("/login", loginRoute);
app.use("/register", registerRouter);
app.use("/posts", postsRoute);
app.use("/user", userRoute);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
