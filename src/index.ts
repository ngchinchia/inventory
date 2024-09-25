import express, { Application, Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

const app: Application = express();
const port = process.env.PORT || 3000;

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    status: 'success',
    message: 'Inventory server is running successfully'
  })
});

app.listen(port, () => {
  console.log(`[server]: Server is running at ${port}`);
});