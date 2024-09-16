"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import SearchBar from "@/components/pages/AllArticles/SearchBar";
import TagFilter from "@/components/pages/AllArticles/TagFilter";
import ArticleList from "@/components/pages/AllArticles/ArticleList";
import PaginationControls from "@/components/pages/AllArticles/PaginationControls";
import AllArticlesSkeleton from "@/components/pages/AllArticles/AllArticlesSkeleton";
import { Button } from "@/components/ui/button";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

interface Article {
  id: number;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  tags: string[];
}

export async function fetchArticles(): Promise<Article[]> {
  await delay(1000); // Simulate network delay

  // Simulated article data
  const articles = Array.from({ length: 50 }, (_, i) => ({
    id: i + 1,
    title: `Article ${i + 1}`,
    excerpt: `This is a short excerpt for Article ${
      i + 1
    }. Click to read more.`,
    author: `Author ${i + 1}`,
    date: new Date(2023, 0, i + 1).toLocaleDateString(),
    tags: [`Tag ${(i % 5) + 1}`, `Tag ${(i % 3) + 6}`],
  }));

  return articles;
}

export async function fetchTags(): Promise<string[]> {
  await delay(500); // Simulate network delay

  // Simulated tag data
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
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("search") || ""
  );
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [articles, setArticles] = useState<Article[]>([]);
  const [allTags, setAllTags] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const itemsPerPage = 10;

  useEffect(() => {
    const tags = searchParams.get("tags");
    if (tags) {
      setSelectedTags(tags.split(","));
    }
    const page = searchParams.get("page");
    if (page) {
      setCurrentPage(Number(page));
    }
  }, [searchParams]);

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
        selectedTags.some((tag) => article.tags.includes(tag)))
  );

  const totalPages = Math.ceil(filteredArticles.length / itemsPerPage);
  const displayedArticles = filteredArticles.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSearch = () => {
    const params = new URLSearchParams();
    params.set("search", searchTerm);
    if (selectedTags.length > 0) {
      params.set("tags", selectedTags.join(","));
    }
    params.set("page", "1");
    router.push(`/articles?${params.toString()}`);
  };

  const handleTagToggle = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const updatePage = (page: number) => {
    setCurrentPage(page);
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    router.push(`/articles?${params.toString()}`);
  };

  if (isLoading) {
    return <AllArticlesSkeleton />;
  }

  if (error) {
    return (
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-8">All Articles</h1>
        <p className="text-destructive">{error}</p>
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
        updatePage={updatePage}
      />
    </div>
  );
}
