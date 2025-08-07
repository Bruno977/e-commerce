import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Star, ShoppingCart, Heart } from "lucide-react"

const products = [
  {
    id: 1,
    name: "Smartphone Premium",
    price: 1299.99,
    originalPrice: 1599.99,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.8,
    reviews: 124,
    category: "Eletrônicos",
  },
  {
    id: 2,
    name: "Notebook Gamer",
    price: 2499.99,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.9,
    reviews: 89,
    category: "Eletrônicos",
  },
  {
    id: 3,
    name: "Tênis Esportivo",
    price: 299.99,
    originalPrice: 399.99,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.7,
    reviews: 256,
    category: "Esportes",
  },
  {
    id: 4,
    name: "Camiseta Premium",
    price: 89.99,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.5,
    reviews: 178,
    category: "Moda",
  },
  {
    id: 5,
    name: "Relógio Inteligente",
    price: 599.99,
    originalPrice: 799.99,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.6,
    reviews: 203,
    category: "Eletrônicos",
  },
  {
    id: 6,
    name: "Fone Bluetooth",
    price: 199.99,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.4,
    reviews: 145,
    category: "Eletrônicos",
  },
]

export default function ProductGrid() {
  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 sm:mb-6 gap-4">
        <p className="text-gray-600 text-sm sm:text-base">{products.length} produtos encontrados</p>
        <select className="border rounded-md px-3 py-2 text-sm sm:text-base w-full sm:w-auto">
          <option>Ordenar por: Relevância</option>
          <option>Menor preço</option>
          <option>Maior preço</option>
          <option>Mais vendidos</option>
          <option>Melhor avaliados</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        {products.map((product) => (
          <Card key={product.id} className="group hover:shadow-lg transition-shadow">
            <CardContent className="p-0">
              <div className="relative overflow-hidden">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  width={300}
                  height={300}
                  className="w-full h-48 sm:h-56 md:h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {product.originalPrice && (
                  <div className="absolute top-2 sm:top-4 left-2 sm:left-4">
                    <span className="bg-red-500 text-white px-2 py-1 rounded text-xs sm:text-sm font-semibold">
                      -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                    </span>
                  </div>
                )}
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute top-2 sm:top-4 right-2 sm:right-4 bg-white/80 hover:bg-white w-8 h-8 sm:w-10 sm:h-10"
                >
                  <Heart className="w-3 h-3 sm:w-4 sm:h-4" />
                </Button>
              </div>

              <div className="p-3 sm:p-4">
                <div className="text-xs sm:text-sm text-gray-500 mb-1">{product.category}</div>
                <h3 className="font-semibold text-sm sm:text-lg mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                  <Link href={`/produtos/${product.id}`}>{product.name}</Link>
                </h3>

                <div className="flex items-center mb-3">
                  <div className="flex items-center">
                    <Star className="w-3 h-3 sm:w-4 sm:h-4 fill-yellow-400 text-yellow-400" />
                    <span className="ml-1 text-xs sm:text-sm text-gray-600">
                      {product.rating} ({product.reviews})
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <div>
                    <span className="text-lg sm:text-xl font-bold text-gray-900">R$ {product.price.toFixed(2)}</span>
                    {product.originalPrice && (
                      <span className="text-xs sm:text-sm text-gray-500 line-through ml-2 block sm:inline">
                        R$ {product.originalPrice.toFixed(2)}
                      </span>
                    )}
                  </div>
                </div>

                <Button className="w-full text-xs sm:text-sm" size="sm">
                  <ShoppingCart className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                  Adicionar ao Carrinho
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-8 sm:mt-12">
        <div className="flex flex-wrap justify-center gap-2">
          <Button variant="outline" disabled className="text-xs sm:text-sm">
            Anterior
          </Button>
          <Button variant="outline" className="bg-blue-600 text-white text-xs sm:text-sm">
            1
          </Button>
          <Button variant="outline" className="text-xs sm:text-sm">
            2
          </Button>
          <Button variant="outline" className="text-xs sm:text-sm">
            3
          </Button>
          <Button variant="outline" className="text-xs sm:text-sm">
            Próximo
          </Button>
        </div>
      </div>
    </div>
  )
}
