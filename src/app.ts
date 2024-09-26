/* Layer responsible for handling requests */
import express, { Application } from "express";
import mainRoute from "./routes/mainRoute";
import dbRoute from "./routes/dbRoute";
import itemRoutes from "./routes/v1/itemRoutes";
import locationRoutes from "./routes/v1/locationRoutes";
import { errorHandler } from "./middleware/errorHandler";


const app: Application = express();

app.use(express.json());


app.use("/", mainRoute);
app.use("/test-db", dbRoute)
app.use("/v1/api", itemRoutes, locationRoutes)
app.use(errorHandler)



export default app;
