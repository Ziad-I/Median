"use client";

import { useState, useEffect, useCallback } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { CalendarDays, Users } from "lucide-react";
import { useToast } from "@/hooks/UseToast";
import { Skeleton } from "@/components/ui/skeleton";
import { useParams } from "next/navigation";

type UserProfile = {
  id: string;
  username: string;
  name: string;
  bio: string;
  avatar: string;
  followersCount: number;
  followingCount: number;
  joinedAt: string;
  isFollowing: boolean;
};

// Simulated API call
const fetchUserProfile = async (userId: string): Promise<UserProfile> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return {
    id: userId,
    username: "JohnDoe",
    name: "John Doe",
    bio: "Passionate writer and tech enthusiast. Sharing thoughts on AI, web development, and the future of technology.",
    avatar: "/placeholder.svg?height=100&width=100",
    followersCount: 1000,
    followingCount: 500,
    joinedAt: "2022-01-01T00:00:00Z",
    isFollowing: false,
  };
};

function UserProfileHeaderSkeleton() {
  return (
    <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
      <Skeleton className="h-24 w-24 rounded-full" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-16 w-full" />
        <div className="flex justify-center md:justify-start items-center space-x-4 mt-4">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-32" />
        </div>
      </div>
      <Skeleton className="h-10 w-24" />
    </div>
  );
}

export function UserProfileHeader() {
  const params = useParams();
  const userId = params.userId as string;

  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchProfile = useCallback(async () => {
    setIsLoading(true);
    try {
      const profile = await fetchUserProfile(userId);
      setUserProfile(profile);
    } catch (error) {
      setError("Failed to fetch user profile. Please try again.");
      toast({
        title: "Error",
        description: "Failed to fetch user profile. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [userId, toast]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const handleFollowToggle = useCallback(async () => {
    if (!userProfile) return;

    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      setUserProfile((prev) =>
        prev
          ? {
              ...prev,
              isFollowing: !prev.isFollowing,
              followersCount: prev.isFollowing
                ? prev.followersCount - 1
                : prev.followersCount + 1,
            }
          : null
      );
      toast({
        title: userProfile.isFollowing ? "Unfollowed" : "Followed",
        description: `You have ${
          userProfile.isFollowing ? "unfollowed" : "followed"
        } ${userId}`,
        variant: "default",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to ${
          userProfile.isFollowing ? "unfollow" : "follow"
        } user. Please try again.`,
        variant: "destructive",
      });
    }
  }, [userProfile, userId, toast]);

  if (isLoading) {
    return <UserProfileHeaderSkeleton />;
  }

  if (error || !userProfile) {
    return (
      <div className="text-destructive-foreground">
        {error || "Failed to load user profile"}
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
      <Avatar className="h-24 w-24">
        <AvatarImage src={userProfile.avatar} alt={userProfile.name} />
        <AvatarFallback>{userProfile.name[0]}</AvatarFallback>
      </Avatar>
      <div className="flex-1 text-center md:text-left">
        <h1 className="text-2xl font-bold">{userProfile.name}</h1>
        <p className="text-muted-foreground">@{userProfile.username}</p>
        <p className="mt-2">{userProfile.bio}</p>
        <div className="flex justify-center md:justify-start items-center space-x-4 mt-4">
          <div className="flex items-center">
            <Users className="mr-2 h-4 w-4" />
            <span>{userProfile.followersCount} followers</span>
          </div>
          <div className="flex items-center">
            <Users className="mr-2 h-4 w-4" />
            <span>{userProfile.followingCount} following</span>
          </div>
          <div className="flex items-center">
            <CalendarDays className="mr-2 h-4 w-4" />
            <span>
              Joined {new Date(userProfile.joinedAt).toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>
      <Button onClick={handleFollowToggle}>
        {userProfile.isFollowing ? "Unfollow" : "Follow"}
      </Button>
    </div>
  );
}
