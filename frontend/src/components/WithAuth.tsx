"use client";

import { useEffect } from "react";
import { redirect } from "next/navigation";

const withAuth = (WrappedComponent: any) => {
  return function WithAuth(props: any) {
    const isAuthenticated = true; //TODO: check jwt

    useEffect(() => {
      if (!isAuthenticated) {
        redirect("/login");
      }
    }, [isAuthenticated]);

    if (!isAuthenticated) {
      return null;
    }
    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
