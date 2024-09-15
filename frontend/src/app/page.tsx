"use client";

import Hero from "@/components/pages/home/Hero";
import FeaturedArticles from "@/components/pages/home/FeaturedArticles";
import CallToAction from "@/components/pages/home/CallToAction";

export default function LandingPage() {
  return (
    <div>
      <Hero />
      <FeaturedArticles />
      <CallToAction />
    </div>
  );
}
