/**
 * @swagger
 * tags:
 *   name: Comments
 *   description: API for managing comments on articles
 */

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

/**
 * @swagger
 * /comments/article/{articleId}/comment:
 *   post:
 *     summary: Add a comment to an article
 *     tags: [Comments]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: articleId
 *         schema:
 *           type: string
 *         required: true
 *         description: The article ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - content
 *             properties:
 *               content:
 *                 type: string
 *     responses:
 *       200:
 *         description: Comment added successfully
 *       401:
 *         description: Unauthorized
 *       400:
 *         description: Invalid data or article ID
 *       404:
 *         description: Article not found
 */
router
  .route("/article/:articleId/comment")
  .post(authMiddleware, commentOnArticle);

/**
 * @swagger
 * /comments/comment/{commentId}:
 *   get:
 *     summary: Get a comment by ID
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: commentId
 *         schema:
 *           type: string
 *         required: true
 *         description: The comment ID
 *     responses:
 *       200:
 *         description: The comment data
 *       404:
 *         description: Comment not found
 *       400:
 *         description: Invalid comment ID
 *   put:
 *     summary: Edit a comment by ID
 *     tags: [Comments]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: commentId
 *         schema:
 *           type: string
 *         required: true
 *         description: The comment ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *     responses:
 *       200:
 *         description: Comment updated successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden, cannot edit this comment
 *       400:
 *         description: Invalid data or comment ID
 *       404:
 *         description: Comment not found
 *   delete:
 *     summary: Delete a comment by ID
 *     tags: [Comments]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: commentId
 *         schema:
 *           type: string
 *         required: true
 *         description: The comment ID
 *     responses:
 *       200:
 *         description: Comment deleted successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden, cannot delete this comment
 *       404:
 *         description: Comment not found
 */
router
  .route("/comment/:commentId")
  .get(getComment)
  .put(authMiddleware, editComment)
  .delete(authMiddleware, deleteComment);

/**
 * @swagger
 * /comments/article/{articleId}:
 *   get:
 *     summary: Get all comments for an article
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: articleId
 *         schema:
 *           type: string
 *         required: true
 *         description: The article ID
 *     responses:
 *       200:
 *         description: List of comments for the article
 *       404:
 *         description: No comments found for this article
 *       400:
 *         description: Invalid article ID
 */
router.get("/article/:articleId", getAllCommentsByArticle);

/**
 * @swagger
 * /comments/author/{authorId}:
 *   get:
 *     summary: Get all comments by an author
 *     tags: [Comments]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: authorId
 *         schema:
 *           type: string
 *         required: true
 *         description: The author ID
 *     responses:
 *       200:
 *         description: List of comments by the author
 *       404:
 *         description: No comments found by this author
 *       400:
 *         description: Invalid author ID
 */
router.get("/author/:authorId", authMiddleware, getAllCommentsByAuthor);

export default router;
