import express from "express";
const router = express.Router();

router.get("", function (_req, res) {
  // res.send('test');
  res.send("<html><head></head><body><h1>login</h1></body></html>");
});

export { router as UserRouter };
