import Hero from "@/components/home/Hero";
import WhatWeDo from "@/components/home/WhatWeDo";
import FeaturedProduct from "@/components/home/FeaturedProduct";
import ProductsPreview from "@/components/home/ProductsPreview";
import HowWeWork from "@/components/home/HowWeWork";
import SelectedWork from "@/components/home/SelectedWork";
import TeamPreview from "@/components/home/TeamPreview";
import Insights from "@/components/home/Insights";
import FinalCta from "@/components/home/FinalCta";
import { getBlogPosts, getProducts, getProjects, getTeamMembers } from "@/lib/api";

export default async function Home() {
  const [posts, products, projects, teamMembers] = await Promise.all([
    getBlogPosts(),
    getProducts(),
    getProjects(),
    getTeamMembers(),
  ]);

  return (
    <main>
      <Hero />
      <WhatWeDo />
      <FeaturedProduct product={products[0]} />
      <ProductsPreview products={products} />
      <HowWeWork />
      <SelectedWork projects={projects} />
      <TeamPreview teamMembers={teamMembers} />
      <Insights posts={posts} />
      <FinalCta />
    </main>
  );
}
