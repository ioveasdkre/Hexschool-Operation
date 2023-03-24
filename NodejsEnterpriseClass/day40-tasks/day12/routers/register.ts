import express from "express";
const router = express.Router();

router.get("", (_req, res) => {
  res.send("歡迎來到註冊頁");
});

router.post("", (req, res) => {
  const nickName = req.query.nickName as string;
  const account = req.query.account as string;
  const password = req.query.password as string;
  const hasLetter = /[a-zA-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const isValid =
    password.length >= 8 &&
    hasLetter &&
    hasNumber &&
    !/[\u4e00-\u9fa5]/.test(password);
    
  const errorMessages: string[] = [];

  if (!nickName || nickName.length < 2) {
    errorMessages.push("請輸入暱稱，且暱稱長度至少為2個字元");
    console.log(nickName);
  }

  if (account === "pogiQQ@gmail.com")
    errorMessages.push("帳號已被註冊，請替換新的Email");
  if (!isValid) {
    errorMessages.push("密碼至少8碼以上，並且中英混合");
  }
  if (errorMessages.length > 0) {
    res.send(errorMessages.join("\n"));
  } else {
    res.send("註冊成功");
  }
});

export { router as registerRouter };
