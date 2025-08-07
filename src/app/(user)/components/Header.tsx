"use client"

import { useState } from "react"
import Link from "next/link"
import { Search, ShoppingCart, Menu, User, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export default function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  const navigationItems = [
    { href: "/", label: "Home" },
    { href: "/produtos", label: "Produtos" },
    { href: "/categorias", label: "Categorias" },
    { href: "/ofertas", label: "Ofertas" },
    { href: "/sobre", label: "Sobre" },
  ]

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Logo */}
          <Link href="/" className="text-xl sm:text-2xl font-bold text-gray-900 flex-shrink-0">
            ModernShop
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-gray-700 hover:text-gray-900 transition-colors text-sm xl:text-base"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex items-center flex-1 max-w-md mx-4 lg:mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input type="search" placeholder="Buscar produtos..." className="pl-10 pr-4 text-sm" />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Search Button - Mobile */}
            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsSearchOpen(!isSearchOpen)}>
              <Search className="w-4 h-4 sm:w-5 sm:h-5" />
            </Button>

            {/* Wishlist */}
            <Button variant="ghost" size="icon" className="hidden sm:flex">
              <Heart className="w-4 h-4 sm:w-5 sm:h-5" />
            </Button>

            {/* User Account */}
            <Button variant="ghost" size="icon" asChild>
              <Link href="/login">
                <User className="w-4 h-4 sm:w-5 sm:h-5" />
              </Link>
            </Button>

            {/* Shopping Cart */}
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center text-[10px] sm:text-xs">
                3
              </span>
            </Button>

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden">
                  <Menu className="w-4 h-4 sm:w-5 sm:h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <nav className="flex flex-col space-y-4 mt-6">
                  {navigationItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="text-gray-700 hover:text-gray-900 transition-colors py-2 text-lg"
                    >
                      {item.label}
                    </Link>
                  ))}
                  <div className="pt-4 border-t">
                    <Link
                      href="/login"
                      className="text-gray-700 hover:text-gray-900 transition-colors py-2 text-lg flex items-center"
                    >
                      <User className="w-5 h-5 mr-3" />
                      Minha Conta
                    </Link>
                    <Link
                      href="/favoritos"
                      className="text-gray-700 hover:text-gray-900 transition-colors py-2 text-lg flex items-center"
                    >
                      <Heart className="w-5 h-5 mr-3" />
                      Favoritos
                    </Link>
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Mobile Search Bar */}
        {isSearchOpen && (
          <div className="md:hidden py-3 border-t">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input type="search" placeholder="Buscar produtos..." className="pl-10 pr-4" autoFocus />
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
