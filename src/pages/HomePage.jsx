import React from "react";
import Hero from "../components/Hero";
import CategorySection from "../components/CategorySection";
import FeaturedSection from "../components/FeaturedSection";
import NewArrivalsSection from "../components/NewArrivalsSection";
import FestiveBanner from "../components/FestiveBanner";
import AboutShop from "../components/AboutShop";
import StoreLocation from "../components/StoreLocation";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <CategorySection />
      <FeaturedSection />
      <NewArrivalsSection />
      <FestiveBanner />
      <AboutShop />
      <StoreLocation />
    </main>
  );
}
