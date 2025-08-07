import { ArrowLeft, Edit } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import CategoryView from "./components/CategoryView";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getCategory } from "../lib/actions/get-category";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const queryClient = new QueryClient();
  const { id: categoryId } = await params;

  await queryClient.prefetchQuery({
    queryKey: ["category", categoryId],
    queryFn: () =>
      getCategory({
        categoryId,
      }),
  });
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="icon" asChild>
            <Link href="/admin/categorias">
              <ArrowLeft className="w-4 h-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Visualizar Categoria
            </h1>
            <p className="text-gray-600">Detalhes completos da categoria</p>
          </div>
        </div>

        <Button asChild>
          <Link href={`/admin/categorias/${categoryId}/editar`}>
            <Edit className="w-4 h-4 mr-2" />
            Editar Categoria
          </Link>
        </Button>
      </div>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <CategoryView categoryId={categoryId} />
      </HydrationBoundary>
    </div>
  );
}
