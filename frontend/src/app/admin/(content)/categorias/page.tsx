import CategoriesTable from "./components/CategoriesTable";
import { Button } from "@/components/ui/button";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { Plus } from "lucide-react";
import Link from "next/link";
import { getCategories } from "./lib/actions/get-categories";

export default async function AdminCategoriesPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const queryClient = new QueryClient();
  const { page, perPage } = await searchParams;

  await queryClient.prefetchQuery({
    queryKey: ["categories", page, perPage],
    queryFn: () =>
      getCategories({
        page: parseInt(page as string, 10) || 1,
        perPage: parseInt(perPage as string, 10) || 10,
      }),
  });
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-6 md:justify-between md:items-center md:flex-row">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Categorias</h1>
          <p className="text-gray-600">
            Gerencie as categorias dos seus produtos
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/categorias/nova">
            <Plus className="w-4 h-4 mr-2" />
            Nova Categoria
          </Link>
        </Button>
      </div>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <CategoriesTable />
      </HydrationBoundary>
    </div>
  );
}
