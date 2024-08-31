import { Request, Response } from "express";
import User from "../models/userModel";

const editUser = async (req: Request, res: Response) => {
  const userId = req.userId;
  if (!userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const updateResult = await User.updateOne({ _id: userId }, req.body);
  if (updateResult.modifiedCount !== 1) {
    return res.status(500).json({ message: "Failed to update user" });
  }

  return res.status(200).json({ message: "User updated successfully" });
};

const deleteUser = async (req: Request, res: Response) => {
  const userId = req.userId;
  if (!userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const deleteResult = await User.deleteOne({ _id: userId });
  if (deleteResult.deletedCount !== 1) {
    return res.status(500).json({ message: "Failed to delete user" });
  }

  return res.status(200).json({ message: "User deleted successfully" });
};

const followUser = async (req: Request, res: Response) => {
  const userId = req.userId;
  const followUserId = req.params.followUser;

  if (!userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  if (!followUserId) {
    return res.status(400).json({ message: "Invalid follow user ID" });
  }

  const [user, followUser] = await Promise.all([
    User.findById(userId),
    User.findById(followUserId),
  ]);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  if (!followUser) {
    return res.status(404).json({ message: "User to follow not found" });
  }

  const index = user.followings.findIndex(
    (item) => item.toString() === followUserId
  );
  if (index !== -1) {
    return res
      .status(400)
      .json({ message: "You are already following this user" });
  }

  await Promise.all([
    User.findByIdAndUpdate(userId, { $push: { followings: followUserId } }),
    User.findByIdAndUpdate(followUserId, { $push: { followers: userId } }),
  ]);

  return res.status(200).json({ message: "User followed successfully" });
};

const unfollowUser = async (req: Request, res: Response) => {
  const userId = req.userId;
  const unfollowUserId = req.params.unfollowUser;

  if (!userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  if (!unfollowUserId) {
    return res.status(400).json({ message: "Invalid unfollow user ID" });
  }

  const [user, unfollowUser] = await Promise.all([
    User.findById(userId),
    User.findById(unfollowUserId),
  ]);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  if (!unfollowUser) {
    return res.status(404).json({ message: "User to unfollow not found" });
  }

  const index = user.followings.findIndex(
    (item) => item.toString() === unfollowUserId
  );

  if (index === -1) {
    return res
      .status(400)
      .json({ message: "You are already following this user" });
  }

  await Promise.all([
    User.findByIdAndUpdate(userId, {
      $pull: { followings: unfollowUserId },
    }),
    User.findByIdAndUpdate(unfollowUserId, {
      $pull: { followers: userId },
    }),
  ]);

  return res.status(200).json({ message: "User unfollowed successfully" });
};

const getUser = async (req: Request, res: Response) => {
  const userId = req.userId;
  if (!userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  return res.status(200).json(user);
};

const getAllFollowers = async (req: Request, res: Response) => {
  const userId = req.userId;
  if (!userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const followers = await User.find({ _id: { $in: user.followers } });
  return res.status(200).json(followers);
};

const getAllFollowings = async (req: Request, res: Response) => {
  const userId = req.userId;
  if (!userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const followings = await User.find({ _id: { $in: user.followings } });
  return res.status(200).json(followings);
};

export {
  editUser,
  deleteUser,
  followUser,
  unfollowUser,
  getUser,
  getAllFollowers,
  getAllFollowings,
};
