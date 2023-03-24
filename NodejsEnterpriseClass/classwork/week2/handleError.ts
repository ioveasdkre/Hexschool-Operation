import { ServerResponse } from "http";
import { headers } from "./headers";

const handleError = (
  res: ServerResponse,
  err?: Error | unknown,
  state: number = 400
) => {
  res.writeHead(state, headers);
  let message = "";
  if (err instanceof Error) {
    message = err.message;
  } else {
    message = "欄位未填寫正確或無此 id";
  }
  res.write(
    JSON.stringify({
      status: "false",
      message,
    })
  );
  res.end();
};

const handleNotFoundError = (res: ServerResponse) => {
  res.writeHead(404, headers);
  res.write(
    JSON.stringify({
      status: "false",
      message: "無此網站路由",
    })
  );
  res.end();
};

export { handleError, handleNotFoundError };
