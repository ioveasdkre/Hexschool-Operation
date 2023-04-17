interface ErrorWithStatusCode extends Error {
  statusCode?: number;
  message: string;
  isOperational: boolean;
}

export { ErrorWithStatusCode };
