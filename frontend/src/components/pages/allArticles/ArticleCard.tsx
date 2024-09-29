import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { generateSlug } from "@/lib/slugify";
import { useRouter } from "next/navigation";
import { Article, Tag } from "@/lib/definitions";
import Link from "next/link";

interface ArticleCardProps {
  article: Article;
}

export default function ArticleCard({ article }: ArticleCardProps) {
  return (
    <Link href={`/articles/${generateSlug(article.title)}`}>
      <Card>
        <CardHeader>
          <CardTitle>{article.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            {article.summary}
          </p>
          <div className="flex flex-wrap gap-2">
            {article.tags.map((tag: Tag) => (
              <Badge key={tag._id} variant="secondary">
                {tag.name}
              </Badge>
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between text-sm text-muted-foreground">
          <span>{article.author.name}</span>
          <span>{new Date(article.createdAt).toLocaleDateString()}</span>
        </CardFooter>
      </Card>
    </Link>
  );
}
