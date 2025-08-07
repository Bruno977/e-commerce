import ProductsTable from "../components/ProductsTable";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";

export default function AdminProductsPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Produtos</h1>
          <p className="text-gray-600">Gerencie seus produtos</p>
        </div>
        <Button asChild>
          <Link href="/admin/produtos/novo">
            <Plus className="w-4 h-4 mr-2" />
            Novo Produto
          </Link>
        </Button>
      </div>

      <ProductsTable />
    </div>
  );
}
