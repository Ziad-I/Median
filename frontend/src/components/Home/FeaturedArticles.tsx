import { FC } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BookOpen, TrendingUp } from "lucide-react";
import Image from "next/image";

interface FeaturedArticleProps {
  index: number;
}

const FeaturedArticle = ({ index }: { index: number }) => (
  <Card>
    <CardHeader>
      <Image
        alt={`Featured article ${index}`}
        className="w-full h-48 object-cover rounded-t-lg"
        height="200"
        src={`/placeholder.svg?height=200&width=400`}
        style={{
          aspectRatio: "400/200",
          objectFit: "cover",
        }}
        width="400"
      />
    </CardHeader>
    <CardContent>
      <CardTitle className="text-xl mb-2">Exploring the Future of AI</CardTitle>
      <p className="text-muted-foreground">
        An in-depth look at the latest advancements in artificial intelligence
        and their potential impact on society.
      </p>
    </CardContent>
    <CardFooter className="flex justify-between items-center">
      <div className="flex items-center">
        <BookOpen className="h-4 w-4 mr-1 text-primary" />
        <span className="text-sm text-muted-foreground">5 min read</span>
      </div>
      <div className="flex items-center">
        <TrendingUp className="h-4 w-4 mr-1 text-primary" />
        <span className="text-sm text-muted-foreground">Trending</span>
      </div>
    </CardFooter>
  </Card>
);

const FeaturedArticles = () => (
  <section className="w-full py-12 md:py-24 lg:py-32 bg-secondary">
    <div className="container mx-auto px-4 md:px-6">
      <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
        Featured Articles
      </h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <FeaturedArticle key={i} index={i} />
        ))}
      </div>
    </div>
  </section>
);

export default FeaturedArticles;
