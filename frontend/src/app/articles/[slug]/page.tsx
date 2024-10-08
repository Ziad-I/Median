"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Article } from "@/lib/definitions";
import { ArticleContent } from "@/components/pages/article/ArticleContent";
import ArticleHeader from "@/components/pages/article/ArticleHeader";
import ArticleSkeleton from "@/components/pages/article/ArticleSkeleton";
import { CommentSection } from "@/components/pages/article/CommentSection";
import { useToast } from "@/hooks/UseToast";
import axios from "axios";

// Simulation function (kept as is)
const fetchArticleSimulated = async (slug: string): Promise<Article> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const title = slug.split("-").join(" ");
  const articleData: Article = {
    _id: "id",
    title: title,
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

function ArticlePage() {
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  const params = useParams();

  useEffect(() => {
    const getArticle = async () => {
      const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/articles/title/${params.slug}`;
      try {
        const response = await axios.get(url);
        setArticle(response.data);
      } catch (err) {
        setError("An error occurred while fetching the article");
        toast({
          title: "Error",
          description: "Failed to fetch article data. Please try again.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    getArticle();
  }, [params.slug]);

  if (loading) {
    return <ArticleSkeleton />;
  }

  if (error) {
    return (
      <div className="text-center text-destructive-foreground">{error}</div>
    );
  }

  if (!article) {
    return <div className="text-center">Article not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <article className="max-w-3xl mx-auto">
        <ArticleHeader article={article} />
        <ArticleContent article={article} />
        <CommentSection comments={article.comments} />
      </article>
    </div>
  );
}

export default ArticlePage;
