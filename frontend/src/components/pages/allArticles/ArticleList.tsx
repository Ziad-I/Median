import ArticleCard from "./ArticleCard";

interface ArticleListProps {
  articles: Array<{
    id: number;
    title: string;
    excerpt: string;
    author: string;
    date: string;
    tags: string[];
  }>;
}

export default function ArticleList({ articles }: ArticleListProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {articles.map((article) => (
        <ArticleCard key={article.id} article={article} />
      ))}
    </div>
  );
}
