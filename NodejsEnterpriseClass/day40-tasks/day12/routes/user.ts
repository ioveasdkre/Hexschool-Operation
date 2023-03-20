import express from "express";
const router = express.Router();

router.get("/:id", (req, res) => {
  const id = req.params.id;
  res.send(`${id} 個人頁面`);
});

router.get("/:id/track", (req, res) => {
  const id = req.params.id;
  res.send(`${id} 個人追蹤名單`);
});

export { router as userRoute };
