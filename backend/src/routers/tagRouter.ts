/**
 * @swagger
 * tags:
 *   name: Tags
 *   description: API for managing tags
 */

import express from "express";
import { getAllTags, getTagArticles } from "../controllers/tagController";

const router = express.Router();

/**
 * @swagger
 * /tags/tag/{tagName}:
 *   get:
 *     summary: Get all articles associated with a specific tag
 *     tags: [Tags]
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
router.get("/tag/:tagName", getTagArticles);

/**
 * @swagger
 * /tags:
 *   get:
 *     summary: Get all tags
 *     tags: [Tags]
 *     responses:
 *       200:
 *         description: Successfully retrieved all tags
 *       404:
 *         description: No tags found
 */
router.get("/", getAllTags);

export default router;
