import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"

interface Follower {
  id: number
  name: string
  joinDate: string
}

const fetchFollowers = () => new Promise<Follower[]>(resolve => setTimeout(() => resolve([
  { id: 1, name: "David", joinDate: "2023-05-01" },
  { id: 2, name: "Eva", joinDate: "2023-05-15" },
  { id: 3, name: "Frank", joinDate: "2023-06-01" },
]), 800))

export function FollowersList() {
  const [followers, setFollowers] = useState<Follower[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchFollowers()
      .then(data => {
        setFollowers(data)
        setLoading(false)
      })
      .catch(err => {
        setError("Failed to load followers")
        setLoading(false)
      })
  }, [])

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
            {followers.map((follower) => (
              <div key={follower.id} className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage src={`/placeholder.svg?height=40&width=40`} alt={follower.name} />
                  <AvatarFallback>{follower.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium leading-none">{follower.name}</p>
                  <p className="text-sm text-muted-foreground">Joined on {new Date(follower.joinDate).toLocaleDateString()}</p>
                </div>
                <Button size="sm" variant="outline" className="ml-auto">
                  View Profile
                </Button>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}