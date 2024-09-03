/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: API for authentication
 */

import express from "express";
import {
  register,
  login,
  logout,
  refreshToken,
  forgotPassword,
  resetPassword,
  verifyEmail,
} from "../controllers/authController";
import authMiddleware from "../middlewares/authMiddleware";

const router = express.Router();

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - name
 *               - email
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 format: password
 *     responses:
 *       201:
 *         description: Successfully registered user
 *       400:
 *         description: Invalid registration data
 *       409:
 *         description: Email or username already registered
 */
router.post("/register", register);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Log in a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 format: password
 *     responses:
 *       200:
 *         description: Successfully logged in
 *       400:
 *         description: Invalid login data
 *       401:
 *         description: Invalid email or password
 */
router.post("/login", login);

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: Log out a user
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully logged out
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 */
router.post("/logout", authMiddleware, logout);

/**
 * @swagger
 * /auth/refresh-token:
 *   post:
 *     summary: Refresh an access token using a refresh token
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Successfully refreshed access token
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Invalid or expired refresh token
 */
router.post("/refresh-token", refreshToken);

/**
 * @swagger
 * /auth/forgot-password:
 *   post:
 *     summary: Send a password reset email
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *     responses:
 *       200:
 *         description: Password reset email sent
 *       400:
 *         description: Invalid email
 *       404:
 *         description: User not found
 */
router.post("/forgot-password", forgotPassword);

/**
 * @swagger
 * /auth/reset-password:
 *   post:
 *     summary: Reset a user's password
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - token
 *               - newPassword
 *             properties:
 *               token:
 *                 type: string
 *               newPassword:
 *                 type: string
 *                 format: password
 *     responses:
 *       200:
 *         description: Password reset successfully
 *       400:
 *         description: Invalid reset password data
 *       403:
 *         description: Reset password token expired
 *       404:
 *         description: User not found
 */
router.post("/reset-password", resetPassword);

// Uncomment and add JSDoc when you implement the verifyEmail function
// /**
//  * @swagger
//  * /auth/verify-email/{token}:
//  *   get:
//  *     summary: Verify a user's email
//  *     tags: [Auth]
//  *     parameters:
//  *       - in: path
//  *         name: token
//  *         schema:
//  *           type: string
//  *         required: true
//  *         description: The token used to verify the email
//  *     responses:
//  *       200:
//  *         description: Email verified successfully
//  *       400:
//  *         description: Invalid or expired token
//  *       404:
//  *         description: User not found
//  */
// router.get("/verify-email/:token", verifyEmail);

export default router;
