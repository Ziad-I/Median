"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

type NewCommentFormProps = {
  onAddComment: (content: string) => void;
};

export function NewCommentForm({ onAddComment }: NewCommentFormProps) {
  const [commentContent, setCommentContent] = useState("");

  const handleSubmit = () => {
    onAddComment(commentContent);
    setCommentContent("");
  };

  return (
    <div className="w-full">
      <Textarea
        value={commentContent}
        onChange={(e) => setCommentContent(e.target.value)}
        placeholder="Write a comment..."
      />
      <div className="flex justify-end mt-2">
        <Button onClick={handleSubmit}>Post Comment</Button>
      </div>
    </div>
  );
}
