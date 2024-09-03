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

router
  .route("/profile")
  .get(authMiddleware, getProfile)
  .put(authMiddleware, editUser)
  .delete(authMiddleware, deleteUser);

router.route("/:userId").get(getUser);

router.route("follow/:userId").put(authMiddleware, followUser);

router.route("unfollow/:userId").put(authMiddleware, unfollowUser);

router.route("/followers/:userId").get(getAllFollowers);

router.route("followings/:userId").get(getAllFollowings);

export default router;
