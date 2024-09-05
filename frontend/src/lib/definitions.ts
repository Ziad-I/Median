export type User = {
  username: string;
  name: string;
  email: string;
  bio?: string;
  avatar?: string;
  createdAt: Date;
};

export type Article = {
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
  content: string;
  article?: Article;
  author: User;
  createdAt: Date;
};

export type Tag = { name: string };
