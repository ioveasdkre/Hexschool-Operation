// Day 14 - req.query 篩選網址參數

// https://hackmd.io/36L35CVPQCeGJvjZ4WtxgA

import express from "express";
const app = express();

'http://localhost:3000/products?category=music&page=1' // 在 POSTMAN 發出 GET 請求
app.get("/products", function (req, res) {
  // 取出參數
  /* 請在此填寫答案*/
  const category = req.query.category;
  const page = req.query.page;

  res.status(200).json({
    status: "success",
    data: {
      category,
      page,
    },
  });
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
