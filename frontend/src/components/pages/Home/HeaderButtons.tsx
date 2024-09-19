"use client";

import axios from "axios";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { User, Rocket, LogOut, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuthStore } from "@/providers/AuthStoreProvider";
import { useToast } from "@/hooks/UseToast";

const HeaderButtons = () => {
  const [isHydrated, setIsHydrated] = useState(false);
  const { isLoggedIn, accessToken, logout } = useAuthStore((state) => state);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    setIsHydrated(true);
  }, []);

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

  if (!isHydrated)
    return (
      <>
        <Skeleton className="h-10 w-24 mr-2" />
        <Skeleton className="h-10 w-24 mr-2" />
        <Skeleton className="h-10 w-10 ml-4" />
      </>
    );

  return (
    <>
      {!isLoggedIn ? (
        <>
          <Button variant="outline" asChild>
            <Link href="/login">
              <LogIn className="mr-2 h-4 w-4" />
              Sign In
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/signup">
              <Rocket className="mr-2 h-4 w-4" />
              Get Started
            </Link>
          </Button>
        </>
      ) : (
        <>
          <Button
            variant="outline"
            onClick={handleLogout}
            disabled={isLoggingOut}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
          <Button variant="outline" asChild>
            <Link href="/dashboard">
              <User className="mr-2 h-4 w-4" />
              Dashboard
            </Link>
          </Button>
        </>
      )}
    </>
  );
};

export default HeaderButtons;
