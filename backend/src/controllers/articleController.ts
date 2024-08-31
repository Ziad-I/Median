import { Request, Response } from "express";
import Article from "../models/articleModel";
import Tag from "../models/tagModel";

const getArticlesAndAuthors = async (req: Request, res: Response) => {
  const articles = await Article.find({})
    .sort({ createdAt: -1 })
    .populate("author", "username email avatar");

  return res.status(200).json(articles);
};

const getAuthorArticles = async (req: Request, res: Response) => {
  const authorId = req.params.authorId;
  if (!authorId) {
    return res.status(400).json({ message: "Invalid author ID" });
  }

  const articles = await Article.find({ author: authorId })
    .sort({ createdAt: -1 })
    .populate("author", "username email avatar");

  return res.status(200).json(articles);
};

const getArticle = async (req: Request, res: Response) => {
  const articleId = req.params.articleId;
  if (!articleId) {
    return res.status(400).json({ message: "Invalid article ID" });
  }

  const article = await Article.findById(articleId).populate(
    "comments",
    "content, author, createdAt"
  );
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

  let content: string = req.params.content ?? "";
  const codeRegex = /<code>(.*?)<\/code>/g;
  const withoutCode = content.replace(codeRegex, "");
  let imgRegex = /<img.*?src=['"](.*?)['"]/;
  let t = imgRegex.exec(content);
  const imgUrl = t ? t[1] : undefined;
  const htmlRegexG = /<(?:"[^"]*"['"]*|'[^']*'['"]*|[^'">])+>/g;
  const summary = withoutCode.replace(htmlRegexG, "");

  const articleRef = new Article({
    title: req.params.title,
    content,
    summary,
    image: imgUrl,
    author: userId,
    tags: req.params.tags.split(","),
  });

  const article = await articleRef.save();

  // Handle tags
  Promise.all(
    article.tags.map(async (item) => {
      const isTag = await Tag.findOne({ name: item });
      if (!isTag) await new Tag({ name: item }).save();
    })
  );

  res.status(200).json(article);
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

  const updateResult = await Article.updateOne({ _id: articleId }, req.params);
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
  createArticle,
  editArticle,
  deleteArticle,
};
