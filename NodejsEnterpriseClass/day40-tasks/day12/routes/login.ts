import express from "express";
const router = express.Router();

router.get("", (_req, res) => {
  res.send("歡迎來到登入頁");
});

router.post("", (req, res) => {
  const account = req.query.account;
  const password = req.query.password;

  if (!account) res.send("帳號不可為空");
  else if (!password) res.send("密碼不可為空");
  else if (account !== "pogiQQ@gmail.com" || password !== "abc123")
    res.send("帳號或密碼錯誤，請重新輸入!");
  else res.send("登入成功");
});

export { router as loginRoute };