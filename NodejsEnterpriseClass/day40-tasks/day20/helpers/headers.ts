import { IHeaders } from "../interfaces/utils/headerInterface";

const headers: IHeaders = {
  "Access-Control-Allow-Headers":
    "Authorization, Content-Length, Content-Type, X-Requested-With",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Origin": "*",
  "Content-Type": "application/json",
  Allow: "GET, POST, PUT, DELETE, OPTIONS",
};

export { headers };
