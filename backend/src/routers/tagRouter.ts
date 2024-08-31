import express from "express";
import { getTagArticles } from "../controllers/tagController";
import authMiddleware from "../middlewares/authMiddleware";

const router = express.Router();

router.get("/tags/:tagName", getTagArticles);

export default router;
