import { Response } from "express";
import { headers } from "./headers";

function handleSuccess<T>(res: Response, data?: T) {
  res.set(headers);

  if (data) {
    res.status(200).json({
      status: "success",
      data: data,
    });
  } else {
    res.status(200).json({
      status: "success",
    });
  }
}

export { handleSuccess };
