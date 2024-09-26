import { Request, Response, Router } from "express";

const mainRoute = Router();

// Main route
mainRoute.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: 'Inventory server is running successfully'
  });
});

export default mainRoute;
