import HeroCarousel from "@/app/(user)/components/HeroCarousel";
import FeaturedProducts from "@/app/(user)/components/FeaturedProducts";
import CategorySection from "@/app/(user)/components/CategorySection";

export default function HomePage() {
  return (
    <div className="space-y-12">
      <HeroCarousel />
      <div className="container mx-auto px-4">
        <CategorySection />
        <FeaturedProducts />
      </div>
    </div>
  );
}
