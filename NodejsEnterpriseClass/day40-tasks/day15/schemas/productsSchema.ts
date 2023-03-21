import { Schema } from "mongoose";
import { IProducts } from "../interfaces/productsInterface";

const productsSchema = new Schema<IProducts>({
  product: {
    type: String,
    required: [true, "產品名稱未填寫"],
  },
  quantity: {
    type: Number,
    required: [true, "數量未填寫"],
  },
  price: {
    type: Number,
    required: [true, "價錢未填寫"],
  },
});

export { productsSchema };
