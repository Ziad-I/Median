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

type CommentSectionProps = {
  comments: Comment[];
  currentUserId: number;
};

export const CommentSection = React.memo(function CommentSection({
  comments: initialComments,
  currentUserId,
}: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>(initialComments);

  const handleAddComment = (newCommentContent: string) => {
    if (!newCommentContent.trim()) return;

    const newComment: Comment = {
      _id: Date.now(),
      content: newCommentContent,
      author: {
        _id: currentUserId,
        username: "currentuser",
        name: "Current User",
        email: "currentuser@example.com",
        createdAt: new Date(),
      },
      createdAt: new Date(),
    };

    setComments((prevComments) => [...prevComments, newComment]);
  };

  const handleEditComment = (commentId: number, newContent: string) => {
    setComments((prevComments) =>
      prevComments.map((comment) =>
        comment._id === commentId
          ? { ...comment, content: newContent }
          : comment
      )
    );
  };

  const handleDeleteComment = (commentId: number) => {
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
              currentUserId={currentUserId}
              onEdit={handleEditComment}
              onDelete={handleDeleteComment}
            />
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <NewCommentForm onAddComment={handleAddComment} />
      </CardFooter>
    </Card>
  );
});
