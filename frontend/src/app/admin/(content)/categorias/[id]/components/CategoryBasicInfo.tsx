import Image from "next/image";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Package, Hash, Tag } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { CategoryProps } from "@/types/category";

interface CategoryDataProps {
  category?: CategoryProps;
}
export function CategoryBasicInfo({ category }: CategoryDataProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <Tag className="w-5 h-5" />
            <span>Informações Básicas</span>
          </CardTitle>
          <Badge variant={category?.is_active ? "default" : "secondary"}>
            {category?.is_active ? "Ativa" : "Inativa"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-start space-x-6">
          <div className="flex-shrink-0">
            <Image
              src={"/placeholder.svg"}
              alt="Categoria Imagem"
              width={120}
              height={120}
              className="rounded-lg border"
            />
          </div>

          <div className="flex-1 space-y-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {category?.title}
              </h2>
              <p className="text-gray-600">{category?.description}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Hash className="w-4 h-4" />
                <span>Slug: {category?.slug}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Package className="w-4 h-4" />
                <span>{category?.product_count} produtos</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
