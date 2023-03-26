import path from "path";
import dotenv from "dotenv";
import { connect } from "mongoose";

dotenv.config({ path: path.join(__dirname, "../../../config.env") });

if (!process.env.DATABASE) {
  throw new Error(
    "Database connection string not found in environment variables."
  );
}

const DB = process.env.DATABASE;

async function connectToDatabase() {
  try {
    await connect(DB);
    console.log("資料庫連線成功");
  } catch (error) {
    console.log(error);
  }
}

connectToDatabase();
