import { Request, Response, NextFunction } from "express";

const handleErrorAsync = (
  func: (req: Request, res: Response, next: NextFunction) => Promise<void>
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    func(req, res, next).catch((error: Error) => {
      next(error);
    });
  };
};

export { handleErrorAsync };
