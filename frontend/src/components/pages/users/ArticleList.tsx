"use client";

import { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/UseToast";
import { generateSlug } from "@/lib/slugify";
import Link from "next/link";
// import { Article } from "@/lib/definitions";

type Article = {
  _id: string;
  title: string;
  summary: string;
  createdAt: Date;
};

// Simulated API call
const fetchArticles = async (userId: string): Promise<Article[]> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return [
    {
      _id: "1",
      title: "The Future of AI in Web Development",
      summary:
        "Exploring how artificial intelligence is shaping the landscape of web development and what it means for developers.",
      createdAt: new Date(),
    },
    {
      _id: "2",
      title: "Mastering React Hooks",
      summary:
        "A comprehensive guide to using React Hooks effectively in your projects.",
      createdAt: new Date(),
    },
    {
      _id: "3",
      title: "The Rise of Serverless Architecture",
      summary:
        "Understanding the benefits and challenges of serverless architecture in modern web applications.",
      createdAt: new Date(),
    },
  ];
};

function ArticleCardSkeleton() {
  return (
    <Card className="mb-4">
      <CardHeader>
        <Skeleton className="h-6 w-3/4" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-2/3 mb-4" />
        <Skeleton className="h-3 w-1/4" />
      </CardContent>
    </Card>
  );
}

function ArticleListSkeleton() {
  return (
    <div className="space-y-4">
      {[1, 2, 3].map((i) => (
        <ArticleCardSkeleton key={i} />
      ))}
    </div>
  );
}

interface ArticleListProps {
  userId: string | undefined;
  userLoading: boolean;
  userError: string | null;
}

export function ArticleList({
  userId,
  userLoading,
  userError,
}: ArticleListProps) {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  // Memoize the API call to avoid re-fetching unnecessarily
  const loadArticles = useCallback(async () => {
    if (!userId) return;

    setIsLoading(true);
    try {
      const data = await fetchArticles(userId);
      setArticles(data);
    } catch (err) {
      setError("Failed to fetch articles. Please try again.");
      toast({
        title: "Error",
        description: "Failed to fetch user articles. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    if (userId && !userLoading) {
      loadArticles();
    }
  }, [userId, userLoading, loadArticles]);

  if (isLoading || userLoading) {
    return <ArticleListSkeleton />;
  }

  if (userError || error) {
    return (
      <div className="text-destructive-foreground">{userError || error}</div>
    );
  }

  if (articles.length === 0) {
    return <div>No articles published yet.</div>;
  }

  return (
    <div className="space-y-4">
      {articles.map((article) => (
        <Link
          href={`/articles/${generateSlug(article.title)}`}
          key={article._id}
        >
          <Card className="mb-4 hover:bg-accent transition-colors duration-200">
            <CardHeader>
              <CardTitle>{article.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-2">
                {article.summary}
              </p>
              <p className="text-xs text-muted-foreground">
                Published on {article.createdAt.toLocaleDateString()}
              </p>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}
