import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function AllArticlesSkeleton() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">All Articles</h1>
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <Skeleton className="h-10 w-full md:w-1/2" />
        <Skeleton className="h-10 w-40" />
        <Skeleton className="h-10 w-24" />
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, index) => (
          <Card key={index} className="w-full">
            <CardHeader>
              <Skeleton className="h-6 w-3/4" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-5/6 mb-2" />
              <Skeleton className="h-4 w-4/6" />
              <div className="flex gap-2 mt-4">
                <Skeleton className="h-6 w-16" />
                <Skeleton className="h-6 w-16" />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-24" />
            </CardFooter>
          </Card>
        ))}
      </div>
      <div className="mt-8 flex justify-center">
        <Skeleton className="h-10 w-96" />
      </div>
    </div>
  );
}
