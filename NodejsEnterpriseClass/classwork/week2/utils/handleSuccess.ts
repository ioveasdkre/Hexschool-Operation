import { ServerResponse } from "http";
import { headers } from "./headers";

function handleSuccess<T>(res: ServerResponse, data?: T) {
  res.writeHead(200, headers);
  if (data) {
    res.write(
      JSON.stringify({
        status: "success",
        data: data,
      })
    );
  } else {
    res.write(
      JSON.stringify({
        status: "success",
      })
    );
  }

  res.end();
}

export { handleSuccess };
