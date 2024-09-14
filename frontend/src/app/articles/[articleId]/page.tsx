"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Comment, Article } from "@/lib/definitions";
import { ArticleContent } from "@/components/pages/article/ArticleContent";
import ArticleHeader from "@/components/pages/article/ArticleHeader";
import ArticleSkeleton from "@/components/pages/article/ArticleSkeleton";
import { CommentSection } from "@/components/pages/article/CommentSection";
import withAuth from "@/components/WithAuth";

// Simulated API call
const fetchArticle = async (id: string): Promise<Article> => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const articleData: Article = {
    _id: 1,
    title: "The Future of AI in Content Creation",
    content:
      "# Introduction\n\nArtificial Intelligence (AI) is revolutionizing many industries, and content creation is no exception. In this article, we'll explore how AI is shaping the future of content creation.\n\n## AI-Powered Writing Assistants\n\nAI writing assistants are becoming increasingly sophisticated, helping content creators to:\n\n- Generate ideas\n- Improve grammar and style\n- Optimize content for SEO\n\n## Personalized Content at Scale\n\nAI enables the creation of personalized content for individual users, taking into account their preferences, behavior, and demographics.\n\n## Challenges and Ethical Considerations\n\nWhile AI offers many benefits, it also raises important questions:\n\n1. Will AI replace human writers?\n2. How do we ensure AI-generated content is ethical and unbiased?\n3. What is the impact on creativity and originality?\n\n# Conclusion\n\nAI is set to play a significant role in the future of content creation, offering both exciting opportunities and important challenges to address.",
    summary:
      "Explore how AI is transforming content creation, from writing assistance to personalized content at scale.",
    image: "/placeholder.svg?height=400&width=800",
    author: {
      _id: 1,
      username: "aiexpert",
      name: "Alex Johnson",
      email: "alex@example.com",
      bio: "AI researcher and tech enthusiast",
      avatar: "/placeholder.svg?height=100&width=100",
      createdAt: new Date("2022-01-01"),
    },
    tags: [
      { _id: 1, name: "AI" },
      { _id: 2, name: "Content Creation" },
      { _id: 3, name: "Technology" },
    ],
    createdAt: new Date("2023-06-15"),
    updatedAt: new Date("2023-06-16"),
    comments: [
      {
        _id: 1,
        content:
          "Great article! I'm excited to see how AI continues to evolve in this space.",
        author: {
          _id: 1,
          username: "techfan",
          name: "Sam Smith",
          email: "sam@example.com",
          createdAt: new Date("2022-03-15"),
        },
        createdAt: new Date("2023-06-16"),
      },
      {
        _id: 2,
        content:
          "Interesting points about the ethical considerations. This is definitely something we need to keep in mind as AI becomes more prevalent in content creation.",
        author: {
          _id: 3,
          username: "ethicsphd",
          name: "Dr. Emily Chen",
          email: "emily@example.com",
          createdAt: new Date("2021-09-01"),
        },
        createdAt: new Date("2023-06-17"),
      },
    ],
  };

  return articleData;
};

interface ArticlePageProps {
  currentUserId: number;
}

function ArticlePage({ currentUserId = 1 }: ArticlePageProps) {
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const params = useParams();

  useEffect(() => {
    const getArticle = async () => {
      try {
        const data = await fetchArticle(params.id as string);
        setArticle(data);
      } catch (err) {
        setError("An error occurred while fetching the article");
      } finally {
        setLoading(false);
      }
    };

    getArticle();
  }, [params.id]);

  if (loading) {
    return <ArticleSkeleton />;
  }

  if (error) {
    return <div className="text-center text-destructive">{error}</div>;
  }

  if (!article) {
    return <div className="text-center">Article not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <article className="max-w-3xl mx-auto">
        <ArticleHeader article={article} currentUserId={currentUserId} />
        <ArticleContent article={article} />
        <CommentSection
          comments={article.comments}
          currentUserId={currentUserId}
        />
      </article>
    </div>
  );
}

export default withAuth(ArticlePage);
