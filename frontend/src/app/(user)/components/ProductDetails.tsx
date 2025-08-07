"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Star, ShoppingCart, Heart, Share2, Minus, Plus } from "lucide-react"

interface ProductDetailsProps {
  productId: string
}

export default function ProductDetails({ productId }: ProductDetailsProps) {
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)

  // Mock product data - in real app, fetch based on productId
  const product = {
    id: productId,
    name: "Smartphone Premium XYZ",
    price: 1299.99,
    originalPrice: 1599.99,
    rating: 4.8,
    reviews: 124,
    description: "Um smartphone premium com tecnologia de ponta, câmera profissional e design elegante.",
    images: [
      "/placeholder.svg?height=500&width=500",
      "/placeholder.svg?height=500&width=500",
      "/placeholder.svg?height=500&width=500",
      "/placeholder.svg?height=500&width=500",
    ],
    specifications: {
      Tela: "6.7 polegadas OLED",
      Processador: "Snapdragon 8 Gen 2",
      Memória: "8GB RAM",
      Armazenamento: "256GB",
      Câmera: "108MP + 12MP + 12MP",
      Bateria: "5000mAh",
    },
    inStock: true,
    stockQuantity: 15,
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
      {/* Product Images */}
      <div className="space-y-4">
        <div className="aspect-square overflow-hidden rounded-lg border">
          <Image
            src={product.images[selectedImage] || "/placeholder.svg"}
            alt={product.name}
            width={500}
            height={500}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="grid grid-cols-4 gap-4">
          {product.images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={`aspect-square overflow-hidden rounded-lg border-2 ${
                selectedImage === index ? "border-blue-500" : "border-gray-200"
              }`}
            >
              <Image
                src={image || "/placeholder.svg"}
                alt={`${product.name} ${index + 1}`}
                width={100}
                height={100}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Product Info */}
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>

          <div className="flex items-center mb-4">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${
                    i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                  }`}
                />
              ))}
              <span className="ml-2 text-sm text-gray-600">
                {product.rating} ({product.reviews} avaliações)
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-4 mb-6">
            <span className="text-3xl font-bold text-gray-900">R$ {product.price.toFixed(2)}</span>
            {product.originalPrice && (
              <>
                <span className="text-xl text-gray-500 line-through">R$ {product.originalPrice.toFixed(2)}</span>
                <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-sm font-semibold">
                  -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                </span>
              </>
            )}
          </div>

          <p className="text-gray-600 mb-6">{product.description}</p>
        </div>

        {/* Quantity and Actions */}
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <span className="font-medium">Quantidade:</span>
            <div className="flex items-center border rounded-md">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={quantity <= 1}
              >
                <Minus className="w-4 h-4" />
              </Button>
              <span className="px-4 py-2 font-medium">{quantity}</span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setQuantity(Math.min(product.stockQuantity, quantity + 1))}
                disabled={quantity >= product.stockQuantity}
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            <span className="text-sm text-gray-500">{product.stockQuantity} disponíveis</span>
          </div>

          <div className="flex space-x-4">
            <Button size="lg" className="flex-1">
              <ShoppingCart className="w-5 h-5 mr-2" />
              Adicionar ao Carrinho
            </Button>
            <Button variant="outline" size="lg">
              <Heart className="w-5 h-5" />
            </Button>
            <Button variant="outline" size="lg">
              <Share2 className="w-5 h-5" />
            </Button>
          </div>

          <Button variant="outline" size="lg" className="w-full">
            Comprar Agora
          </Button>
        </div>

        {/* Product Details Tabs */}
        <Tabs defaultValue="specs" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="specs">Especificações</TabsTrigger>
            <TabsTrigger value="reviews">Avaliações</TabsTrigger>
            <TabsTrigger value="shipping">Entrega</TabsTrigger>
          </TabsList>

          <TabsContent value="specs" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="flex justify-between py-2 border-b border-gray-100 last:border-b-0">
                      <span className="font-medium text-gray-700">{key}:</span>
                      <span className="text-gray-900">{value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reviews" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <p className="text-gray-600">Avaliações dos clientes aparecerão aqui.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="shipping" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Opções de Entrega</h4>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li>• Entrega padrão: 5-7 dias úteis - Grátis</li>
                      <li>• Entrega expressa: 2-3 dias úteis - R$ 15,00</li>
                      <li>• Entrega no mesmo dia: Disponível em algumas regiões - R$ 25,00</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
