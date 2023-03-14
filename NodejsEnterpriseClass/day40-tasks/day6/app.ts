// Day 6 - Mongoose、Schema

// https://hackmd.io/wWcoMxCYRtmtfhjDrwNgew?view

import { Schema, model } from "mongoose";

interface IDrink {
  product: string;
  price: number;
  ice: string;
  sugar: string;
  toppings: string[];
}

const drinkSchema = new Schema<IDrink>({
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
});

const Drink = model<IDrink>("Drink", drinkSchema);

export { Drink, IDrink };
