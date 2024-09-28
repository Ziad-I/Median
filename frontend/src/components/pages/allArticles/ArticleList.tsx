import ArticleCard from "./ArticleCard";
import { Article } from "@/lib/definitions"; // Import your defined Article type

interface ArticleListProps {
  articles: Article[]; // Use the imported Article type
}

export default function ArticleList({ articles }: ArticleListProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {articles.map((article) => (
        <ArticleCard key={article._id} article={article} />
      ))}
    </div>
  );
}
