"use client"
import Image from "next/image"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules"
import { Button } from "@/components/ui/button"

// Import Swiper styles
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import "swiper/css/effect-fade"

const slides = [
  {
    id: 1,
    title: "Coleção Verão 2024",
    subtitle: "Descubra as últimas tendências",
    image: "/placeholder.svg?height=600&width=1200",
    cta: "Ver Coleção",
    href: "/produtos?categoria=verao",
  },
  {
    id: 2,
    title: "Ofertas Especiais",
    subtitle: "Até 50% de desconto",
    image: "/placeholder.svg?height=600&width=1200",
    cta: "Aproveitar",
    href: "/ofertas",
  },
  {
    id: 3,
    title: "Novidades",
    subtitle: "Produtos exclusivos chegaram",
    image: "/placeholder.svg?height=600&width=1200",
    cta: "Explorar",
    href: "/produtos?novidades=true",
  },
  {
    id: 4,
    title: "Tecnologia Premium",
    subtitle: "Os melhores dispositivos",
    image: "/placeholder.svg?height=600&width=1200",
    cta: "Ver Produtos",
    href: "/produtos?categoria=eletronicos",
  },
]

export default function HeroCarousel() {
  return (
    <div className="relative h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden">
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        spaceBetween={0}
        slidesPerView={1}
        navigation={{
          nextEl: ".swiper-button-next-custom",
          prevEl: ".swiper-button-prev-custom",
        }}
        pagination={{
          clickable: true,
          el: ".swiper-pagination-custom",
        }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        effect="fade"
        fadeEffect={{
          crossFade: true,
        }}
        loop={true}
        className="h-full"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative h-full">
              <Image src={slide.image || "/placeholder.svg"} alt={slide.title} fill className="object-cover" priority />
              <div className="absolute inset-0 bg-black bg-opacity-40" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white max-w-4xl px-4 sm:px-6 lg:px-8">
                  <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-2 sm:mb-4">{slide.title}</h1>
                  <p className="text-lg sm:text-xl md:text-2xl mb-4 sm:mb-8 max-w-2xl mx-auto">{slide.subtitle}</p>
                  <Button
                    size="lg"
                    className="bg-white text-black hover:bg-gray-100 text-sm sm:text-base px-6 sm:px-8 py-2 sm:py-3"
                  >
                    {slide.cta}
                  </Button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Navigation Buttons */}
      <button className="swiper-button-prev-custom absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 text-white p-2 sm:p-3 rounded-full transition-all">
        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button className="swiper-button-next-custom absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 text-white p-2 sm:p-3 rounded-full transition-all">
        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Custom Pagination */}
      <div className="swiper-pagination-custom absolute bottom-4 sm:bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
        {slides.map((_, index) => (
          <div
            key={index}
            className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-white/50 cursor-pointer transition-all hover:bg-white/80"
          />
        ))}
      </div>
    </div>
  )
}
