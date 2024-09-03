import express, { Express, Request, Response } from "express";
import userRouter from "./routers/userRouter";
import authRouter from "./routers/authRouter";
import articleRouter from "./routers/articleRouter";
import commentRouter from "./routers/commentRouter";
import tagRouter from "./routers/tagRouter";
import connectDB from "./config/db";
import { ENV } from "./config/env";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./config/swaggerOptions";
import cors from "cors";

const app: Express = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const apiRouter = express.Router();

apiRouter.use("/user", userRouter);
apiRouter.use("/article", articleRouter);
apiRouter.use("/comment", commentRouter);
apiRouter.use("/tag", tagRouter);
apiRouter.use("/auth", authRouter);
apiRouter.use(
  "/docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, { explorer: true })
);

app.use("/api", apiRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

// connectDB();

app.listen(ENV.BACKEND_PORT, () => {
  console.log(
    `[server]: Server is running at http://localhost:${ENV.BACKEND_PORT}`
  );
});
