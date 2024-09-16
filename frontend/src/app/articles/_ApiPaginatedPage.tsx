"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import SearchBar from "@/components/pages/allArticles/SearchBar";
import TagFilter from "@/components/pages/allArticles/TagFilter";
import ArticleList from "@/components/pages/allArticles/ArticleList";
import PaginationControls from "@/components/pages/allArticles/PaginationControls";
import AllArticlesSkeleton from "@/components/pages/allArticles/AllArticlesSkeleton";
import { Button } from "@/components/ui/button";

// Simulated delay to mimic network latency
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

interface Article {
  id: number;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  tags: string[];
}

interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
}

async function fetchArticles(
  page: number = 1,
  pageSize: number = 10,
  searchTerm: string = "",
  tags: string[] = []
): Promise<PaginatedResponse<Article>> {
  await delay(1000); // Simulate network delay

  // Simulated article data
  const allArticles = Array.from({ length: 50 }, (_, i) => ({
    id: i + 1,
    title: `Article ${i + 1}`,
    excerpt: `This is a short excerpt for Article ${
      i + 1
    }. Click to read more.`,
    author: `Author ${i + 1}`,
    date: new Date(2023, 0, i + 1).toLocaleDateString(),
    tags: [`Tag ${(i % 5) + 1}`, `Tag ${(i % 3) + 6}`],
  }));

  // Filter articles based on search term and tags
  const filteredArticles = allArticles.filter(
    (article) =>
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (tags.length === 0 || tags.some((tag) => article.tags.includes(tag)))
  );

  // Calculate pagination
  const start = (page - 1) * pageSize;
  const paginatedArticles = filteredArticles.slice(start, start + pageSize);

  return {
    data: paginatedArticles,
    total: filteredArticles.length,
    page,
    pageSize,
  };
}

async function fetchTags(): Promise<string[]> {
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

function AllArticlesPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("search") || ""
  );
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [articles, setArticles] = useState<Article[]>([]);
  const [totalArticles, setTotalArticles] = useState(0);
  const [allTags, setAllTags] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const tags = searchParams.get("tags");
    if (tags) {
      setSelectedTags(tags.split(","));
    }
    const page = searchParams.get("page");
    if (page) {
      setCurrentPage(Number(page));
    }
    const search = searchParams.get("search");
    if (search) {
      setSearchTerm(search);
    }
  }, [searchParams]);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      setError(null);
      try {
        const [articlesData, tagsData] = await Promise.all([
          fetchArticles(currentPage, pageSize, searchTerm, selectedTags),
          fetchTags(),
        ]);
        setArticles(articlesData.data);
        setTotalArticles(articlesData.total);
        setAllTags(tagsData);
      } catch (err) {
        setError("Failed to fetch data. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [currentPage, pageSize, searchTerm, selectedTags]);

  const totalPages = Math.ceil(totalArticles / pageSize);

  const handleSearch = () => {
    setCurrentPage(1);
    updateUrlParams();
  };

  const handleTagToggle = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
    setCurrentPage(1);
  };

  const updatePage = (page: number) => {
    setCurrentPage(page);
    updateUrlParams();
  };

  const updateUrlParams = () => {
    const params = new URLSearchParams();
    if (searchTerm) params.set("search", searchTerm);
    if (selectedTags.length > 0) {
      params.set("tags", selectedTags.join(","));
    }
    params.set("page", currentPage.toString());
    router.push(`/articles?${params.toString()}`);
  };

  if (isLoading) {
    return <AllArticlesSkeleton />;
  }

  if (error) {
    return (
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-8">All Articles</h1>
        <p className="text-red-500">{error}</p>
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
      <ArticleList articles={articles} />
      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        updatePage={updatePage}
      />
    </div>
  );
}
