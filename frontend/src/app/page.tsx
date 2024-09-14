"use client";

import Hero from "@/components/pages/Home/Hero";
import FeaturedArticles from "@/components/pages/Home/FeaturedArticles";
import CallToAction from "@/components/pages/Home/CallToAction";

export default function LandingPage() {
  return (
    <div>
      <Hero />
      <FeaturedArticles />
      <CallToAction />
    </div>
  );
}
