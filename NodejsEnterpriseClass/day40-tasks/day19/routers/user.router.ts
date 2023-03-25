import express from "express";
const router = express.Router();

router.get("", function (_req, res) {
  // res.send('test');
  res.send("<html><head></head><body><h1>photo</h1></body></html>");
});

// : 動態參數
router.get("/:name", function (req, res) {
  const myName = req.params.name; // req.params 讀取動態參數
  const limit = req.query.limit; // req.query 讀取參數
  const q = req.query.q;

  if (myName !== "tom") {
    res.send(
      "<html><head></head><body><h1>" + "查無此人" + "</h1></body></html>"
    );
  } else {
    res.send(
      "<html><head></head><body><h1>" +
        myName +
        "想要找關鍵字叫做" +
        q +
        "的資料" +
        "是要找前" +
        limit +
        "筆資料" +
        "</h1></body></html>"
    );
  }
});

export { router as userRouter };
