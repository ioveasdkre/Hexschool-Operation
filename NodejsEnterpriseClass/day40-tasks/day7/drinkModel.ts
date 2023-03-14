// Day 7 - Model、Mongoose 新增／查詢

// https://hackmd.io/Fm3L9TMVRsqCZywxwdhBqQ

import { Schema, model, connect } from "mongoose";

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

connect("mongodb://127.0.0.1:27017/drink_shop")
  .then(() => console.log("資料庫連線成功"))
  .catch((error: Error) => console.log(error));

async function runDave() {
  const testDrink = new Drink({
    product: "鮮奶茶",
    price: 55,
    sugar: "微糖",
  });

  testDrink
    .save()
    .then(() => {
      console.log("save() 新增資料成功");
    })
    .catch((error) => {
      console.log(error);
    });
}

async function runCreate() {
  const testDrink = new Drink({
    product: "鮮奶茶",
    price: 55,
    sugar: "微糖",
  });

  await Drink.create(testDrink)
    .then(() => {
      console.log("Create() 新增資料成功");
    })
    .catch((error) => {
      console.log(error);
    });
}

runDave();
runCreate();
