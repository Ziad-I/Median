import express from "express";
import {
  commentOnArticle,
  editComment,
  deleteComment,
  getComment,
  getAllCommentsByArticle,
  getAllCommentsByAuthor,
} from "../controllers/commentController";
import authMiddleware from "../middlewares/authMiddleware";

const router = express.Router();

router
  .route("/article/:articleId/comment")
  .post(authMiddleware, commentOnArticle);

router
  .route("/comment/:commentId")
  .get(getComment)
  .put(authMiddleware, editComment)
  .delete(authMiddleware, deleteComment);

router.get("/article/:articleId/comments", getAllCommentsByArticle);

router.get(
  "/author/:authorId/comments",
  authMiddleware,
  getAllCommentsByAuthor
);

export default router;
