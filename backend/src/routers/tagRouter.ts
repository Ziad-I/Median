import express from "express";
import { getAllTags, getTagArticles } from "../controllers/tagController";
import authMiddleware from "../middlewares/authMiddleware";

const router = express.Router();

router.get("/tags/:tagName", getTagArticles);

router.get("/tags", getAllTags);

export default router;
