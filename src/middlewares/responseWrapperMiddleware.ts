import { Request, Response, NextFunction } from 'express';

interface ResponseWrapper {
  status: number;
  Message: string | null;
  DebugMessage: string | null;
  Data: any;
}

export const responseWrapperMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const originalJson = res.json.bind(res);

  res.json = (data) => {
    const isErrorResponse = res.statusCode >= 400;

    const response: ResponseWrapper = {
      status: res.statusCode,
      Message: !isErrorResponse ? "Success" : data?.message || "An error occurred",
      DebugMessage: isErrorResponse ? data?.DebugMessage || data?.message : null,
      Data: !isErrorResponse ? data : [],
    };

    return originalJson(response);
  };

  next();
};
