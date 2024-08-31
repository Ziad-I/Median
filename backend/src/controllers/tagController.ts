import { Request, Response } from "express";
import Tag from "../models/tagModel";
import Article from "../models/articleModel";

const getTagArticles = async (req: Request, res: Response) => {
  const tagName = req.params.tagName;
  if (!tagName) {
    return res.status(400).json({ message: "Invalid tag name" });
  }

  const tag = await Tag.findOne({ name: tagName });

  if (!tag) {
    return res.status(404).json({ message: "Tag not found" });
  }

  const articles = await Article.find({ tags: tag._id });
  if (!articles) {
    return res.status(404).json({ message: "No articles found for this tag" });
  }

  return res.status(200).json(articles);
};

const getAllTags = async (req: Request, res: Response) => {
  const tags = await Tag.find({});
  if (!tags) {
    return res.status(404).json({ message: "No tags found" });
  }
  return res.status(200).json(tags);
};

export { getTagArticles, getAllTags };
