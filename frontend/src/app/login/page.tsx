'use client'

import { useState } from 'react'
import Link from 'next/link'
import axios from 'axios'
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Feather } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"

// Define validation schema with zod
const loginSchema = z.object({
  email: z.string().email({ message: "Valid email is required" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
})

export default function Login() {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { toast } = useToast() 
  const router = useRouter()

  // Integrating react-hook-form with zod for form validation
  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  async function onSubmit(values: any, event: any) {
    event.preventDefault()
    setIsLoading(true)

    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`
    try {
      const response = await axios.post(url, values)

      if (response.status === 200) {
        toast({
          title: "Login Successful",
          description: "You have successfully logged in!",
          variant: "default",
        })
        router.push('/dashboard')
      }
    } catch (error: any) {
      if (error.response?.status === 401) {
        toast({
          title: "Unauthorized",
          description: "Invalid email or password. Please try again.",
          variant: "destructive",
        })
      } else {
        toast({
          title: "Unexpected Error",
          description: "An unexpected error occurred. Please try again later.",
          variant: "destructive",
        })
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto my-10 flex w-screen flex-col items-center justify-center">
      <Card className="w-[350px]">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center mb-4">
            <Feather className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="text-2xl text-center">Login to your account</CardTitle>
          <CardDescription className="text-center">
            Enter your email and password below to log in
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          {/* Shadcn UI Form integration */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              {/* Email Field */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="mt-3">
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="m@example.com" autoComplete="email" disabled={isLoading} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Password Field */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="mt-3">
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="••••••••" autoComplete="password" disabled={isLoading} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-end text-sm mt-2">
                <Link href="/forgot-password" className="underline hover:text-primary">
                  Forgot Password?
                </Link>
              </div>
              {/* Submit Button */}
              <Button className="w-full mt-6" type="submit" disabled={isLoading}>
                {isLoading ? 'Loading...' : 'Login'}
              </Button>
            </form>
          </Form>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <Button variant="outline">
              {/* <Icons.gitHub className="mr-2 h-4 w-4" /> */}
              GitHub
            </Button>
            <Button variant="outline">
              {/* <Icons.google className="mr-2 h-4 w-4" /> */}
              Google
            </Button>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col">
          <div className="text-sm text-muted-foreground text-center mt-2">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="underline hover:text-primary">
              Sign up here
            </Link>.
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
