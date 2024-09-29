"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { CalendarIcon, MessageCircle } from "lucide-react";

interface Comment {
  _id: number;
  author: string;
  articleTitle: string;
  content: string;
  createdAt: string;
}

const fetchComments = () =>
  new Promise<Comment[]>((resolve) =>
    setTimeout(
      () =>
        resolve([
          {
            _id: 1,
            author: "Alice",
            articleTitle: "The Future of AI in Content Creation",
            content: "Great article! I especially liked the part about...",
            createdAt: "2023-06-02",
          },
          {
            _id: 2,
            author: "Bob",
            articleTitle: "10 Tips for Productive Writing",
            content:
              "These tips are really helpful. I've already started implementing...",
            createdAt: "2023-05-16",
          },
          {
            _id: 3,
            author: "Charlie",
            articleTitle: "How to Build a Successful Blog",
            content:
              "This is exactly what I needed to read. Thanks for sharing!",
            createdAt: "2023-05-02",
          },
        ]),
      1500
    )
  );

function CommentSkeleton() {
  return (
    <Card className="animate-pulse">
      <CardContent className="p-4">
        <div className="flex items-start space-x-4">
          <Skeleton className="h-10 w-10 rounded-full" />
          <div className="space-y-2 flex-1">
            <div className="flex items-center justify-between">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-20" />
            </div>
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

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
              <CommentSkeleton key={i} />
            ))}
          </div>
        ) : error ? (
          <p className="text-sm text-destructive-foreground">{error}</p>
        ) : (
          <div className="space-y-4">
            {comments.map((comment) => (
              <Card
                key={comment._id}
                className="hover:bg-accent transition-colors duration-200"
              >
                <CardContent className="p-4">
                  <Link
                    href={`/articles/${encodeURIComponent(
                      comment.articleTitle.toLowerCase().replace(/ /g, "-")
                    )}`}
                    className="block"
                  >
                    <div className="flex items-start space-x-4">
                      <Avatar>
                        <AvatarImage
                          src={`/placeholder.svg?height=40&width=40`}
                          alt={comment.author}
                        />
                        <AvatarFallback>{comment.author[0]}</AvatarFallback>
                      </Avatar>
                      <div className="space-y-1 flex-1">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium leading-none">
                            {comment.author}
                          </p>
                          <div className="flex items-center text-xs text-muted-foreground">
                            <CalendarIcon className="mr-1 h-3 w-3" />
                            {new Date(comment.createdAt).toLocaleDateString()}
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground flex items-center">
                          <MessageCircle className="mr-1 h-3 w-3" />
                          On &ldquo;{comment.articleTitle}&rdquo;
                        </p>
                        <p className="text-sm">{comment.content}</p>
                      </div>
                    </div>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
