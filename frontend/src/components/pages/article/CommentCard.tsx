"use client";
import { useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Pencil, Trash2 } from "lucide-react";
import { format } from "date-fns";
import { Comment } from "@/lib/definitions";
import ConfirmDialog from "./ConfirmDialog";
import MarkdownRenderer from "@/components/MarkdownRenderer";

type CommentCardProps = {
  comment: Comment;
  currentUserId: number;
  onEdit: (id: number, content: string) => void;
  onDelete: (id: number) => void;
};

export function CommentCard({
  comment,
  currentUserId,
  onEdit,
  onDelete,
}: CommentCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [newContent, setNewContent] = useState(comment.content);
  const isAuthor = currentUserId === comment.author._id;

  const handleSaveEdit = () => {
    onEdit(comment._id, newContent);
    setIsEditing(false);
  };

  return (
    <Card>
      <CardContent>
        <div className="flex items-start mb-4 mt-4">
          <Avatar className="h-8 w-8 mr-4">
            <AvatarImage
              src={comment.author.avatar}
              alt={comment.author.name}
            />
            <AvatarFallback>{comment.author.name[0]}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold">{comment.author.name}</p>
            <p className="text-sm text-muted-foreground">
              {format(new Date(comment.createdAt), "MMMM d, yyyy")}
            </p>
          </div>
        </div>
        {isEditing ? (
          <Textarea
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
          />
        ) : (
          <>
            <MarkdownRenderer content={comment.content}></MarkdownRenderer>
          </>
        )}
      </CardContent>
      {isAuthor && (
        <CardFooter className="flex justify-end space-x-2">
          {isEditing ? (
            <Button size="sm" onClick={handleSaveEdit}>
              Save
            </Button>
          ) : (
            <>
              <Button
                size="sm"
                variant="outline"
                onClick={() => setIsEditing(true)}
              >
                <Pencil className="w-4 h-4 mr-2" /> Edit
              </Button>
              <ConfirmDialog
                title="Are you sure?"
                description="This action cannot be undone. This will permanently delete your comment."
                onConfirm={() => onDelete(comment._id)}
              />
            </>
          )}
        </CardFooter>
      )}
    </Card>
  );
}
