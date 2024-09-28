"use client";

import { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useParams } from "next/navigation";
// import { Article } from "@/lib/definitions";

type Article = {
  id: string;
  title: string;
  summary: string;
  createdAt: string;
};

// Simulated API call
const fetchArticles = async (userId: string): Promise<Article[]> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return [
    {
      id: "1",
      title: "The Future of AI in Web Development",
      summary:
        "Exploring how artificial intelligence is shaping the landscape of web development and what it means for developers.",
      createdAt: "2023-05-15T10:00:00Z",
    },
    {
      id: "2",
      title: "Mastering React Hooks",
      summary:
        "A comprehensive guide to using React Hooks effectively in your projects.",
      createdAt: "2023-04-22T14:30:00Z",
    },
    {
      id: "3",
      title: "The Rise of Serverless Architecture",
      summary:
        "Understanding the benefits and challenges of serverless architecture in modern web applications.",
      createdAt: "2023-03-10T09:15:00Z",
    },
  ];
};

function ArticleListSkeleton() {
  return (
    <div className="space-y-4">
      {[1, 2, 3].map((i) => (
        <Skeleton key={i} className="h-[200px] w-full" />
      ))}
    </div>
  );
}

export function ArticleList() {
  const params = useParams();
  const userId = params.userId as string;
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Memoize the API call to avoid re-fetching unnecessarily
  const loadArticles = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await fetchArticles(userId);
      setArticles(data);
    } catch (err) {
      setError("Failed to fetch articles. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    loadArticles();
  }, [loadArticles]);

  if (isLoading) {
    return <ArticleListSkeleton />;
  }

  if (error) {
    return <div className="text-destructive-foreground">{error}</div>;
  }

  if (articles.length === 0) {
    return <div>No articles published yet.</div>;
  }

  return (
    <div className="space-y-4">
      {articles.map((article) => (
        <Card key={article.id} className="mb-4">
          <CardHeader>
            <CardTitle>{article.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-2">
              {article.summary}
            </p>
            <p className="text-xs text-muted-foreground">
              Published on {new Date(article.createdAt).toLocaleDateString()}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
