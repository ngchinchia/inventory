/* Layer responsible for listening for incoming requests on specific port */
import app from "./app";
import { PORT } from "./config/config";

app.listen(PORT, () => {
  console.log(`[server]: Server is running at ${PORT}`);
});