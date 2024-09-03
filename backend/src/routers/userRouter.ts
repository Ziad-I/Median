/**
 * @swagger
 * tags:
 *   name: User
 *   description: API for managing users
 */

import express from "express";
import {
  getProfile,
  editUser,
  deleteUser,
  followUser,
  unfollowUser,
  getUser,
  getAllFollowers,
  getAllFollowings,
} from "../controllers/userController";
import authMiddleware from "../middlewares/authMiddleware";

const router = express.Router();

/**
 * @swagger
 * /profile:
 *   get:
 *     summary: Get the profile of the authenticated user
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved user profile
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 *   put:
 *     summary: Edit the profile of the authenticated user
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Data to update user profile
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               bio:
 *                 type: string
 *     responses:
 *       200:
 *         description: User updated successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 *       500:
 *         description: Failed to update user
 *   delete:
 *     summary: Delete the profile of the authenticated user
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 *       500:
 *         description: Failed to delete user
 */
router
  .route("/profile")
  .get(authMiddleware, getProfile)
  .put(authMiddleware, editUser)
  .delete(authMiddleware, deleteUser);

/**
 * @swagger
 * /{userId}:
 *   get:
 *     summary: Get a user by ID
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the user to retrieve
 *     responses:
 *       200:
 *         description: Successfully retrieved user
 *       404:
 *         description: User not found
 */
router.route("/:userId").get(getUser);

/**
 * @swagger
 * /follow/{userId}:
 *   put:
 *     summary: Follow a user
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the user to follow
 *     responses:
 *       200:
 *         description: User followed successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 *       400:
 *         description: You are already following this user
 */
router.route("follow/:userId").put(authMiddleware, followUser);

/**
 * @swagger
 * /unfollow/{userId}:
 *   put:
 *     summary: Unfollow a user
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the user to unfollow
 *     responses:
 *       200:
 *         description: User unfollowed successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 *       400:
 *         description: You are not following this user
 */
router.route("unfollow/:userId").put(authMiddleware, unfollowUser);

/**
 * @swagger
 * /followers/{userId}:
 *   get:
 *     summary: Get all followers of a user
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the user to get followers of
 *     responses:
 *       200:
 *         description: Successfully retrieved followers
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 */
router.route("/followers/:userId").get(getAllFollowers);

/**
 * @swagger
 * /followings/{userId}:
 *   get:
 *     summary: Get all followings of a user
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the user to get followings of
 *     responses:
 *       200:
 *         description: Successfully retrieved followings
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 */
router.route("followings/:userId").get(getAllFollowings);

export default router;
