import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"

interface Following {
  id: number
  name: string
  followDate: string
}

const fetchFollowing = () => new Promise<Following[]>(resolve => setTimeout(() => resolve([
  { id: 1, name: "Grace", followDate: "2023-04-01" },
  { id: 2, name: "Henry", followDate: "2023-04-15" },
  { id: 3, name: "Ivy", followDate: "2023-05-01" },
]), 1200))

export function FollowingList() {
  const [following, setFollowing] = useState<Following[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchFollowing()
      .then(data => {
        setFollowing(data)
        setLoading(false)
      })
      .catch(err => {
        setError("Failed to load following")
        setLoading(false)
      })
  }, [])

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
              <div key={i} className="flex items-center space-x-4">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[250px]" />
                  <Skeleton className="h-4 w-[200px]" />
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <p className="text-sm text-red-500">{error}</p>
        ) : (
          <div className="space-y-4">
            {following.map((follow) => (
              <div key={follow.id} className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage src={`/placeholder.svg?height=40&width=40`} alt={follow.name} />
                  <AvatarFallback>{follow.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium leading-none">{follow.name}</p>
                  <p className="text-sm text-muted-foreground">Followed since {new Date(follow.followDate).toLocaleDateString()}</p>
                </div>
                <Button size="sm" variant="outline" className="ml-auto">
                  Unfollow
                </Button>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}