"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import axios from "axios";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { EditArticleForm } from "@/components/pages/edit/EditArticleForm";
import { EditArticleSkeleton } from "@/components/pages/edit/EditArticleSkeleton";
import { useToast } from "@/hooks/UseToast";
import { useAuthStore } from "@/providers/AuthStoreProvider";
import { Article } from "@/lib/definitions";
import withAuth from "@/components/WithAuth";

function EditArticlePage() {
  const params = useParams();
  const articleId = params.articleId as string;
  const { userId } = useAuthStore((state) => state);
  const [article, setArticle] = useState<Article>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    const fetchArticle = async () => {
      setIsLoading(true);
      const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/articles/${articleId}`;
      try {
        const response = await axios.get(url);

        if (response.data._id !== userId) {
          toast({
            title: "Unauthorized",
            description: "You cannot edit an article you didn't publish!",
            variant: "destructive",
          });
          router.push(`/articles/${articleId}`);
        }

        setArticle(response.data);
      } catch (error) {
        setError("Failed to fetch article data. Please try again.");
        toast({
          title: "Error",
          description: "Failed to fetch article data. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticle();
  }, [articleId, toast, userId, router]);

  if (isLoading) {
    return <EditArticleSkeleton />;
  }

  if (error) {
    return <p className="text-destructive">{error}</p>;
  }

  if (!article) {
    return <p className="text-destructive">Failed to load article data</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>Edit Article</CardTitle>
        </CardHeader>
        <CardContent>
          {article && <EditArticleForm article={article} />}
        </CardContent>
      </Card>
    </div>
  );
}

export default withAuth(EditArticlePage);
