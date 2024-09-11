import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

interface Article {
  id: number
  title: string
  publishDate: string
  views: number
}

const fetchArticles = () => new Promise<Article[]>(resolve => setTimeout(() => resolve([
  { id: 1, title: "The Future of AI in Content Creation", publishDate: "2023-06-01", views: 3400 },
  { id: 2, title: "10 Tips for Productive Writing", publishDate: "2023-05-15", views: 2100 },
  { id: 3, title: "How to Build a Successful Blog", publishDate: "2023-05-01", views: 1800 },
]), 1000))

export function ArticlesList() {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchArticles()
      .then(data => {
        setArticles(data)
        setLoading(false)
      })
      .catch(err => {
        setError("Failed to load articles")
        setLoading(false)
      })
  }, [])

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
              <div key={i} className="flex items-center space-x-4">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[250px]" />
                  <Skeleton className="h-4 w-[200px]" />
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <p className="text-sm text-red-500">{error}</p>
        ) : (
          <div className="space-y-4">
            {articles.map((article) => (
              <div key={article.id} className="flex items-center">
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">{article.title}</p>
                  <p className="text-sm text-muted-foreground">Published on {article.publishDate}</p>
                </div>
                <div className="ml-auto font-medium">{article.views} views</div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}