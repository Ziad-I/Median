/**
 * @swagger
 * tags:
 *   name: Article
 *   description: API for managing articles
 */

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

/**
 * @swagger
 * /articles/write:
 *   post:
 *     summary: Create a new article
 *     tags: [Article]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - content
 *               - tags
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Article created successfully
 *       401:
 *         description: Unauthorized
 *       400:
 *         description: Invalid data
 */
router.route("/write").post(authMiddleware, createArticle);

/**
 * @swagger
 * /articles/{articleId}:
 *   get:
 *     summary: Get an article by ID
 *     tags: [Article]
 *     parameters:
 *       - in: path
 *         name: articleId
 *         schema:
 *           type: string
 *         required: true
 *         description: The article ID
 *     responses:
 *       200:
 *         description: The article data
 *       404:
 *         description: Article not found
 *       400:
 *         description: Invalid article ID
 *   put:
 *     summary: Edit an article by ID
 *     tags: [Article]
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
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Article updated successfully
 *       401:
 *         description: Unauthorized
 *       400:
 *         description: Invalid data or article ID
 *       404:
 *         description: Article not found
 *   delete:
 *     summary: Delete an article by ID
 *     tags: [Article]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: articleId
 *         schema:
 *           type: string
 *         required: true
 *         description: The article ID
 *     responses:
 *       200:
 *         description: Article deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Article not found
 */
router
  .route("/:articleId")
  .get(getArticle)
  .put(authMiddleware, editArticle)
  .delete(authMiddleware, deleteArticle);

/**
 * @swagger
 * /articles/author/{authorId}:
 *   get:
 *     summary: Get all articles by an author
 *     tags: [Article]
 *     parameters:
 *       - in: path
 *         name: authorId
 *         schema:
 *           type: string
 *         required: true
 *         description: The author ID
 *     responses:
 *       200:
 *         description: List of articles by the author
 *       404:
 *         description: Author not found or no articles
 *       400:
 *         description: Invalid author ID
 */
router.route("/author/:authorId").get(getAuthorArticles);

/**
 * @swagger
 * /articles:
 *   get:
 *     summary: Get all articles with their authors
 *     tags: [Article]
 *     responses:
 *       200:
 *         description: List of articles with authors
 *       404:
 *         description: No articles found
 */
router.route("/").get(getArticlesAndAuthors);

export default router;
