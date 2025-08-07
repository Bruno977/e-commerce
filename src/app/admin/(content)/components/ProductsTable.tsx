import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Edit, Trash2, Eye } from "lucide-react"
import Link from "next/link"

const products = [
  {
    id: 1,
    name: "Smartphone Premium",
    category: "Eletrônicos",
    price: 1299.99,
    stock: 15,
    status: "Ativo",
    image: "/placeholder.svg?height=50&width=50",
  },
  {
    id: 2,
    name: "Notebook Gamer",
    category: "Eletrônicos",
    price: 2499.99,
    stock: 8,
    status: "Ativo",
    image: "/placeholder.svg?height=50&width=50",
  },
  {
    id: 3,
    name: "Tênis Esportivo",
    category: "Esportes",
    price: 299.99,
    stock: 0,
    status: "Inativo",
    image: "/placeholder.svg?height=50&width=50",
  },
  {
    id: 4,
    name: "Camiseta Premium",
    category: "Moda",
    price: 89.99,
    stock: 25,
    status: "Ativo",
    image: "/placeholder.svg?height=50&width=50",
  },
]

export default function ProductsTable() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Lista de Produtos</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Produto</TableHead>
              <TableHead>Categoria</TableHead>
              <TableHead>Preço</TableHead>
              <TableHead>Estoque</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>
                  <div className="flex items-center space-x-3">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      width={50}
                      height={50}
                      className="rounded-md"
                    />
                    <span className="font-medium">{product.name}</span>
                  </div>
                </TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>R$ {product.price.toFixed(2)}</TableCell>
                <TableCell>
                  <span className={product.stock === 0 ? "text-red-600" : ""}>{product.stock}</span>
                </TableCell>
                <TableCell>
                  <Badge variant={product.status === "Ativo" ? "default" : "secondary"}>{product.status}</Badge>
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="icon" asChild>
                      <Link href={`/admin/produtos/${product.id}`}>
                        <Eye className="w-4 h-4" />
                      </Link>
                    </Button>
                    <Button variant="ghost" size="icon" asChild>
                      <Link href={`/admin/produtos/${product.id}/editar`}>
                        <Edit className="w-4 h-4" />
                      </Link>
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
