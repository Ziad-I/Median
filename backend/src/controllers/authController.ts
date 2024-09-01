import { Request, Response } from "express";
import User from "../models/userModel";
import { JwtPayload } from "jsonwebtoken";
import { ENV } from "../config/env";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";

const register = async (req: Request, res: Response) => {
  const { username, name, email, password } = req.params;
  if (!username || !name || !email || !password) {
    return res.status(400).json({ message: "Invalid registration data" });
  }

  const existingEmail = await User.findOne({ email });
  if (existingEmail) {
    return res.status(409).json({ message: "Email already registered" });
  }

  // Check if the username is already taken
  const existingUsername = await User.findOne({ username });
  if (existingUsername) {
    return res.status(409).json({ message: "Username already taken" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({
    username: username,
    name: name,
    email: email,
    password: hashedPassword,
  });

  const accessToken = jwt.sign({ userId: user._id }, ENV.ACCESS_TOKEN_SECRET, {
    expiresIn: ENV.ACCESS_TOKEN_EXPIRATION_TIME,
  });

  const refreshToken = jwt.sign(
    { userId: user._id },
    ENV.REFRESH_TOKEN_SECRET,
    {
      expiresIn: ENV.REFRESH_TOKEN_EXPIRATION_TIME,
    }
  );

  user.refreshToken = refreshToken;
  await user.save();

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: ENV.NODE_ENV === "production",
    sameSite: "strict",
  });

  res.status(201).json({ accessToken: accessToken });
};

const login = async (req: Request, res: Response) => {
  const { email, password } = req.params;
  if (!email || !password) {
    return res.status(400).json({ message: "Invalid login data" });
  }
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json({ message: "Invalid email or password" });
  }
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const accessToken = jwt.sign({ userId: user._id }, ENV.ACCESS_TOKEN_SECRET, {
    expiresIn: ENV.ACCESS_TOKEN_EXPIRATION_TIME,
  });

  const refreshToken = jwt.sign(
    { userId: user._id },
    ENV.REFRESH_TOKEN_SECRET,
    {
      expiresIn: ENV.REFRESH_TOKEN_EXPIRATION_TIME,
    }
  );

  user.refreshToken = refreshToken;
  await user.save();

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: ENV.NODE_ENV === "production",
    sameSite: "strict",
  });

  res.status(200).json({ accessToken: accessToken });
};

const logout = async (req: Request, res: Response) => {
  const userId = req.userId;
  if (!userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const user = await User.findByIdAndUpdate(
    userId,
    { refreshToken: null },
    { new: true }
  );

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  res.status(200).json({ message: "Logged out successfully" });
};

const refreshToken = async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies;
  if (!refreshToken) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const decoded = jwt.verify(
    refreshToken,
    ENV.REFRESH_TOKEN_SECRET
  ) as JwtPayload;

  if (!decoded.userId) {
    return res.status(400).json({ message: "Invalid token payload" });
  }

  const user = await User.findById(decoded.userId);
  if (!user || user.refreshToken !== refreshToken) {
    return res.status(403).json({ message: "Invalid refresh token" });
  }

  if (decoded.exp && Date.now() >= decoded.exp * 1000) {
    return res.status(403).json({ message: "Refresh token expired" });
  }

  const newAccessToken = jwt.sign(
    { userId: user._id },
    ENV.ACCESS_TOKEN_SECRET,
    {
      expiresIn: ENV.ACCESS_TOKEN_EXPIRATION_TIME,
    }
  );

  const newRefreshToken = jwt.sign(
    { userId: user._id },
    ENV.REFRESH_TOKEN_SECRET,
    {
      expiresIn: ENV.REFRESH_TOKEN_EXPIRATION_TIME,
    }
  );

  user.refreshToken = newRefreshToken;
  await user.save();

  res.cookie("refreshToken", newRefreshToken, {
    httpOnly: true,
    secure: ENV.NODE_ENV === "production",
    sameSite: "strict",
  });

  res.status(200).json({ accessToken: newAccessToken });
};

const forgotPassword = async (req: Request, res: Response) => {
  const { email } = req.params;
  if (!email) {
    return res.status(400).json({ message: "Invalid email" });
  }

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const resetToken = jwt.sign(
    { userId: user._id },
    ENV.RESET_PASSWORD_TOKEN_SECRET,
    {
      expiresIn: ENV.RESET_PASSWORD_TOKEN_EXPIRATION_TIME,
    }
  );

  const transportOptions: SMTPTransport.Options = {
    host: ENV.MAILTRAP_HOST,
    port: Number(ENV.MAILTRAP_PORT),
    auth: {
      user: ENV.MAILTRAP_USER,
      pass: ENV.MAILTRAP_PASSWORD,
    },
  };
  var transport = nodemailer.createTransport(transportOptions);

  const mailOptions = {
    from: "no-reply@median.com",
    to: email,
    subject: "Password Reset",
    text: `Click the following link to reset your password: ${ENV.FRONTEND_URL}/reset-password/${resetToken}`,
  };

  transport.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send("Error sending email");
    } else {
      console.log(`Email sent to ${user.email}: ${info.response}`);
      res.status(200).json({
        Message: "Check your email for instructions on resetting your password",
      });
    }
  });
};

const resetPassword = async (req: Request, res: Response) => {
  const { token, newPassword } = req.params;
  if (!newPassword || !token) {
    return res.status(400).json({ message: "Invalid reset password data" });
  }

  const decoded = jwt.verify(
    token.toString(),
    ENV.RESET_PASSWORD_TOKEN_SECRET
  ) as JwtPayload;
  if (!decoded.userId) {
    return res.status(400).json({ message: "Invalid token payload" });
  }

  const user = await User.findById(decoded.userId);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  if (decoded.exp && Date.now() >= decoded.exp * 1000) {
    return res.status(403).json({ message: "Reset password token expired" });
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);
  user.password = hashedPassword;
  await user.save();

  console.log(`Password reset for user ${user.email}`);
  res.status(200).json({ message: "Password reset successfully" });
};

// todo: implement
const verifyEmail = async (req: Request, res: Response) => {};

export {
  register,
  login,
  logout,
  refreshToken,
  forgotPassword,
  resetPassword,
  verifyEmail,
};
