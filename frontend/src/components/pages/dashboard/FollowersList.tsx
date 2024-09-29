"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { CalendarIcon } from "lucide-react";
import { useToast } from "@/hooks/UseToast";

interface User {
  _id: string;
  name: string;
  username: string;
  avatar: string;
  createdAt: Date;
}

const fetchFollowers = () =>
  new Promise<User[]>((resolve) =>
    setTimeout(
      () =>
        resolve([
          {
            _id: "1",
            username: "alice",
            name: "Alice Johnson",
            avatar: "/placeholder.svg?height=50&width=50",
            createdAt: new Date(),
          },
          {
            _id: "2",
            username: "bob",
            name: "Bob Smith",
            avatar: "/placeholder.svg?height=50&width=50",
            createdAt: new Date(),
          },
          {
            _id: "3",
            username: "charlie",
            name: "Charlie Brown",
            avatar: "/placeholder.svg?height=50&width=50",
            createdAt: new Date(),
          },
        ]),
      800
    )
  );

function FollowerCardSkeleton() {
  return (
    <Card className="mb-4">
      <CardContent className="flex items-center space-x-4 py-4">
        <Skeleton className="h-10 w-10 rounded-full" />
        <div className="space-y-2 flex-1">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-3 w-32" />
        </div>
        <Skeleton className="h-9 w-24" />
      </CardContent>
    </Card>
  );
}

export function FollowersList() {
  const [followers, setFollowers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchFollowers()
      .then((data) => {
        setFollowers(data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to load followers");
        toast({
          title: "Error",
          description: `Failed to fetch followings. Please try again.`,
          variant: "destructive",
        });
        setLoading(false);
      });
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Followers</CardTitle>
        <CardDescription>People who follow you</CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <FollowerCardSkeleton key={i} />
            ))}
          </div>
        ) : error ? (
          <p className="text-sm text-destructive-foreground">{error}</p>
        ) : (
          <div className="space-y-4">
            {followers.map((follower) => (
              <Card key={follower._id} className="mb-4">
                <CardContent className="flex items-center space-x-4 py-4">
                  <Avatar>
                    <AvatarImage src={follower.avatar} alt={follower.name} />
                    <AvatarFallback>{follower.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="text-sm font-medium leading-none">
                      {follower.name}
                    </p>
                    <p className="text-sm text-muted-foreground flex items-center mt-1">
                      <CalendarIcon className="mr-1 h-3 w-3" />
                      Joined on {follower.createdAt.toLocaleDateString()}
                    </p>
                  </div>
                  <Link href={`/users/${follower.username}`}>
                    <Button size="sm" variant="outline">
                      View Profile
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
