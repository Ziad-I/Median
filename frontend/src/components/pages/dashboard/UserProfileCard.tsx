"use client";

import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Eye,
  MessageCircle,
  TrendingUp,
  User as UserIcon,
  Calendar,
} from "lucide-react";
import { Sidebar } from "@/components/pages/dashboard/Sidebar";
import { StatCard } from "@/components/pages/dashboard/StatCard";
import { ArticlesList } from "@/components/pages/dashboard/ArticlesList";
import { CommentsList } from "@/components/pages/dashboard/CommentsList";
import { UserSettings } from "@/components/pages/dashboard/UserSettings";
import { FollowersList } from "@/components/pages/dashboard/FollowersList";
import { FollowingList } from "@/components/pages/dashboard/FollowingList";
import withAuth from "@/components/WithAuth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User } from "@/lib/definitions";
import { Skeleton } from "@/components/ui/skeleton";

// Simulated user data fetch
const fetchUserData = async () => {
  // In a real application, this would be an API call
  await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate network delay
  return {
    name: "John Doe",
    avatar: "/placeholder.svg?height=100&width=100",
    bio: "Passionate writer and tech enthusiast. Sharing thoughts on AI, web development, and the future of technology.",
    createdAt: new Date("2022-01-01"),
  } as User;
};

export function UserProfileCard() {
  const [userData, setUserData] = useState<User>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const data = await fetchUserData();
        setUserData(data);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadUserData();
  }, []);

  if (isLoading) return <UserProfileSkeleton />;

  return (
    <>
      {userData && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>User Profile</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center space-x-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src={userData.avatar} alt={userData.name} />
              <AvatarFallback>{userData.name[0]}</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-2xl font-bold">{userData.name}</h2>
              <p className="test-muted-foreground">{userData.bio}</p>
              <p className="text-sm test-muted-foreground mt-2">
                <Calendar className="inline-block mr-1 h-4 w-4" />
                Registered on {userData.createdAt.toLocaleDateString()}
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
}

function UserProfileSkeleton() {
  return (
    <Card className="mb-6">
      <CardHeader>
        <Skeleton className="h-8 w-40" />
      </CardHeader>
      <CardContent className="flex items-center space-x-4">
        <Skeleton className="h-20 w-20 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-64" />
          <Skeleton className="h-4 w-32" />
        </div>
      </CardContent>
    </Card>
  );
}
