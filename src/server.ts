import "express-async-errors";
import express from "express";
import config from "config";
import User from "./routes/user";
import Movie from "./routes/movie";
import Customer from "./routes/customer";
import Genre from "./routes/genre";
import Rental from "./routes/rental";
import { log } from "./utils/logger";
import { errorHandlerMiddleware } from "./middleware/errorHandler";
const app = express();

process.on("uncaughtException", (ex: any) => {
  log.error(ex.message);
  process.exit(1);
});

process.on("unhandledRejection", (ex: any) => {
  log.error(ex.message);
  process.exit(1);
});

app.use(express.json());
app.use("/api/user", User);
app.use("/api/movie", Movie);
app.use("/api/customer", Customer);
app.use("/api/genre", Genre);
app.use("/api/rental", Rental);
app.use(errorHandlerMiddleware);

const port = config.get<number>("PORT") || 3000;
app.listen(port, () => console.log(`server start at port ${port} 🚀 🎯`));
