"use client";

import Link from "next/link";
import { Feather } from "lucide-react";
import { Button } from "@/components/ui/button";
import ThemeToggle from "./ThemeToggle";

const Header = () => (
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
        href="/write"
      >
        Write
      </Link>
      <Link
        className="text-sm font-medium hover:underline underline-offset-4"
        href="/login"
      >
        Sign In
      </Link>
    </nav>
    <ThemeToggle />
    <Button className="ml-4" variant="outline" asChild>
      <Link href="/signup">Get Started</Link>
    </Button>
  </header>
);

export default Header;
