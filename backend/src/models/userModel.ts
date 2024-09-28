import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  bio: { type: String },
  avatar: { type: String },
  createdAt: { type: Date, default: Date.now },
  refreshToken: { type: String, unique: true },
  followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  followings: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

// Virtual for followerCount
userSchema.virtual("followerCount").get(function () {
  return this.followers.length;
});

// Virtual for followingCount
userSchema.virtual("followingCount").get(function () {
  return this.followings.length;
});

// Ensure virtual fields are serialized
userSchema.set("toJSON", { virtuals: true });
userSchema.set("toObject", { virtuals: true });

const User = mongoose.model("User", userSchema);
export default User;
