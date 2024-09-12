'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import ArticleForm from '@/components/write/ArticleForm'

export default function WritePage() {
  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>Write a New Article</CardTitle>
        </CardHeader>
        <CardContent>
          <ArticleForm />
        </CardContent>
      </Card>
    </div>
  )
}
