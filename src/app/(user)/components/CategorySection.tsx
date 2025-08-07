import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"

const categories = [
  {
    id: 1,
    name: "Eletrônicos",
    image: "/placeholder.svg?height=200&width=200",
    count: 156,
  },
  {
    id: 2,
    name: "Moda",
    image: "/placeholder.svg?height=200&width=200",
    count: 89,
  },
  {
    id: 3,
    name: "Casa & Jardim",
    image: "/placeholder.svg?height=200&width=200",
    count: 234,
  },
  {
    id: 4,
    name: "Esportes",
    image: "/placeholder.svg?height=200&width=200",
    count: 67,
  },
  {
    id: 5,
    name: "Livros",
    image: "/placeholder.svg?height=200&width=200",
    count: 123,
  },
  {
    id: 6,
    name: "Beleza",
    image: "/placeholder.svg?height=200&width=200",
    count: 98,
  },
]

export default function CategorySection() {
  return (
    <section className="py-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Categorias</h2>
        <p className="text-gray-600">Explore nossas categorias de produtos</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {categories.map((category) => (
          <Link key={category.id} href={`/categorias/${category.id}`}>
            <Card className="group hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-4 text-center">
                <div className="relative mb-4">
                  <Image
                    src={category.image || "/placeholder.svg"}
                    alt={category.name}
                    width={80}
                    height={80}
                    className="mx-auto rounded-full group-hover:scale-110 transition-transform"
                  />
                </div>
                <h3 className="font-semibold text-sm mb-1">{category.name}</h3>
                <p className="text-xs text-gray-500">{category.count} produtos</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  )
}
