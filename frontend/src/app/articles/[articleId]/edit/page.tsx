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

const simulateFetchArticle = async (id: string): Promise<Article> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const articleData: Article = {
    _id: id,
    title: "The Future of AI in Content Creation",
    content:
      "# Introduction\n\nArtificial Intelligence (AI) is revolutionizing many industries, and content creation is no exception. In this article, we'll explore how AI is shaping the future of content creation.\n\n## AI-Powered Writing Assistants\n\nAI writing assistants are becoming increasingly sophisticated, helping content creators to:\n\n- Generate ideas\n- Improve grammar and style\n- Optimize content for SEO\n\n## Personalized Content at Scale\n\nAI enables the creation of personalized content for individual users, taking into account their preferences, behavior, and demographics.\n\n## Challenges and Ethical Considerations\n\nWhile AI offers many benefits, it also raises important questions:\n\n1. Will AI replace human writers?\n2. How do we ensure AI-generated content is ethical and unbiased?\n3. What is the impact on creativity and originality?\n\n# Conclusion\n\nAI is set to play a significant role in the future of content creation, offering both exciting opportunities and important challenges to address.",
    summary:
      "Explore how AI is transforming content creation, from writing assistance to personalized content at scale.",
    image: "/placeholder.svg?height=400&width=800",
    author: {
      _id: "66e17c04c0fab701814a5eb0",
      name: "Alex Johnson",
      email: "alex@example.com",
      avatar: "/placeholder.svg?height=100&width=100",
    },
    tags: [
      { _id: "1", name: "AI" },
      { _id: "2", name: "Content Creation" },
      { _id: "3", name: "Technology" },
    ],
    createdAt: new Date("2023-06-15"),
    updatedAt: new Date("2023-06-16"),
    comments: [
      {
        _id: "1",
        content:
          "Great article! I'm excited to see how AI continues to evolve in this space.",
        author: {
          _id: "66e17c04c0fab701814a5eb0",
          name: "Sam Smith",
          avatar: "",
        },
        createdAt: new Date("2023-06-16"),
      },
      {
        _id: "2",
        content:
          "Interesting points about the ethical considerations. This is definitely something we need to keep in mind as AI becomes more prevalent in content creation.",
        author: {
          _id: "3",
          name: "Dr. Emily Chen",
          avatar: "",
        },
        createdAt: new Date("2023-06-17"),
      },
    ],
  };

  return articleData;
};

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

    // fetchArticle()
    simulateFetchArticle(articleId);
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
