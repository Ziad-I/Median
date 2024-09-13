import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";

interface Comment {
  id: number;
  author: string;
  articleTitle: string;
  content: string;
  postedAt: string;
}

const fetchComments = () =>
  new Promise<Comment[]>((resolve) =>
    setTimeout(
      () =>
        resolve([
          {
            id: 1,
            author: "Alice",
            articleTitle: "The Future of AI in Content Creation",
            content: "Great article! I especially liked the part about...",
            postedAt: "2023-06-02",
          },
          {
            id: 2,
            author: "Bob",
            articleTitle: "10 Tips for Productive Writing",
            content:
              "These tips are really helpful. I've already started implementing...",
            postedAt: "2023-05-16",
          },
          {
            id: 3,
            author: "Charlie",
            articleTitle: "How to Build a Successful Blog",
            content:
              "This is exactly what I needed to read. Thanks for sharing!",
            postedAt: "2023-05-02",
          },
        ]),
      1500
    )
  );

export function CommentsList() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchComments()
      .then((data) => {
        setComments(data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to load comments");
        setLoading(false);
      });
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Comments</CardTitle>
        <CardDescription>Latest comments on your articles</CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-start space-x-4">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[250px]" />
                  <Skeleton className="h-4 w-[200px]" />
                  <Skeleton className="h-4 w-[150px]" />
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <p className="text-sm text-destructive">{error}</p>
        ) : (
          <div className="space-y-4">
            {comments.map((comment) => (
              <div key={comment.id} className="flex items-start space-x-4">
                <Avatar>
                  <AvatarImage
                    src={`/placeholder.svg?height=40&width=40`}
                    alt={comment.author}
                  />
                  <AvatarFallback>{comment.author[0]}</AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {comment.author}
                    <span className="ml-3 text-xs text-muted-foreground">
                      ({new Date(comment.postedAt).toLocaleDateString()})
                    </span>
                  </p>
                  <p className="text-sm text-muted-foreground">
                    On &ldquo;{comment.articleTitle}&rdquo;
                  </p>
                  <p className="text-sm">{comment.content}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
