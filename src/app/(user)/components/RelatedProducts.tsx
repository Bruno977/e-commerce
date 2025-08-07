import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Star, ShoppingCart } from "lucide-react"

const relatedProducts = [
  {
    id: 2,
    name: "Smartphone Pro Max",
    price: 1599.99,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.9,
    reviews: 89,
  },
  {
    id: 3,
    name: "Smartphone Lite",
    price: 899.99,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.6,
    reviews: 156,
  },
  {
    id: 4,
    name: "Smartphone Classic",
    price: 699.99,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.5,
    reviews: 203,
  },
  {
    id: 5,
    name: "Smartphone Mini",
    price: 599.99,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.4,
    reviews: 124,
  },
]

export default function RelatedProducts() {
  return (
    <section>
      <h2 className="text-2xl font-bold text-gray-900 mb-8">Produtos Relacionados</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {relatedProducts.map((product) => (
          <Card key={product.id} className="group hover:shadow-lg transition-shadow">
            <CardContent className="p-0">
              <div className="relative overflow-hidden">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  width={300}
                  height={300}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              <div className="p-4">
                <h3 className="font-semibold mb-2 group-hover:text-blue-600 transition-colors">
                  <Link href={`/produtos/${product.id}`}>{product.name}</Link>
                </h3>

                <div className="flex items-center mb-2">
                  <div className="flex items-center">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="ml-1 text-sm text-gray-600">
                      {product.rating} ({product.reviews})
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-3">
                  <span className="text-lg font-bold text-gray-900">R$ {product.price.toFixed(2)}</span>
                </div>

                <Button className="w-full" size="sm">
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Adicionar
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
