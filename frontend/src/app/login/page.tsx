"use client";

import Link from "next/link";
import { Feather } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import LogInForm from "@/components/pages/login/LogInForm";
import SocialSignIn from "@/components/pages/login/SocialLogIn";

export default function LoginPage() {
  return (
    <div className="container mx-auto my-10 flex w-screen flex-col items-center justify-center">
      <Card className="w-[350px]">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center mb-4">
            <Feather className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="text-2xl text-center">
            Login to your account
          </CardTitle>
          <CardDescription className="text-center">
            Enter your email and password below to log in
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <LogInForm />
          <SocialSignIn />
        </CardContent>
        <CardFooter className="flex flex-col">
          <div className="text-sm text-muted-foreground text-center mt-2">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="underline hover:text-primary">
              Sign up here
            </Link>
            .
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
