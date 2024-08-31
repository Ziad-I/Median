import express, { Express, Request, Response } from "express";
import userRouter from "./routers/userRouter";
import connectDB from "./config/db";
import cors from "cors";
import { ENV } from "./config/env";

const app: Express = express();
app.use(cors);
app.use(express.json());

app.use("/user", userRouter);
app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

connectDB();

app.listen(ENV.PORT, () => {
  console.log(`[server]: Server is running at http://localhost:${ENV.PORT}`);
});
