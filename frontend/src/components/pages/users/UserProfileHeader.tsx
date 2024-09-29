"use client";

import { useState, useEffect, useCallback } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { CalendarDays, Users } from "lucide-react";
import { useToast } from "@/hooks/UseToast";
import { Skeleton } from "@/components/ui/skeleton";
import { User } from "@/lib/definitions";

interface UserProfileHeaderProps {
  isLoading: boolean;
  userProfile: User | null;
  error: string | null;
}

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

export function UserProfileHeader({
  isLoading,
  userProfile,
  error,
}: UserProfileHeaderProps) {
  const { toast } = useToast();

  // const handleFollowToggle = useCallback(async () => {
  //   if (!userProfile) return;
  //   try {
  //     await new Promise((resolve) => setTimeout(resolve, 500));
  //     setUserProfile((prev) =>
  //       prev
  //         ? {
  //             ...prev,
  //             isFollowing: !prev.isFollowing,
  //             followersCount: prev.isFollowing
  //               ? prev.followersCount - 1
  //               : prev.followersCount + 1,
  //           }
  //         : null
  //     );
  //     toast({
  //       title: userProfile.isFollowing ? "Unfollowed" : "Followed",
  //       description: `You have ${
  //         userProfile.isFollowing ? "unfollowed" : "followed"
  //       } ${userId}`,
  //       variant: "default",
  //     });
  //   } catch (error) {
  //     toast({
  //       title: "Error",
  //       description: `Failed to ${
  //         userProfile.isFollowing ? "unfollow" : "follow"
  //       } user. Please try again.`,
  //       variant: "destructive",
  //     });
  //   }
  // }, [userProfile, userId, toast]);

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
            <span>{userProfile.followerCount} followers</span>
          </div>
          <div className="flex items-center">
            <Users className="mr-2 h-4 w-4" />
            <span>{userProfile.followingCount} following</span>
          </div>
          <div className="flex items-center">
            <CalendarDays className="mr-2 h-4 w-4" />
            <span>Joined {userProfile.createdAt?.toLocaleDateString()}</span>
          </div>
        </div>
      </div>
      <Button
      // onClick={handleFollowToggle}
      >
        {/* {userProfile.isFollowing ? "Unfollow" : "Follow"} */}
        Follow
      </Button>
    </div>
  );
}
