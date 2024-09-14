"use client";

import { useEffect } from "react";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/providers/AuthStoreProvider";

const withAuth = (WrappedComponent: any) => {
  return function WithAuth(props: any) {
    const { isLoggedIn, userId, accessToken } = useAuthStore((state) => state);
    const isAuthenticated = isLoggedIn && accessToken;
    console.log(isLoggedIn, userId, accessToken);
    // const isAuthenticated = true;
    const router = useRouter();

    useEffect(() => {
      if (!isAuthenticated) {
        // redirect("/login");
        router.push("/login");
      }
    }, [router, isAuthenticated]);

    if (!isAuthenticated) {
      return null;
    }
    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
