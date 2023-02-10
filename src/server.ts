import express from "express";
import config from "config";
import User from "./routes/user";

const app = express();

app.use(express.json());
app.use("/api/user", User);


const port = config.get<number>("PORT") | 3000;
app.listen(port, () => console.log(`server start at port ${port} 🚀 🎯`));
