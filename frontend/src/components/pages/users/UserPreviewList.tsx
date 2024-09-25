"use client";

import { useState, useEffect, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { useParams } from "next/navigation";

type UserPreview = {
  id: string;
  username: string;
  name: string;
  avatar: string;
};

// Simulated API call
const fetchUsers = async (
  type: "followers" | "following",
  userId: string
): Promise<UserPreview[]> => {
  await new Promise((resolve) => setTimeout(resolve, 800));
  return [
    {
      id: "1",
      username: "alice",
      name: "Alice Johnson",
      avatar: "/placeholder.svg?height=50&width=50",
    },
    {
      id: "2",
      username: "bob",
      name: "Bob Smith",
      avatar: "/placeholder.svg?height=50&width=50",
    },
    {
      id: "3",
      username: "charlie",
      name: "Charlie Brown",
      avatar: "/placeholder.svg?height=50&width=50",
    },
  ];
};

function UserPreviewListSkeleton() {
  return (
    <div className="space-y-4">
      {[1, 2, 3].map((i) => (
        <Skeleton key={i} className="h-[80px] w-full" />
      ))}
    </div>
  );
}

export function UserPreviewList({ type }: { type: "followers" | "following" }) {
  const params = useParams();
  const userId = params.userId as string;
  const [users, setUsers] = useState<UserPreview[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Memoize the user fetching function
  const loadUsers = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await fetchUsers(type, userId);
      setUsers(data);
    } catch (err) {
      setError(`Failed to fetch ${type}. Please try again.`);
    } finally {
      setIsLoading(false);
    }
  }, [type, userId]);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  if (isLoading) {
    return <UserPreviewListSkeleton />;
  }

  if (error) {
    return <div className="text-destructive">{error}</div>;
  }

  if (users.length === 0) {
    return (
      <div>
        {type === "followers"
          ? "No followers yet."
          : "Not following anyone yet."}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {users.map((user) => (
        <Card key={user.id} className="mb-4">
          <CardContent className="flex items-center space-x-4 py-4">
            <Avatar>
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback>{user.name[0]}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold">{user.name}</h3>
              <p className="text-sm text-muted-foreground">@{user.username}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
