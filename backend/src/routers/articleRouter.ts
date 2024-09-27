/**
 * @swagger
 * tags:
 *   name: Articles
 *   description: API for managing articles
 */

import express from "express";
import {
  getArticlesAndAuthors,
  getAuthorArticles,
  getArticle,
  getArticleByTitle,
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
 *     tags: [Articles]
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
 *     tags: [Articles]
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
 *     tags: [Articles]
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
 *     tags: [Articles]
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
 * /articles/title/{title}:
 *   get:
 *     summary: Get an article by title
 *     tags: [Articles]
 *     parameters:
 *       - in: path
 *         name: title
 *         schema:
 *           type: string
 *         required: true
 *         description: The article title in slug format (e.g., "the-future-of-ai-in-content-creation")
 *     responses:
 *       200:
 *         description: The article data
 *       404:
 *         description: Article not found
 *       400:
 *         description: Invalid article title
 */
router.route("/title/:title").get(getArticleByTitle);

/**
 * @swagger
 * /articles/author/{authorId}:
 *   get:
 *     summary: Get all articles by an author
 *     tags: [Articles]
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
 *     tags: [Articles]
 *     responses:
 *       200:
 *         description: List of articles with authors
 *       404:
 *         description: No articles found
 */
router.route("/").get(getArticlesAndAuthors);

export default router;
