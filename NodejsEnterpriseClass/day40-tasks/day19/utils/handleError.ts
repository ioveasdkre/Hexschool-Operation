import { ServerResponse } from "http";
import { headers } from "./headers";

const handleNotFoundError = (
  res: ServerResponse,
  statusCode: number,
  status: string,
  message: string
) => {
  res.writeHead(statusCode, headers);
  res.write(
    JSON.stringify({
      status,
      message,
    })
  );
  res.end();
};

export { handleNotFoundError };
