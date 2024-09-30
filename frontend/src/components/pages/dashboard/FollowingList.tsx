"use client";

import { useState, useEffect, useCallback } from "react";
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
import { useAuthStore } from "@/providers/AuthStoreProvider";
import { useToast } from "@/hooks/UseToast";
import axios from "axios";
import { User } from "@/lib/definitions";

const simulateFetchFollowing = () =>
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
      1200
    )
  );

function FollowingCardSkeleton() {
  return (
    <Card className="mb-4">
      <CardContent className="flex items-center space-x-4 py-4">
        <Skeleton className="h-10 w-10 rounded-full" />
        <div className="space-y-2 flex-1">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-3 w-32" />
        </div>
        <Skeleton className="h-9 w-24 mr-2" />
        <Skeleton className="h-9 w-24" />
      </CardContent>
    </Card>
  );
}

export function FollowingList() {
  const [following, setFollowing] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { userId, accessToken } = useAuthStore((state) => state);
  const { toast } = useToast();

  const fetchFollowings = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/followings/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`, // Attach the access token
          },
        }
      );
      setFollowing(response.data);
    } catch (error) {
      setError("Failed to load followings");
      toast({
        title: "Error",
        description: `Failed to fetch followings. Please try again.`,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [userId, accessToken]);

  useEffect(() => {
    simulateFetchFollowing()
      .then((data) => {
        setFollowing(data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to load followings");
        toast({
          title: "Error",
          description: `Failed to fetch followings. Please try again.`,
          variant: "destructive",
        });
        setLoading(false);
      });
    // fetchFollowings();
  }, [fetchFollowings]);

  const handleUnfollow = async (userId: string) => {
    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/unfollow/${userId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`, // Attach the access token
          },
        }
      );

      if (response.status === 200) {
        setFollowing((prev) => prev.filter((user) => user._id !== userId));
        toast({
          title: "Success",
          description: "User unfollowed successfully",
        });
      }
    } catch (error) {
      console.error("Error unfollowing user:", error);
      toast({
        title: "Error",
        description: "Failed to unfollow user",
        variant: "destructive",
      });
      setError("Failed to unfollow user");
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Following</CardTitle>
        <CardDescription>People you follow</CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <FollowingCardSkeleton key={i} />
            ))}
          </div>
        ) : error ? (
          <p className="text-sm text-destructive-foreground">{error}</p>
        ) : (
          <div className="space-y-4">
            {following.map((follow) => (
              <Card key={follow._id} className="mb-4">
                <CardContent className="flex items-center space-x-4 py-4">
                  <Avatar>
                    <AvatarImage src={follow.avatar} alt={follow.name} />
                    <AvatarFallback>{follow.name?.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="text-sm font-medium leading-none">
                      {follow.name}
                    </p>
                    <p className="text-sm text-muted-foreground flex items-center mt-1">
                      <CalendarIcon className="mr-1 h-3 w-3" />
                      Joined on {follow.createdAt?.toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <Link href={`/users/${follow.username}`}>
                      <Button size="sm" variant="outline">
                        View Profile
                      </Button>
                    </Link>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleUnfollow(follow._id as string)}
                    >
                      Unfollow
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
