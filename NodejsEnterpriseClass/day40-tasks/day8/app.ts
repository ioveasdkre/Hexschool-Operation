// Day 8 - Schema 補充

// https://hackmd.io/DTyueaMiT8m7Dc9WRdJl2w?view

import { Schema, model, connect } from "mongoose";

interface IDrink {
  product: string;
  price: number;
  ice: string;
  sugar: string;
  toppings: string[];
  createdAt: Date;
}

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

const Drink = model<IDrink>("Drink", drinkSchema);

connect("mongodb://127.0.0.1:27017/drink_shop")
  .then(() => console.log("資料庫連線成功"))
  .catch((error: Error) => console.log(error));


async function runDave() {
  const testDrink = new Drink({
    product: "鮮奶茶",
    price: 55,
    sugar: "微糖",
  });

  await testDrink
    .save()
    .then(() => {
      console.log("save() 新增資料成功");
    })
    .catch((error) => {
      console.log(error);
    });
}

async function runFindDefault() {
  await Drink.find()
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.log(error);
    });
}

runDave();
runFindDefault()