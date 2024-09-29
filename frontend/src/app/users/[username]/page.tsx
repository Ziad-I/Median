"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserProfileHeader } from "@/components/pages/users/UserProfileHeader";
import { ArticleList } from "@/components/pages/users/ArticleList";
import { UserPreviewList } from "@/components/pages/users/UserPreviewList";
import { User } from "@/lib/definitions";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { toast } from "@/hooks/UseToast";

const fetchUserProfile = async (username: string): Promise<User> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return {
    _id: "userId",
    username: username,
    name: "John Doe",
    bio: "Passionate writer and tech enthusiast. Sharing thoughts on AI, web development, and the future of technology.",
    avatar: "/placeholder.svg?height=100&width=100",
    followerCount: 1000,
    followingCount: 500,
    createdAt: new Date(),
  };
};

export default function UserProfilePage() {
  const [userProfile, setUserProfile] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const params = useParams();
  const username = params.username as string;

  useEffect(() => {
    const loadUserProfile = async () => {
      setIsLoading(true);
      try {
        const profile = await fetchUserProfile(username);
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
    };

    loadUserProfile();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardContent className="pt-6">
          <UserProfileHeader
            userProfile={userProfile}
            error={error}
            isLoading={isLoading}
          />
          <Tabs defaultValue="articles" className="mt-6">
            <TabsList>
              <TabsTrigger value="articles">Articles</TabsTrigger>
              <TabsTrigger value="followers">Followers</TabsTrigger>
              <TabsTrigger value="following">Following</TabsTrigger>
            </TabsList>
            <TabsContent value="articles">
              <ArticleList
                userId={userProfile?._id}
                userLoading={isLoading}
                userError={error}
              />
            </TabsContent>
            <TabsContent value="followers">
              <UserPreviewList
                type="followers"
                userId={userProfile?._id}
                userLoading={isLoading}
                userError={error}
              />
            </TabsContent>
            <TabsContent value="following">
              <UserPreviewList
                type="following"
                userId={userProfile?._id}
                userLoading={isLoading}
                userError={error}
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
