"use client";

import axios from "axios";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Feather, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import ThemeToggle from "./ThemeToggle";
import { useAuthStore } from "@/providers/AuthStoreProvider";
import { useToast } from "@/hooks/UseToast";

const Header = () => {
  const { isLoggedIn, accessToken, logout } = useAuthStore((state) => state);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const handleLogout = async () => {
    setIsLoggingOut(true);
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/logout`;

    try {
      const response = await axios.post(
        url,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (response.status === 200) {
        logout();
        router.push("/login");
        toast({
          title: "Logged out",
          description: "You have successfully logged out.",
        });
      }
    } catch (error) {
      toast({
        title: "Logout failed",
        description: "Unable to log out. Please try again.",
        variant: "destructive",
      });
      console.error(error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <header className="px-4 lg:px-6 h-14 flex items-center border-b">
      <Link className="flex items-center justify-center" href="/">
        <Feather className="h-6 w-6 text-primary" />
        <span className="sr-only">Median</span>
      </Link>
      <nav className="ml-auto mr-5 flex gap-4 sm:gap-6">
        <Link
          className="text-sm font-medium hover:underline underline-offset-4"
          href="#"
        >
          Our Story
        </Link>
        <Link
          className="text-sm font-medium hover:underline underline-offset-4"
          href="#"
        >
          Membership
        </Link>
        <Link
          className="text-sm font-medium hover:underline underline-offset-4"
          href="/articles/write"
        >
          Write
        </Link>
        {!isLoggedIn && (
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="/login"
          >
            Sign In
          </Link>
        )}
      </nav>
      <ThemeToggle />
      {isLoggedIn ? (
        <div>
          <Button
            variant="ghost"
            className="ml-1"
            onClick={handleLogout}
            disabled={isLoggingOut}
          >
            <LogOut className="mr-2 h-4 w-4" />
            {isLoggingOut ? "Logging out..." : "Logout"}
          </Button>
          <Button className="ml-4" variant="outline" asChild>
            <Link href="/dashboard">
              <User className="mr-2 h-4 w-4" />
              Dashboard
            </Link>
          </Button>
        </div>
      ) : (
        <Button className="ml-2" variant="outline" asChild>
          <Link href="/signup">Get Started</Link>
        </Button>
      )}
    </header>
  );
};

export default Header;
