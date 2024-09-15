import { Request, Response } from "express";
import Comment from "../models/commentModel";
import Article from "../models/articleModel";

const commentOnArticle = async (req: Request, res: Response) => {
  const userId = req.userId;
  if (!userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const articleId = req.params.articleId;
  if (!articleId) {
    return res.status(400).json({ message: "Invalid article ID" });
  }

  const article = Article.findById(articleId);
  if (!article) {
    return res.status(404).json({ message: "Article not found" });
  }

  const content = req.params.content;
  if (!content) {
    return res.status(400).json({ message: "Invalid comment content" });
  }

  const comment = new Comment({
    content,
    author: userId,
    article: articleId,
  });

  await comment.save();

  await Article.findByIdAndUpdate(articleId, {
    $push: { comments: comment._id },
  });

  return res.status(200).json({ message: "Comment created successfully" });
};

const editComment = async (req: Request, res: Response) => {
  const userId = req.userId;
  if (!userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const commentId = req.params.commentId;
  if (!commentId) {
    return res.status(400).json({ message: "Invalid comment ID" });
  }

  const comment = await Comment.findById(commentId);
  if (!comment) {
    return res.status(404).json({ message: "Comment not found" });
  }

  if (comment.author.toString() !== userId) {
    return res
      .status(403)
      .json({ message: "Unauthorized to edit this comment" });
  }

  const updateResult = await Comment.updateOne({ _id: userId }, req.body);
  if (updateResult.modifiedCount !== 1) {
    return res.status(500).json({ message: "Failed to update comment" });
  }

  return res.status(200).json({ message: "Comment updated successfully" });
};

const deleteComment = async (req: Request, res: Response) => {
  const userId = req.userId;
  if (!userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const commentId = req.params.commentId;
  if (!commentId) {
    return res.status(400).json({ message: "Invalid comment ID" });
  }

  const comment = await Comment.findById(commentId);
  if (!comment) {
    return res.status(404).json({ message: "Comment not found" });
  }

  if (comment.author.toString() !== userId) {
    return res
      .status(403)
      .json({ message: "Unauthorized to delete this comment" });
  }

  const deleteResult = await Comment.deleteOne({ _id: commentId });
  if (deleteResult.deletedCount !== 1) {
    return res.status(500).json({ message: "Failed to delete comment" });
  }

  return res.status(200).json({ message: "Comment deleted successfully" });
};

const getComment = async (req: Request, res: Response) => {
  const commentId = req.params.commentId;
  if (!commentId) {
    return res.status(400).json({ message: "Invalid comment ID" });
  }

  const comment = await Comment.findById(commentId).populate(
    "author",
    "name, avatar"
  );

  if (!comment) {
    return res.status(404).json({ message: "Comment not found" });
  }

  return res.status(200).json(comment);
};

const getAllCommentsByArticle = async (req: Request, res: Response) => {
  const articleId = req.params.articleId;
  if (!articleId) {
    return res.status(400).json({ message: "Invalid article ID" });
  }

  const comments = await Comment.find({ article: articleId })
    .populate("author", "name, avatar")
    .sort({
      createdAt: -1,
    });

  if (!comments) {
    return res
      .status(404)
      .json({ message: "No comments found for this article" });
  }

  return res.status(200).json(comments);
};

const getAllCommentsByAuthor = async (req: Request, res: Response) => {
  const authorId = req.params.authorId;
  if (!authorId) {
    return res.status(400).json({ message: "Invalid article ID" });
  }

  const comments = await Comment.find({ author: authorId }).sort({
    createdAt: -1,
  });

  if (!comments) {
    return res
      .status(404)
      .json({ message: "No comments found by this author" });
  }

  return res.status(200).json(comments);
};

export {
  commentOnArticle,
  editComment,
  deleteComment,
  getComment,
  getAllCommentsByArticle,
  getAllCommentsByAuthor,
};
