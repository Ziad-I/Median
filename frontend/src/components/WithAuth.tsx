"use client";

import { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/providers/AuthStoreProvider";

const withAuth = (WrappedComponent: any) => {
  return function WithAuth(props: any) {
    const [isHydrated, setIsHydrated] = useState(false);
    const { isLoggedIn, userId, accessToken } = useAuthStore((state) => state);
    const isAuthenticated = isLoggedIn && accessToken;
    console.log(isLoggedIn, userId, accessToken);
    // const isAuthenticated = true;
    const router = useRouter();

    useEffect(() => {
      setIsHydrated(true);
    }, []);

    useEffect(() => {
      if (!isAuthenticated) {
        // redirect("/login");
        router.push("/login");
      }
    }, [router, isAuthenticated]);

    if (!isAuthenticated || !isHydrated) {
      return null;
    }
    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
