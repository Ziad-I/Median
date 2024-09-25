"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserProfileHeader } from "@/components/pages/users/UserProfileHeader";
import { ArticleList } from "@/components/pages/users/ArticleList";
import { UserPreviewList } from "@/components/pages/users/UserPreviewList";

export default function UserProfilePage() {
  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardContent className="pt-6">
          <UserProfileHeader />

          <Tabs defaultValue="articles" className="mt-6">
            <TabsList>
              <TabsTrigger value="articles">Articles</TabsTrigger>
              <TabsTrigger value="followers">Followers</TabsTrigger>
              <TabsTrigger value="following">Following</TabsTrigger>
            </TabsList>
            <TabsContent value="articles">
              <ArticleList />
            </TabsContent>
            <TabsContent value="followers">
              <UserPreviewList type="followers" />
            </TabsContent>
            <TabsContent value="following">
              <UserPreviewList type="following" />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
