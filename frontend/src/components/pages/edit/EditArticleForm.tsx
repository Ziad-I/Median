"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import axios from "axios";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import MarkdownRenderer from "@/components/MarkdownRenderer";

import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

import { useToast } from "@/hooks/UseToast";
import { useAuthStore } from "@/providers/AuthStoreProvider";
import { Article } from "@/lib/definitions";

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  summary: z.string().min(1, "Summary is required"),
  content: z.string().min(1, "Content is required"),
  image: z.string().optional(),
  tags: z.array(z.string()).optional(),
});

interface EditArticleFormProps {
  article: Article;
}

export function EditArticleForm({ article }: EditArticleFormProps) {
  const tagNames: string[] = article.tags.map((tag) => tag.name);
  const { accessToken } = useAuthStore((state) => state);
  const [image, setImage] = useState(article.image || "");
  const [tags, setTags] = useState<string[]>(tagNames);
  const [currentTag, setCurrentTag] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: article.title,
      summary: article.summary,
      content: article.content,
      image: article.image,
      tags: article.tags,
    },
  });

  const handleAddTag = () => {
    if (currentTag && !tags.includes(currentTag)) {
      setTags([...tags, currentTag]);
      setCurrentTag("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
        form.setValue("image", reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data: any, event: any) => {
    event.preventDefault();
    setIsLoading(true);

    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/articles/${article._id}`;
    try {
      const response = await axios.put(
        url,
        {
          title: data.title,
          summary: data.summary,
          content: data.content,
          tags: tags,
          image: data.image,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (response.status === 200) {
        toast({
          title: "Article Updated",
          description: "Your article has been successfully updated!",
          variant: "default",
        });
        router.push(`/articles/${article._id}`);
      }
    } catch (error: any) {
      if (error.response?.status === 400) {
        toast({
          title: "Invalid Data",
          description: "Please check your input and try again.",
          variant: "destructive",
        });
      } else if (error.response?.status === 401) {
        toast({
          title: "Unauthorized",
          description: "You are not authorized to edit this article.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Unexpected Error",
          description: "Something went wrong. Please try again later.",
          variant: "destructive",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormItem className="mt-3">
          <FormLabel htmlFor="title">Title</FormLabel>
          <FormControl>
            <Input
              id="title"
              {...form.register("title")}
              placeholder="Enter article title"
              disabled={isLoading}
            />
          </FormControl>
          <FormMessage>{form.formState.errors.title?.message}</FormMessage>
        </FormItem>

        <FormItem className="mt-3">
          <FormLabel htmlFor="summary">Summary</FormLabel>
          <FormControl>
            <Textarea
              id="summary"
              {...form.register("summary")}
              placeholder="Enter a brief summary of your article"
              disabled={isLoading}
            />
          </FormControl>
          <FormMessage>{form.formState.errors.summary?.message}</FormMessage>
        </FormItem>

        <FormItem className="mt-3">
          <FormLabel htmlFor="image">Cover Image</FormLabel>
          <FormControl>
            <Input
              id="image"
              type="file"
              onChange={handleImageUpload}
              accept="image/*"
              disabled={isLoading}
            />
          </FormControl>
          {image && (
            <Image
              src={image}
              alt="Cover"
              width={300}
              height={200}
              className="mt-2 rounded"
            />
          )}
        </FormItem>

        <FormItem className="mt-3">
          <FormLabel htmlFor="tags">Tags</FormLabel>
          <div className="flex space-x-2">
            <FormControl>
              <Input
                id="tags"
                value={currentTag}
                onChange={(e) => setCurrentTag(e.target.value)}
                placeholder="Enter a tag"
                disabled={isLoading}
              />
            </FormControl>
            <Button type="button" onClick={handleAddTag} disabled={isLoading}>
              Add Tag
            </Button>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
                <Button
                  variant="ghost"
                  size="sm"
                  className="ml-2 h-4 w-4 p-0"
                  onClick={() => handleRemoveTag(tag)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            ))}
          </div>
        </FormItem>

        <FormItem className="mt-3">
          <FormLabel htmlFor="content">Content</FormLabel>
          <Tabs defaultValue="write" className="w-full">
            <TabsList>
              <TabsTrigger value="write">Write</TabsTrigger>
              <TabsTrigger value="preview">Preview</TabsTrigger>
            </TabsList>
            <TabsContent value="write">
              <FormControl>
                <Textarea
                  id="content"
                  {...form.register("content")}
                  placeholder="Write your article content here (Markdown supported)"
                  className="min-h-[300px]"
                  disabled={isLoading}
                />
              </FormControl>
            </TabsContent>
            <TabsContent value="preview">
              <div className="prose border border-border rounded-md p-4 max-h-[500px] min-h-[300px] overflow-auto">
                <MarkdownRenderer content={form.watch("content")} />
              </div>
            </TabsContent>
          </Tabs>
          <FormMessage>{form.formState.errors.content?.message}</FormMessage>
        </FormItem>

        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Updating..." : "Update Article"}
        </Button>
      </form>
    </Form>
  );
}
