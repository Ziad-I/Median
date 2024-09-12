"use client";

// External Libraries
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import axios from "axios";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm as useHookForm } from "react-hook-form";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { nightOwl as theme } from "react-syntax-highlighter/dist/esm/styles/prism";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";
import "katex/dist/katex.min.css";

// UI Components
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

// Hooks
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  summary: z.string().min(1, "Summary is required"),
  content: z.string().min(1, "Content is required"),
  image: z.string().optional(),
  tags: z.array(z.string()).optional(),
});

export default function ArticleForm() {
  const [image, setImage] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [currentTag, setCurrentTag] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const form = useHookForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      summary: "",
      content: "",
      image: "",
      tags: [],
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

    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/articles/write`;
    try {
      const response = await axios.post(
        url,
        {
          title: data.title,
          content: data.content,
          tags: tags,
        },
        {
          headers: {
            Authorization: `Bearer YOUR_TOKEN_HERE`, // Replace with token handling logic
          },
        }
      );

      if (response.status === 200) {
        toast({
          title: "Article Created",
          description: "Your article has been successfully published!",
          variant: "default",
        });
        router.push("/dashboard");
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
          description: "You are not authorized. Please login again.",
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
            <Image src={image} alt="Cover" className="mt-2 max-w-xs rounded" />
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
                <ReactMarkdown
                  className="markdown"
                  remarkPlugins={[remarkGfm, remarkMath]}
                  rehypePlugins={[rehypeRaw, rehypeKatex]}
                  components={{
                    code({ node, inline, className, children, ...props }) {
                      const match = /language-(\w+)/.exec(className || "");
                      return !inline && match ? (
                        <SyntaxHighlighter
                          style={theme}
                          language={match[1]}
                          PreTag="div"
                          {...props}
                        >
                          {String(children).replace(/\n$/, "")}
                        </SyntaxHighlighter>
                      ) : (
                        <code className={className} {...props}>
                          {children}
                        </code>
                      );
                    },
                  }}
                >
                  {form.watch("content")}
                </ReactMarkdown>
              </div>
            </TabsContent>
          </Tabs>
          <FormMessage>{form.formState.errors.content?.message}</FormMessage>
        </FormItem>

        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Publishing..." : "Publish Article"}
        </Button>
      </form>
    </Form>
  );
}
