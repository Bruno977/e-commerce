import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getCategory } from "../../lib/actions/get-category";
import CategoryForm from "../../nova/components/CategoryForm";

export default async function EditCategoryPage({
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
      <div className="flex items-center space-x-4">
        <Button variant="outline" size="icon" asChild>
          <Link href="/admin/categorias">
            <ArrowLeft className="w-4 h-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Editar Categoria</h1>
          <p className="text-gray-600">Modifique os dados da categoria</p>
        </div>
      </div>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <CategoryForm categoryId={categoryId} />
      </HydrationBoundary>
    </div>
  );
}
