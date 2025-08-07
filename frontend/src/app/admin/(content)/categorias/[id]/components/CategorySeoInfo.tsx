import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Button } from "@/components/ui/button";

import { ExternalLink, Search, Globe } from "lucide-react";
import { CategoryProps } from "@/types/category";

interface CategoryDataProps {
  category?: CategoryProps;
}

export function CategorySeoInfo({ category }: CategoryDataProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Search className="w-5 h-5" />
          <span>SEO</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="text-sm font-medium text-gray-700">
            Título SEO
          </label>
          <p className="mt-1 text-gray-900">{"Não definido"}</p>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700">
            Descrição SEO
          </label>
          <p className="mt-1 text-gray-900">{"Não definida"}</p>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Globe className="w-4 h-4" />
          <span>URL: /categorias/{category?.slug}</span>
          <Button variant="ghost" size="sm" asChild>
            <Link href={`/categorias/${category?.slug}`} target="_blank">
              <ExternalLink className="w-3 h-3" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
