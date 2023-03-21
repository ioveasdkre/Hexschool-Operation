import express from "express";
import { IProducts } from "../interfaces/productsInterface";
import { ProductsModel } from "../models/productsModel";

const router = express.Router();

router.post("", async function (req, res) {
  try {
    const data: IProducts = req.body;

    if (data.product) {
      // 使用 mongoose 將 data 新增至資料庫
      await ProductsModel.create<IProducts>({
        product: data.product,
        quantity: data.quantity,
        price: data.price,
      });
      
      res.status(200).json({
        status: "success",
        data,
      });
    } else {
      console.log("欄位填寫錯誤");
    }
  } catch (error) {
    console.log(error);
  }
});

export { router as productsRoute };
