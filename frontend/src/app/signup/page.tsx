'use client'

import { Feather } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { SignUpForm } from '@/components/Signup/SignUpForm'
import { SocialSignUp } from '@/components/Signup/SoicialSignUp'
import { Agreements } from '@/components/Signup/Agreements'

export default function SignUp() {
  return (
    <div className="container mx-auto my-10 flex w-screen flex-col items-center justify-center">
      <Card className="w-[350px]">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center mb-4">
            <Feather className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="text-2xl text-center">Create an account</CardTitle>
          <CardDescription className="text-center">
            Enter your details below to create your account
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <SignUpForm />
          <SocialSignUp />
        </CardContent>
        <CardFooter className="flex flex-col">
          <Agreements />
        </CardFooter>
      </Card>
    </div>
  )
}
