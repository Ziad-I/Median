import express from "express";
import {
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
  .put(authMiddleware, editUser)
  .delete(authMiddleware, deleteUser);

router.route("/:userId").get(getUser);

router.route("follow/:userId").put(authMiddleware, followUser);

router.route("unfollow/:userId").put(authMiddleware, unfollowUser);

router.route("/followers/:userId").get(getAllFollowers);

router.route("followings/:userId").get(getAllFollowings);

export default router;
