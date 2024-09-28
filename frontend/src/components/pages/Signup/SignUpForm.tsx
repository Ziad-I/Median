"use client";

import { useState } from "react";
import axios from "axios";
import { z } from "zod"; // For validation schema
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/UseToast";
import { useAuthStore } from "@/providers/AuthStoreProvider";

// Define validation schema with zod
const signUpSchema = z.object({
  username: z
    .string()
    .min(1, { message: "Username is required" })
    .regex(/^[A-Za-z0-9_-]+$/, {
      message:
        "Username can only contain letters, numbers, underscores (_), and hyphens (-)",
    }),
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Valid email is required" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

export const SignUpForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const login = useAuthStore((state) => state.login);
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: "",
      name: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: any, event: any) {
    event.preventDefault();
    setIsLoading(true);
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/register`;
    console.log(values);
    try {
      const response = await axios.post(url, values);

      if (response.status === 201) {
        toast({
          title: "Account Created",
          description: "Your account has been successfully created!",
          variant: "default",
        });
        login(response.data.accessToken);
        router.push("/dashboard");
      }
    } catch (error: any) {
      if (error.response?.status === 400) {
        toast({
          title: "Invalid Data",
          description: "Please check your registration details.",
          variant: "destructive",
        });
      } else if (error.response?.status === 409) {
        toast({
          title: "Conflict",
          description:
            "Email or username is already registered. Try a different one.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Unexpected Error",
          description: "An unexpected error occurred. Please try again later.",
          variant: "destructive",
        });
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem className="mt-3">
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="johndoe" disabled={isLoading} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="mt-3">
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" disabled={isLoading} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="mt-3">
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="m@example.com"
                  autoComplete="email"
                  disabled={isLoading}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="mt-3">
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="••••••••"
                  autoComplete="password"
                  disabled={isLoading}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="w-full mt-6" type="submit" disabled={isLoading}>
          {isLoading ? "Loading..." : "Sign Up"}
        </Button>
      </form>
    </Form>
  );
};
