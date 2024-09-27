import { Request, Response } from "express";
import Article from "../models/articleModel";
import Tag from "../models/tagModel";
import cloudinaryUploadImage from "../config/cloudinary";

const getArticlesAndAuthors = async (req: Request, res: Response) => {
  const articles = await Article.find({})
    .sort({ createdAt: -1 })
    .populate("author", "name email avatar")
    .populate("tags");

  return res.status(200).json(articles);
};

const getAuthorArticles = async (req: Request, res: Response) => {
  const authorId = req.params.authorId;
  if (!authorId) {
    return res.status(400).json({ message: "Invalid author ID" });
  }

  const articles = await Article.find({ author: authorId })
    .sort({ createdAt: -1 })
    .populate("tags");

  return res.status(200).json(articles);
};

const getArticle = async (req: Request, res: Response) => {
  const articleId = req.params.articleId;
  if (!articleId) {
    return res.status(400).json({ message: "Invalid article ID" });
  }

  const article = await Article.findById(articleId)
    .populate({
      path: "comments",
      select: "content createdAt",
      populate: {
        path: "author",
        select: "_id name avatar",
      },
    })
    .populate({
      path: "author",
      select: "_id name email avatar",
    })
    .populate({
      path: "tags",
      select: "name",
    });

  if (!article) {
    return res.status(404).json({ message: "Article not found" });
  }

  return res.status(200).json(article);
};

const getArticleByTitle = async (req: Request, res: Response) => {
  const slug = req.params.title;
  console.log(slug);
  if (!slug) {
    return res.status(400).json({ message: "Invalid article title" });
  }

  const title = slug.split("-").join(" ");
  console.log(title);
  const article = await Article.findOne({ title: title })
    .collation({ locale: "en", strength: 2 })
    .populate({
      path: "comments",
      select: "content createdAt",
      populate: {
        path: "author",
        select: "_id name avatar",
      },
    })
    .populate({
      path: "author",
      select: "_id name email avatar",
    })
    .populate({
      path: "tags",
      select: "name",
    });

  if (!article) {
    return res.status(404).json({ message: "Article not found" });
  }

  return res.status(200).json(article);
};

const createArticle = async (req: Request, res: Response) => {
  const userId = req.userId;
  if (!userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const { title, content, summary, image, tags } = req.body;

  if (!title || !content || !summary) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    let imageUrl = "";
    if (image) imageUrl = await cloudinaryUploadImage(image);

    const articleRef = new Article({
      title,
      content,
      summary,
      imageUrl,
      author: userId,
      tags: [], // Tags will be handled separately
    });

    const tagIds = await Promise.all(
      tags.map(async (tagName: string) => {
        let tag = await Tag.findOne({ name: tagName });
        if (!tag) {
          tag = new Tag({ name: tagName });
          await tag.save();
        }
        return tag._id;
      })
    );

    articleRef.tags = tagIds;

    const article = await articleRef.save();

    res.status(200).json({ message: "Article created successfully", article });
  } catch (error) {
    console.error("Error creating article:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

const editArticle = async (req: Request, res: Response) => {
  const userId = req.userId;
  if (!userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const articleId = req.params.articleId;
  if (!articleId) {
    return res.status(400).json({ message: "Invalid article ID" });
  }

  const article = await Article.findById(articleId);
  if (!article) {
    return res.status(404).json({ message: "Article not found" });
  }

  // handle having new tags and old tags
  const tagIds = await Promise.all(
    req.body.tags.map(async (tagName: string) => {
      let tag = await Tag.findOne({ name: tagName });
      if (!tag) {
        tag = new Tag({ name: tagName });
        await tag.save();
      }
      return tag._id;
    })
  );
  req.body.tags = tagIds;
  const updateResult = await Article.updateOne({ _id: articleId }, req.body);
  if (updateResult.modifiedCount !== 1) {
    return res.status(500).json({ message: "Failed to update article" });
  }

  return res.status(200).json({ message: "Articile updated successfully" });
};

const deleteArticle = async (req: Request, res: Response) => {
  const userId = req.userId;
  if (!userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const articleId = req.params.articleId;
  if (!articleId) {
    return res.status(400).json({ message: "Invalid article ID" });
  }

  const article = await Article.findById(articleId);
  if (!article) {
    return res.status(404).json({ message: "Article not found" });
  }

  const deleteResult = await Article.deleteOne({ _id: articleId });
  if (deleteResult.deletedCount !== 1) {
    return res.status(500).json({ message: "Failed to delete article" });
  }

  return res.status(200).json({ message: "Article deleted successfully" });
};

export {
  getArticlesAndAuthors,
  getAuthorArticles,
  getArticle,
  getArticleByTitle,
  createArticle,
  editArticle,
  deleteArticle,
};
