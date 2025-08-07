import Link from "next/link";
import { Button } from "@/components/ui/button";
import ProductCarousel from "./ProductCarousel";

const featuredProducts = [
  {
    id: 1,
    name: "Smartphone Premium",
    price: 1299.99,
    originalPrice: 1599.99,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.8,
    reviews: 124,
  },
  {
    id: 2,
    name: "Notebook Gamer",
    price: 2499.99,
    originalPrice: 2999.99,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.9,
    reviews: 89,
  },
  {
    id: 3,
    name: "Headphone Wireless",
    price: 299.99,
    originalPrice: 399.99,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.7,
    reviews: 256,
  },
  {
    id: 4,
    name: "Smart Watch",
    price: 599.99,
    originalPrice: 799.99,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.6,
    reviews: 178,
  },
  {
    id: 5,
    name: "Tablet Pro",
    price: 899.99,
    originalPrice: 1199.99,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.8,
    reviews: 92,
  },
  {
    id: 6,
    name: "Camera Digital",
    price: 1899.99,
    originalPrice: 2299.99,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.9,
    reviews: 67,
  },
];

export default function FeaturedProducts() {
  return (
    <section className="py-8 sm:py-12">
      <div className="text-center mb-8 sm:mb-12 px-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 sm:mb-4">
          Produtos em Destaque
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base">
          Descubra nossa seleção especial dos produtos mais populares e bem
          avaliados
        </p>
      </div>

      <div className="px-4">
        <ProductCarousel products={featuredProducts} />
      </div>

      <div className="text-center mt-8 sm:mt-12 px-4">
        <Button
          variant="outline"
          size="lg"
          asChild
          className="text-sm sm:text-base"
        >
          <Link href="/produtos">Ver Todos os Produtos</Link>
        </Button>
      </div>
    </section>
  );
}
