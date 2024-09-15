"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useAuthStore } from "@/providers/AuthStoreProvider";
import { Comment } from "@/lib/definitions";
import { useParams } from "next/navigation";

type NewCommentFormProps = {
  disabled: boolean;
  onAddComment: (comment: Comment) => void;
};

export function NewCommentForm({
  disabled,
  onAddComment,
}: NewCommentFormProps) {
  const { userId } = useAuthStore((state) => state);
  const [commentContent, setCommentContent] = useState("");
  const params = useParams();

  const handleAddComment = (newCommentContent: string) => {
    if (!newCommentContent.trim()) return;

    const newComment: Comment = {
      _id: Date.now().toString(),
      content: newCommentContent,
      author: {
        _id: userId as string,
        name: "Current User",
        avatar: "",
      },
      createdAt: new Date(),
    };
    //TODO: API CALL TO ADD COMMENT TO ARTICLE
    //TODO: using params.id as article id
    onAddComment(newComment);
  };

  const handleSubmit = () => {
    handleAddComment(commentContent);
    setCommentContent("");
  };

  return (
    <div className="w-full">
      <Textarea
        value={commentContent}
        onChange={(e) => setCommentContent(e.target.value)}
        placeholder="Write a comment..."
        disabled={disabled}
      />
      <div className="flex justify-end mt-2">
        <Button onClick={handleSubmit} disabled={disabled}>
          Post Comment
        </Button>
      </div>
    </div>
  );
}
