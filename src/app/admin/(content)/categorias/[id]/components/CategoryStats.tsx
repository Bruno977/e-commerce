import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CategoryProps } from "@/types/category";

interface CategoryDataProps {
  category?: CategoryProps;
}
export function CategoryStats({ category }: CategoryDataProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Estatísticas de Vendas</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">
              R$ 100,000.00
            </div>
            <div className="text-sm text-gray-600">Receita Total</div>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">
              {category?.product_count}
            </div>
            <div className="text-sm text-gray-600">Produtos Ativos</div>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">100</div>
            <div className="text-sm text-gray-600">Vendas Totais</div>
          </div>
        </div>

        <div>
          <h4 className="font-medium mb-3">Produtos Mais Vendidos</h4>
          <div className="space-y-2">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium">
                  1
                </span>
                <span className="font-medium">Nome Produto</span>
              </div>
              <div className="text-right">
                <div className="font-medium">R$ 100,00</div>
                <div className="text-sm text-gray-600">5 vendas</div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
