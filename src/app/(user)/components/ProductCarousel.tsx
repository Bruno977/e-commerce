"use client"

import Image from "next/image"
import Link from "next/link"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination, Autoplay } from "swiper/modules"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Star, ShoppingCart } from "lucide-react"

// Import Swiper styles
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"

interface Product {
  id: number
  name: string
  price: number
  originalPrice?: number
  image: string
  rating: number
  reviews: number
}

interface ProductCarouselProps {
  products: Product[]
}

export default function ProductCarousel({ products }: ProductCarouselProps) {
  return (
    <div className="relative">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={16}
        navigation={{
          nextEl: ".product-swiper-button-next",
          prevEl: ".product-swiper-button-prev",
        }}
        pagination={{
          clickable: true,
          el: ".product-swiper-pagination",
        }}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        breakpoints={{
          320: {
            slidesPerView: 1,
            spaceBetween: 16,
          },
          640: {
            slidesPerView: 2,
            spaceBetween: 16,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 24,
          },
          1280: {
            slidesPerView: 5,
            spaceBetween: 24,
          },
        }}
        className="pb-12"
      >
        {products.map((product) => (
          <SwiperSlide key={product.id}>
            <Card className="group hover:shadow-lg transition-shadow h-full">
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
                    <div className="absolute top-2 sm:top-4 right-2 sm:right-4">
                      <span className="bg-red-500 text-white px-2 py-1 rounded text-xs sm:text-sm font-semibold">
                        -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                      </span>
                    </div>
                  )}
                </div>

                <div className="p-3 sm:p-4">
                  <h3 className="font-semibold text-sm sm:text-lg mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                    <Link href={`/produtos/${product.id}`}>{product.name}</Link>
                  </h3>

                  <div className="flex items-center mb-2">
                    <div className="flex items-center">
                      <Star className="w-3 h-3 sm:w-4 sm:h-4 fill-yellow-400 text-yellow-400" />
                      <span className="ml-1 text-xs sm:text-sm text-gray-600">
                        {product.rating} ({product.reviews})
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-3 sm:mb-4">
                    <div>
                      <span className="text-lg sm:text-2xl font-bold text-gray-900">R$ {product.price.toFixed(2)}</span>
                      {product.originalPrice && (
                        <span className="text-xs sm:text-sm text-gray-500 line-through ml-2">
                          R$ {product.originalPrice.toFixed(2)}
                        </span>
                      )}
                    </div>
                  </div>

                  <Button className="w-full text-xs sm:text-sm" size="sm">
                    <ShoppingCart className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                    Adicionar
                  </Button>
                </div>
              </CardContent>
            </Card>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Navigation Buttons */}
      <button className="product-swiper-button-prev absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 z-10 bg-white shadow-lg hover:shadow-xl border text-gray-600 hover:text-gray-900 p-2 sm:p-3 rounded-full transition-all hidden md:block">
        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button className="product-swiper-button-next absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 z-10 bg-white shadow-lg hover:shadow-xl border text-gray-600 hover:text-gray-900 p-2 sm:p-3 rounded-full transition-all hidden md:block">
        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Custom Pagination */}
      <div className="product-swiper-pagination mt-6 flex justify-center space-x-2"></div>
    </div>
  )
}
