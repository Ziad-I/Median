import express, { Express } from "express";
import userRouter from "./routers/userRouter";
import authRouter from "./routers/authRouter";
import articleRouter from "./routers/articleRouter";
import commentRouter from "./routers/commentRouter";
import tagRouter from "./routers/tagRouter";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./config/swaggerOptions";
import cors from "cors";

// Initialize the Express app
export const app: Express = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routers
const apiRouter = express.Router();

apiRouter.use("/users", userRouter);
apiRouter.use("/articles", articleRouter);
apiRouter.use("/comments", commentRouter);
apiRouter.use("/tags", tagRouter);
apiRouter.use("/auth", authRouter);
apiRouter.use(
  "/docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, { explorer: true })
);

app.use("/api", apiRouter);

app.get("/", (req, res) => {
  res.send("Express + TypeScript Server");
});
