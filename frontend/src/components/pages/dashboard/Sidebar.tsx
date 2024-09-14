import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Edit, TrendingUp, Eye, Settings } from "lucide-react"

export function Sidebar() {
  return (
    <aside className="hidden w-64 border-r bg-muted/40 lg:block">
      <div className="flex h-full flex-col">
        <div className="flex h-14 items-center border-b px-4">
          <Link className="flex items-center gap-2 font-semibold" href="#">
            <Edit className="h-6 w-6" />
            <span>Median</span>
          </Link>
        </div>
        <nav className="flex-1 overflow-auto py-2">
          <div className="flex flex-col gap-1 px-2">
            <Button variant="ghost" className="justify-start" asChild>
              <Link href="/dashboard">
                <TrendingUp className="mr-2 h-4 w-4" />
                Dashboard
              </Link>
            </Button>
            <Button variant="ghost" className="justify-start" asChild>
              <Link href="/dashboard/articles">
                <Edit className="mr-2 h-4 w-4" />
                My Articles
              </Link>
            </Button>
            <Button variant="ghost" className="justify-start" asChild>
              <Link href="/dashboard/stats">
                <Eye className="mr-2 h-4 w-4" />
                Stats
              </Link>
            </Button>
            <Button variant="ghost" className="justify-start" asChild>
              <Link href="/dashboard/settings">
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </Link>
            </Button>
          </div>
        </nav>
      </div>
    </aside>
  )
}