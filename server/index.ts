import express, { Express } from "express";
import cors from "cors";
import { trpcToExpress } from "./routes";
import { logger } from "./logger";
const app: Express = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use("/trpc", trpcToExpress);

app.listen(port, () => {
  logger.info(`Server is running at http://localhost:${port}`);
});


