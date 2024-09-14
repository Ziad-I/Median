"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ArticleForm from "@/components/pages/write/ArticleForm";
import withAuth from "@/components/WithAuth";

function WritePage() {
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
  );
}

export default withAuth(WritePage);
