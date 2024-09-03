/**
 * @swagger
 * tags:
 *   name: Tag
 *   description: API for managing tags
 */

import express from "express";
import { getAllTags, getTagArticles } from "../controllers/tagController";

const router = express.Router();

/**
 * @swagger
 * /tags/{tagName}:
 *   get:
 *     summary: Get all articles associated with a specific tag
 *     tags: [Tag]
 *     parameters:
 *       - in: path
 *         name: tagName
 *         schema:
 *           type: string
 *         required: true
 *         description: The name of the tag to retrieve articles for
 *     responses:
 *       200:
 *         description: Successfully retrieved articles associated with the tag
 *       400:
 *         description: Invalid tag name
 *       404:
 *         description: Tag not found or no articles found for this tag
 */
router.get("/tags/:tagName", getTagArticles);

/**
 * @swagger
 * /tags:
 *   get:
 *     summary: Get all tags
 *     tags: [Tag]
 *     responses:
 *       200:
 *         description: Successfully retrieved all tags
 *       404:
 *         description: No tags found
 */
router.get("/tags", getAllTags);

export default router;
