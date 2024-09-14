export type User = {
  _id: string;
  username: string;
  name: string;
  email: string;
  bio?: string;
  avatar?: string;
  createdAt: Date;
};

export type Article = {
  _id: string;
  title: string;
  content: string;
  summary: string;
  image: string;
  author: User;
  tags: Tag[];
  createdAt: Date;
  updatedAt: Date;
  comments: Comment[];
};

export type Comment = {
  _id: string;
  content: string;
  article?: Article;
  author: User;
  createdAt: Date;
};

export type Tag = { _id: string; name: string };
