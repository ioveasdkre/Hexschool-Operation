// Day 9 - Mongoose 修改／刪除

// https://hackmd.io/of0rfPj7Tguwq2PUHPoBIg

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

async function updateOne() {
  await Drink.updateOne(
    {
      product: "鮮奶茶",
    },
    {
      ice: "去冰",
      sugar: "半糖",
    }
  )
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.log(error);
    });
}

async function findByIdAndDelete() {
  await Drink.findByIdAndDelete("640fef0c149dee2f1b39314d", {
    ice: "去冰",
    sugar: "半糖",
  })
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.log(error);
    });
}

async function deleteMany() {
  await Drink.deleteMany()
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.log(error);
    });
}

async function main(optionId: number) {
  switch (optionId) {
    case 1:
      await updateOne();
      break;
    case 2:
      await findByIdAndDelete();
      break;
    case 3:
      await deleteMany();
      break;
    default:
      break;
  }
}

main(3);
