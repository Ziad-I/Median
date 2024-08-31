import express, { Express, Request, Response } from "express";
import connectDB from './config/db';
import { ENV } from './config/env';

const app: Express = express();

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

connectDB();

app.listen(ENV.PORT, () => {
  console.log(`[server]: Server is running at http://localhost:${ENV.PORT}`);
});