import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { Article } from "@/lib/definitions";
import ConfirmDialog from "./ConfirmDialog";
import { useAuthStore } from "@/providers/AuthStoreProvider";

interface ArticleHeaderProps {
  article: Article;
}

export default function ArticleHeader({ article }: ArticleHeaderProps) {
  const { userId } = useAuthStore((state) => state);
  const router = useRouter();
  const isAuthor = userId === article.author._id;

  const handleEdit = () => {
    router.push(`/edit-article/${article._id}`);
  };

  const handleDelete = async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      router.push("/dashboard");
    } catch (err) {
      console.error("An error occurred while deleting the article");
    }
  };
  return (
    <>
      <div className="flex justify-between items-start mb-4">
        <h1 className="text-4xl font-bold">{article.title}</h1>
        {isAuthor && (
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" onClick={handleEdit}>
              <Pencil className="w-4 h-4 mr-2" /> Edit
            </Button>
            <ConfirmDialog
              title="Are you absolutely sure?"
              description="This action cannot be undone. This will permanently delete your article and remove it from our servers."
              onConfirm={handleDelete}
            />
          </div>
        )}
      </div>
      <div className="flex items-center mb-4">
        <Avatar className="h-10 w-10 mr-4">
          <AvatarImage src={article.author.avatar} alt={article.author.name} />
          <AvatarFallback>{article.author.name[0]}</AvatarFallback>
        </Avatar>
        <div>
          <p className="font-semibold">{article.author.name}</p>
          <p className="text-sm text-muted-foreground">
            {format(new Date(article.createdAt), "MMMM d, yyyy")}
          </p>
        </div>
      </div>
    </>
  );
}
