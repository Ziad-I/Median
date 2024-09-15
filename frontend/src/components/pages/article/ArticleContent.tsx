import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { Article } from "@/lib/definitions";
import MarkdownRenderer from "@/components/MarkdownRenderer";

type ArticleContentProps = {
  article: Article;
};

export function ArticleContent({ article }: ArticleContentProps) {
  return (
    <>
      <Image
        src={article.image}
        alt={article.title}
        height={400}
        width={800}
        className="w-full h-64 object-cover rounded-lg mb-6"
      />
      <div className="prose max-w-none mb-8">
        <MarkdownRenderer content={article.content}></MarkdownRenderer>
      </div>
      <div className="mb-8">
        {article.tags.map((tag) => (
          <Badge key={tag._id} variant="secondary" className="mr-2">
            {tag.name}
          </Badge>
        ))}
      </div>
    </>
  );
}
