import { Router, Request, Response, NextFunction } from "express";
import pool from "../config/db";

const dbRoute = Router();

dbRoute.get(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    let client;

    try {
      client = await pool.connect();
      const result = await client.query("SELECT NOW()");

      res.status(200).json({
        success: true,
        message: "Connected to PostgreSQL",
        timestamp: result.rows[0].now,
      });
    } catch (error) {
      next(error);
    } finally {
      if (client) {
        client.release();
      }
    }
  }
);

export default dbRoute;
