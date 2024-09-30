"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { CalendarIcon, EyeIcon } from "lucide-react";
import { generateSlug } from "@/lib/slugify";
import { toast, useToast } from "@/hooks/UseToast";
import { useAuthStore } from "@/providers/AuthStoreProvider";
import axios from "axios";
import { Article } from "@/lib/definitions";

const simulateFetchArticles = () =>
  new Promise<Article[]>((resolve) =>
    setTimeout(
      () =>
        resolve([
          {
            _id: "1",
            title: "The Future of AI in Content Creation",
            createdAt: new Date("2023-06-01"),
            views: 3400,
          },
          {
            _id: "2",
            title: "10 Tips for Productive Writing",
            createdAt: new Date("2023-06-01"),
            views: 2100,
          },
          {
            _id: "3",
            title: "How to Build a Successful Blog",
            createdAt: new Date("2023-06-01"),
            views: 1800,
          },
        ]),
      1000
    )
  );

function ArticleCardSkeleton() {
  return (
    <Card className="animate-pulse">
      <CardContent className="p-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between">
          <div className="space-y-2 flex-1">
            <Skeleton className="h-5 w-3/4" />
            <div className="flex items-center">
              <Skeleton className="h-4 w-4 mr-1" />
              <Skeleton className="h-4 w-1/3" />
            </div>
          </div>
          <div className="flex items-center mt-2 sm:mt-0">
            <Skeleton className="h-4 w-4 mr-1" />
            <Skeleton className="h-4 w-16" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function ArticlesList() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { userId, accessToken } = useAuthStore((state) => state);
  const { toast } = useToast();

  const fetchArticles = useCallback(async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/comments/author/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`, // Send accessToken in the Authorization header
          },
        }
      );
      setArticles(response.data);
    } catch (err) {
      setError("Failed to load articles");
      toast({
        title: "Error",
        description: "Failed to fetch articles. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [userId, accessToken]);

  useEffect(() => {
    simulateFetchArticles()
      .then((data) => {
        setArticles(data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to load articles");
        toast({
          title: "Error",
          description: "Failed to fetch articles. Please try again.",
          variant: "destructive",
        });
        setLoading(false);
      });

    // fetchArticles()
  }, [fetchArticles]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Articles</CardTitle>
        <CardDescription>Your latest published articles</CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <ArticleCardSkeleton key={i} />
            ))}
          </div>
        ) : error ? (
          <p className="text-sm text-destructive-foreground">{error}</p>
        ) : (
          <div className="space-y-4">
            {articles.map((article) => (
              <Link
                href={`/articles/${generateSlug(article.title as string)}`}
                key={article._id}
                className="block"
              >
                <Card className="hover:bg-accent transition-colors duration-200">
                  <CardContent className="p-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                      <div className="space-y-1">
                        <h3 className="text-lg font-semibold leading-none">
                          {article.title}
                        </h3>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <CalendarIcon className="mr-1 h-4 w-4" />
                          Published on {article.createdAt?.toLocaleDateString()}
                        </div>
                      </div>
                      <div className="flex items-center mt-2 sm:mt-0">
                        <EyeIcon className="mr-1 h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-medium">
                          {article.views?.toLocaleString()} views
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
