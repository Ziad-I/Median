"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useQueryState } from "nuqs";
import SearchBar from "@/components/pages/AllArticles/SearchBar";
import TagFilter from "@/components/pages/AllArticles/TagFilter";
import ArticleList from "@/components/pages/AllArticles/ArticleList";
import PaginationControls from "@/components/pages/AllArticles/PaginationControls";
import AllArticlesSkeleton from "@/components/pages/AllArticles/AllArticlesSkeleton";
import { Button } from "@/components/ui/button";
import { Article, Tag } from "@/lib/definitions";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function fetchArticles(): Promise<Article[]> {
  await delay(1000); // Simulate network delay

  const articles: Article[] = Array.from({ length: 50 }, (_, i) => ({
    _id: `${i + 1}`,
    title: `Article ${i + 1}`,
    content: `Content for Article ${i + 1}`,
    summary: `This is a short excerpt for Article ${
      i + 1
    }. Click to read more.`,
    image: "/placeholder.svg?height=400&width=800",
    author: {
      _id: `${i + 1}`,
      name: `Author ${i + 1}`,
      email: `author${i + 1}@example.com`,
      avatar: "/placeholder.svg?height=100&width=100",
    },
    tags: [
      { _id: "1", name: `Tag ${(i % 5) + 1}` },
      { _id: "2", name: `Tag ${(i % 3) + 6}` },
    ],
    createdAt: new Date(2023, 0, i + 1),
    updatedAt: new Date(2023, 0, i + 2),
    comments: [],
  }));

  return articles;
}

export async function fetchTags(): Promise<string[]> {
  await delay(500); // Simulate network delay

  const tags = Array.from(
    new Set(
      Array.from({ length: 50 }, (_, i) => [
        `Tag ${(i % 5) + 1}`,
        `Tag ${(i % 3) + 6}`,
      ]).flat()
    )
  ).sort();

  return tags;
}

export default function AllArticlesPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useQueryState("search", {
    defaultValue: "",
  });
  const [selectedTags, setSelectedTags] = useQueryState<string[]>("tags", {
    defaultValue: [],
    parse: (value) => (value ? value.split(",") : []),
    serialize: (value) => value.join(","),
  });
  const [currentPage, setCurrentPage] = useQueryState("page", {
    defaultValue: 1,
    parse: Number,
  });

  const [articles, setArticles] = useState<Article[]>([]);
  const [allTags, setAllTags] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const itemsPerPage = 10;

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      setError(null);
      try {
        const [articlesData, tagsData] = await Promise.all([
          fetchArticles(),
          fetchTags(),
        ]);
        setArticles(articlesData);
        setAllTags(tagsData);
      } catch (err) {
        setError("Failed to fetch data. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  const filteredArticles = articles.filter(
    (article) =>
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedTags.length === 0 ||
        selectedTags.some((tag) =>
          article.tags.map((t: Tag) => t.name).includes(tag)
        ))
  );

  const totalPages = Math.ceil(filteredArticles.length / itemsPerPage);
  const displayedArticles = filteredArticles.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSearch = () => {
    setCurrentPage(1); // Reset to page 1 on search
    router.push(`/articles`);
  };

  const handleTagToggle = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  if (isLoading) {
    return <AllArticlesSkeleton />;
  }

  if (error) {
    return (
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-8">All Articles</h1>
        <p className="text-destructive-foreground">{error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">All Articles</h1>
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <TagFilter
          allTags={allTags}
          selectedTags={selectedTags}
          handleTagToggle={handleTagToggle}
        />
        <Button onClick={handleSearch}>Search</Button>
      </div>
      <ArticleList articles={displayedArticles} />
      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        updatePage={setCurrentPage}
      />
    </div>
  );
}
