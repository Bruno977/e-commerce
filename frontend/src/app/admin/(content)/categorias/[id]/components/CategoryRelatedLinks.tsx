import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { FileText, Package } from "lucide-react";
import Link from "next/link";

interface CategoryDataProps {
  categoryId?: string;
}
export function CategoryRelatedLinks({ categoryId }: CategoryDataProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Links Relacionados</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <Button variant="ghost" className="w-full justify-start" asChild>
          <Link href={`/admin/produtos?categoria=${categoryId}`}>
            <Package className="w-4 h-4 mr-2" />
            Ver Produtos desta Categoria
          </Link>
        </Button>
        <Button variant="ghost" className="w-full justify-start" asChild>
          <Link href="/admin/categorias">
            <FileText className="w-4 h-4 mr-2" />
            Todas as Categorias
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
