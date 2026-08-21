import Hero from "@/components/home/Hero";
import WhatWeDo from "@/components/home/WhatWeDo";
import FeaturedProduct from "@/components/home/FeaturedProduct";
import ProductsPreview from "@/components/home/ProductsPreview";
import HowWeWork from "@/components/home/HowWeWork";
import SelectedWork from "@/components/home/SelectedWork";
import TeamPreview from "@/components/home/TeamPreview";
import Insights from "@/components/home/Insights";
import FinalCta from "@/components/home/FinalCta";

export default function Home() {
  return (
    <main>
      <Hero />
      <WhatWeDo />
      <FeaturedProduct />
      <ProductsPreview />
      <HowWeWork />
      <SelectedWork />
      <TeamPreview />
      <Insights />
      <FinalCta />
    </main>
  );
}
