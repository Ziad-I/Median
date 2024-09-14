"use client";

import Link from "next/link";
import { Feather } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import HeaderButtons from "./HeaderButtons";

const Header = () => {
  return (
    <header className="px-4 lg:px-6 h-14 flex items-center border-b">
      <Link className="flex items-center justify-center" href="/">
        <Feather className="h-6 w-6 text-primary" />
        <span className="sr-only">Median</span>
      </Link>
      <nav className="ml-auto flex items-center space-x-4">
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
        <HeaderButtons />
      </nav>
      <div className="ml-4">
        <ThemeToggle />
      </div>
    </header>
  );
};

export default Header;
