import express from "express";
import {
  getArticlesAndAuthors,
  getAuthorArticles,
  getArticle,
  createArticle,
  editArticle,
  deleteArticle,
} from "../controllers/articleController";
import authMiddleware from "../middlewares/authMiddleware";

const router = express.Router();

router.route("/write").post(authMiddleware, createArticle);

router
  .route("/:articleId")
  .get(getArticle)
  .put(authMiddleware, editArticle)
  .delete(authMiddleware, deleteArticle);

router.route("/author/:authorId").get(getAuthorArticles);

router.route("/").get(getArticlesAndAuthors);

export default router;
