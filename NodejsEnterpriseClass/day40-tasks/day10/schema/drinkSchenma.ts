import { Schema } from "mongoose";
import { IDrink } from "../interfaces/drinkInterface";

const drinkSchema = new Schema<IDrink>(
  {
    product: {
      type: String,
      required: [true, "產品名稱未填寫"],
    },
    price: {
      type: Number,
      required: [true, "價錢未填寫"],
    },
    ice: {
      type: String,
      default: "正常冰",
    },
    sugar: {
      type: String,
      default: "全糖",
    },
    toppings: {
      type: [String],
    },
    createdAt: {
      type: Date,
      default: Date.now, // 預設時間
      select: false,
    },
  },
  {
    versionKey: false,
  }
);

export { drinkSchema };
