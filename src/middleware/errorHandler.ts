// src/middleware/errorHandler.ts
import { Request, Response, NextFunction } from "express";
import { NotFoundError } from "../errors/NotFoundError";
import { ValidationError } from "../errors/ValidationError";
import { DatabaseError } from "pg";
import { HttpError } from "../errors/HttpError";

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error("Error:", err.message);

  switch (true) {
    case err instanceof NotFoundError:
      return res.status(404).json({
        status: "error",
        message: err.message,
      });
      
    case err instanceof ValidationError:
      return res.status(400).json({
        status: "error",
        message: err.message,
      });

    case err instanceof DatabaseError:
      return res.status(500).json({
        status: "error",
        message: "Database error: " + err.message,
      });

    case err instanceof HttpError:
      return res.status(err.statusCode).json({
        status: "error",
        message: err.message,
      });

    default:
      return res.status(500).json({
        status: "error",
        message: "Something went wrong.",
        error: err.message,
      });
  }
};
