import axios from "axios";
import { Request, Response, NextFunction } from "express";
import { appError } from "../classwork/week5/helpers/appError";

const errorTest = (q: number) => {
  switch (q) {
    case 1:
      // @ts-ignore
      console.log(a); // 參 day19
      break;
    case 2:
      // 參 day21
      axios
        .get("https://jsonplaceholder.typicode.com/posts/1sss")
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.error(error.name);
          console.error(error.message);
          console.error(error.stack);
        });
      break;
    case 3:
      // 參 day21
      axios
        .get("https://jsonplaceholder.typicode.com/posts/1sss")
        .then((response) => {
          console.log(response);
        });
      break;
    default:
      break;
  }
};

const errorLogin = (_req: Request, _res: Response, next: NextFunction) => {
  return next(appError(401, "您並未登入", next));
};

export { errorTest, errorLogin };
