"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Eye, MessageCircle, TrendingUp, User as UserIcon } from "lucide-react";
import { Sidebar } from "@/components/pages/dashboard/Sidebar";
import { StatCard } from "@/components/pages/dashboard/StatCard";
import { ArticlesList } from "@/components/pages/dashboard/ArticlesList";
import { CommentsList } from "@/components/pages/dashboard/CommentsList";
import { UserSettings } from "@/components/pages/dashboard/UserSettings";
import { FollowersList } from "@/components/pages/dashboard/FollowersList";
import { FollowingList } from "@/components/pages/dashboard/FollowingList";
import { UserProfileCard } from "@/components/pages/dashboard/UserProfileCard";
import withAuth from "@/components/WithAuth";

function DashboardPage() {
  return (
    <div className="flex min-h-screen bg-background">
      {/* <Sidebar /> */}
      <div className="flex-1 p-6">
        <UserProfileCard />

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
          <StatCard
            title="Total Views"
            value="45,231"
            description="+20.1% from last month"
            icon={Eye}
          />
          <StatCard
            title="Followers"
            value="2,350"
            description="+180 new followers"
            icon={UserIcon}
          />
          <StatCard
            title="Total Articles"
            value="52"
            description="+3 published this week"
            icon={TrendingUp}
          />
          <StatCard
            title="Total Comments"
            value="1,429"
            description="+20 new this week"
            icon={MessageCircle}
          />
        </div>

        <Tabs defaultValue="articles" className="mt-6">
          <TabsList>
            <TabsTrigger value="articles">Recent Articles</TabsTrigger>
            <TabsTrigger value="comments">Recent Comments</TabsTrigger>
            <TabsTrigger value="settings">User Settings</TabsTrigger>
            <TabsTrigger value="followers">Followers</TabsTrigger>
            <TabsTrigger value="following">Following</TabsTrigger>
          </TabsList>
          <TabsContent value="articles">
            <ArticlesList />
          </TabsContent>
          <TabsContent value="comments">
            <CommentsList />
          </TabsContent>
          <TabsContent value="settings">
            <UserSettings />
          </TabsContent>
          <TabsContent value="followers">
            <FollowersList />
          </TabsContent>
          <TabsContent value="following">
            <FollowingList />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default withAuth(DashboardPage);
