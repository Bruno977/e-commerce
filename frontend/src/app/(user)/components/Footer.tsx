import Link from "next/link"
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">ModernShop</h3>
            <p className="text-gray-300 mb-4">
              Sua loja online de confiança com os melhores produtos e atendimento excepcional.
            </p>
            <div className="flex space-x-4">
              <Facebook className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
              <Instagram className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
              <Twitter className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Links Rápidos</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/produtos" className="text-gray-300 hover:text-white">
                  Produtos
                </Link>
              </li>
              <li>
                <Link href="/categorias" className="text-gray-300 hover:text-white">
                  Categorias
                </Link>
              </li>
              <li>
                <Link href="/ofertas" className="text-gray-300 hover:text-white">
                  Ofertas
                </Link>
              </li>
              <li>
                <Link href="/sobre" className="text-gray-300 hover:text-white">
                  Sobre Nós
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Atendimento</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/ajuda" className="text-gray-300 hover:text-white">
                  Central de Ajuda
                </Link>
              </li>
              <li>
                <Link href="/contato" className="text-gray-300 hover:text-white">
                  Contato
                </Link>
              </li>
              <li>
                <Link href="/trocas" className="text-gray-300 hover:text-white">
                  Trocas e Devoluções
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-300 hover:text-white">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contato</h4>
            <div className="space-y-3">
              <div className="flex items-center">
                <Mail className="w-4 h-4 mr-2" />
                <span className="text-gray-300">contato@modernshop.com</span>
              </div>
              <div className="flex items-center">
                <Phone className="w-4 h-4 mr-2" />
                <span className="text-gray-300">(11) 9999-9999</span>
              </div>
              <div className="flex items-center">
                <MapPin className="w-4 h-4 mr-2" />
                <span className="text-gray-300">São Paulo, SP</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">© 2024 ModernShop. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
