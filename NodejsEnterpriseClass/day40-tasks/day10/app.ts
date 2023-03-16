// Day 10 - 拆分 Model

// https://hackmd.io/B9KxY3MvRLCTgi_PZ8-zDA

import { connect } from "mongoose";
import http, { IncomingMessage, ServerResponse } from "http";
import { Drink } from "./models/drinkModel";

connect("mongodb://127.0.0.1:27017/drink_shop")
  .then(() => console.log("資料庫連線成功"))
  .catch((error: Error) => console.log(error));

const requestListener = async (req: IncomingMessage, res: ServerResponse) => {
  let body = "";
  req.on("data", (chunk) => {
    body += chunk;
  });
  const headers = {
    "Access-Control-Allow-Headers":
      "Content-Type, Authorization, Content-Length, X-Requested-With",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "PATCH, POST, GET,OPTIONS,DELETE",
    "Content-Type": "application/json",
  };
  if (req.url == "/drinks" && req.method == "GET") {
    const drinks = await Drink.find();
    res.writeHead(200, headers);
    res.write(
      JSON.stringify({
        status: "success",
        drinks,
      })
    );
    res.end();
  } else if (req.url == "/drinks" && req.method == "POST") {
    req.on("end", async () => {
      try {
        const data = JSON.parse(body);
        const newDrink = await Drink.create({
          product: data.product,
          price: data.price,
          toppings: data.toppings,
        });
        res.writeHead(200, headers);
        res.write(
          JSON.stringify({
            status: "success",
            drinks: newDrink,
          })
        );
        res.end();
      } catch (error) {
        res.writeHead(400, headers);
        res.write(
          JSON.stringify({
            status: "false",
            message: "欄位沒有正確，或沒有此 ID",
            error: error,
          })
        );
        res.end();
      }
    });
  } else if (req.url == "/drinks" && req.method == "DELETE") {
    await Drink.deleteMany({});
    res.writeHead(200, headers);
    res.write(
      JSON.stringify({
        status: "success",
        drinks: [],
      })
    );
    res.end();
  } else if (req.method == "OPTIONS") {
    res.writeHead(200, headers);
    res.end();
  } else {
    res.writeHead(404, headers);
    res.write(
      JSON.stringify({
        status: "false",
        message: "無此網站路由",
      })
    );
    res.end();
  }
};

const server = http.createServer(requestListener);
const port = process.env.PORT || 3000;

server.listen(port);