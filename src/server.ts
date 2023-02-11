import express from "express";
import config from "config";
import User from "./routes/user";
import Movie from "./routes/movie";
import Customer from "./routes/customer";

const app = express();

app.use(express.json());
app.use("/api/user", User);
app.use("/api/movie", Movie);
app.use("/api/customer", Customer);

const port = config.get<number>("PORT") || 3000;
app.listen(port, () => console.log(`server start at port ${port} 🚀 🎯`));
