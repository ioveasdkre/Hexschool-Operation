const express = require("express");
const router = express.Router();
const User = require("../models/users");

/* GET users listing. */
router.get("/", async (req, res, next) => {
  const allUser = await User.find();
  res.status(200).json({
    status: "success",
    data: allUser,
  });
});

router.delete("/", async (req, res, next) => {
  await User.deleteMany({});
  res.status(200).json({
    status: "success",
    data: "",
  });
});

router.post("/", async (req, res, next) => {
  try {
    const data = req.body;
    let { nickName, gender, avatar } = data;
    if (!nickName || !gender) {
      // 如果 nickName 或 gender 為空，則回傳失敗
      return res.status(400).json({ message: "失敗" });
    } else {
      // 在 User model 中新增一個新的使用者
      const user = new User({ nickName, gender, avatar });
      await user.save();
      // 回傳成功
      return res.status(200).json({ message: "註冊成功" });
    }
  } catch (error) {
    // 如果出現錯誤，則回傳失敗
    return res.status(500).json({ message: "伺服器發生錯誤" });
  }
});

// 修改
router.patch("/:id", async (req, res, next) => {
  try {
    // 取得 id

    const data = req.body;
    let { nickName, gender, avatar } = data;
    if (!nickName || !gender) {
      // 回傳失敗 "使用者資料未填寫完整"
      return res.status(400).json({ message: "使用者資料未填寫完整" });
    } else {
      const editContent = {
        nickName,
        gender,
      };
      // 找出此筆 id 並編輯資料
      const editUser = await User.findByIdAndUpdate(id, editContent);
      if (editUser) {
        // 回傳成功
        return res.status(404).json({ message: "成功" });
      } else {
        // 回傳失敗 "id 不存在"
        return res.status(404).json({ message: "id 不存在" });
      }
    }
  } catch (error) {
    // 如果出現錯誤，則回傳失敗
    return res.status(500).json({ message: "伺服器發生錯誤" });
  }
});

module.exports = router;
