import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { CategoryProps } from "@/types/category";
import { Calendar } from "lucide-react";

interface CategoryDataProps {
  category?: CategoryProps;
}
export function CategorySystemInfo({ category }: CategoryDataProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Calendar className="w-5 h-5" />
          <span>Informações do Sistema</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="text-sm font-medium text-gray-700">
            ID da Categoria
          </label>
          <p className="mt-1 text-gray-900 font-mono text-sm">
            #{category?.id}
          </p>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700">Criado em</label>
          <p className="mt-1 text-gray-900">
            {category?.created_at &&
              new Date(category?.created_at).toLocaleDateString("pt-BR", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
          </p>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700">
            Última atualização
          </label>
          <p className="mt-1 text-gray-900">
            {category?.updated_at &&
              new Date(category?.updated_at).toLocaleDateString("pt-BR", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
