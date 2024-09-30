"use client";

import { useState, useEffect, useCallback } from "react";
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
import { useToast } from "@/hooks/UseToast";
import { useAuthStore } from "@/providers/AuthStoreProvider";
import axios from "axios";
import { Comment } from "@/lib/definitions";
import { generateSlug } from "@/lib/slugify";

const simulateFetchComments = () =>
  new Promise<Comment[]>((resolve) =>
    setTimeout(
      () =>
        resolve([
          {
            _id: "1",
            author: { _id: "1", name: "Alice", avatar: "" },
            articleTitle: "The Future of AI in Content Creation",
            content: "Great article! I especially liked the part about...",
            createdAt: new Date("2023-05-16"),
          },
          {
            _id: "2",
            author: { _id: "2", name: "bob", avatar: "" },
            articleTitle: "10 Tips for Productive Writing",
            content:
              "These tips are really helpful. I've already started implementing...",
            createdAt: new Date("2023-05-16"),
          },
          {
            _id: "3",
            author: { _id: "3", name: "charlie", avatar: "" },
            articleTitle: "How to Build a Successful Blog",
            content:
              "This is exactly what I needed to read. Thanks for sharing!",
            createdAt: new Date("2023-05-16"),
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
  const { toast } = useToast();
  const { userId, accessToken } = useAuthStore((state) => state);

  const fetchComments = useCallback(async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/comments/author/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`, // Send accessToken in the Authorization header
          },
        }
      );
      setComments(response.data);
    } catch (err) {
      setError("Failed to load comments");
      toast({
        title: "Error",
        description: "Failed to fetch comments. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [userId, accessToken]);

  useEffect(() => {
    simulateFetchComments()
      .then((data) => {
        setComments(data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to load comments");
        toast({
          title: "Error",
          description: "Failed to fetch comments. Please try again.",
          variant: "destructive",
        });
        setLoading(false);
      });

    // fetchComments();
  }, [fetchComments]);

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
                    href={`/articles/${generateSlug(
                      comment.article?.title as string
                    )}`}
                    className="block"
                  >
                    <div className="flex items-start space-x-4">
                      <Avatar>
                        <AvatarImage
                          src={`/placeholder.svg?height=40&width=40`}
                          alt={comment.author?.name}
                        />
                        <AvatarFallback>
                          {comment.author?.name[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div className="space-y-1 flex-1">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium leading-none">
                            {comment.author?.name}
                          </p>
                          <div className="flex items-center text-xs text-muted-foreground">
                            <CalendarIcon className="mr-1 h-3 w-3" />
                            {comment.createdAt?.toLocaleDateString()}
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
