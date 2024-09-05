"use client";

import Hero from "@/components/Home/Hero";
import FeaturedArticles from "@/components/Home/FeaturedArticles";
import CallToAction from "@/components/Home/CallToAction";

export default function LandingPage() {
  return (
    <div>
      <Hero />
      <FeaturedArticles />
      <CallToAction />
    </div>
  );
}
