interface AppError extends Error {
  statusCode: number;
  status: string;
  isOperational?: boolean;
}

export { AppError };
