import { Card, CardHeader, CardContent, CardFooter } from "../../ui/card";
import { Skeleton } from "../../ui/skeleton";

export default function ArticleSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <Skeleton className="h-12 w-3/4 mb-4" />
        <div className="flex items-center mb-4">
          <Skeleton className="h-10 w-10 rounded-full mr-4" />
          <div>
            <Skeleton className="h-4 w-32 mb-2" />
            <Skeleton className="h-3 w-24" />
          </div>
        </div>
        <Skeleton className="w-full h-64 rounded-lg mb-6" />
        <div className="space-y-4 mb-8">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
        <div className="mb-8">
          <Skeleton className="h-6 w-16 rounded-full inline-block mr-2" />
          <Skeleton className="h-6 w-16 rounded-full inline-block mr-2" />
          <Skeleton className="h-6 w-16 rounded-full inline-block" />
        </div>
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-32" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2].map((_, index) => (
                <Card key={index}>
                  <CardContent className="pt-4">
                    <div className="flex items-start space-x-4">
                      <Skeleton className="h-8 w-8 rounded-full" />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <Skeleton className="h-4 w-24" />
                          <Skeleton className="h-3 w-16" />
                        </div>
                        <Skeleton className="h-4 w-full mt-2" />
                        <Skeleton className="h-4 w-2/3 mt-1" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Skeleton className="h-20 w-full" />
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
