"use client";
import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { CommentCard } from "./CommentCard";
import { NewCommentForm } from "./NewCommentForm";
import { Comment } from "@/lib/definitions";
import { useAuthStore } from "@/providers/AuthStoreProvider";

type CommentSectionProps = {
  comments: Comment[];
};

export const CommentSection = React.memo(function CommentSection({
  comments: initialComments,
}: CommentSectionProps) {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const [comments, setComments] = useState<Comment[]>(initialComments);

  const handleAddComment = (newComment: Comment) => {
    setComments((prevComments) => [...prevComments, newComment]);
  };

  const handleEditComment = (commentId: string, newContent: string) => {
    setComments((prevComments) =>
      prevComments.map((comment) =>
        comment._id === commentId
          ? { ...comment, content: newContent }
          : comment
      )
    );
  };

  const handleDeleteComment = (commentId: string) => {
    setComments((prevComments) =>
      prevComments.filter((comment) => comment._id !== commentId)
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Comments</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {comments.map((comment) => (
            <CommentCard
              key={comment._id}
              comment={comment}
              onEdit={handleEditComment}
              onDelete={handleDeleteComment}
            />
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <NewCommentForm
          disabled={!isLoggedIn}
          onAddComment={handleAddComment}
        />
      </CardFooter>
    </Card>
  );
});
