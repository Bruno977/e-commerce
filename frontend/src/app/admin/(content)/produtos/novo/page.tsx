import ProductForm from "../../components/ProductForm";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NewProductPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Button variant="outline" size="icon" asChild>
          <Link href="/admin/produtos">
            <ArrowLeft className="w-4 h-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Novo Produto</h1>
          <p className="text-gray-600">Adicione um novo produto ao catálogo</p>
        </div>
      </div>

      <ProductForm />
    </div>
  );
}
