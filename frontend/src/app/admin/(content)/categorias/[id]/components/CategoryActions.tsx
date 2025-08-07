import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CategoryProps } from "@/types/category";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Edit, ExternalLink, Trash2 } from "lucide-react";
import Link from "next/link";
import { removeCategory } from "../../lib/actions/remove-category";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface CategoryDataProps {
  category?: CategoryProps;
  categoryId?: string;
}
export function CategoryActions({ category, categoryId }: CategoryDataProps) {
  const queryClient = useQueryClient();
  const router = useRouter();

  const categoryMutation = useMutation({
    mutationFn: async (categoryId?: string) => {
      await removeCategory({ categoryId });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
    onError: (error) => {
      toast.error(`Erro ao remover categoria: ${error.message}`);
    },
  });

  const handleRemoveCategory = () => {
    categoryMutation.mutate(categoryId);
    router.push("/admin/categorias");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Ações</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <Button className="w-full" asChild>
          <Link href={`/admin/categorias/${categoryId}/editar`}>
            <Edit className="w-4 h-4 mr-2 cursor-pointer" />
            Editar Categoria
          </Link>
        </Button>

        <Button variant="outline" className="w-full bg-transparent" asChild>
          <Link href={`/categorias/${category?.slug}`} target="_blank">
            <ExternalLink className="w-4 h-4 mr-2 cursor-pointer" />
            Ver na Loja
          </Link>
        </Button>

        <Separator />

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              variant="destructive"
              className="w-full cursor-pointer"
              disabled={categoryMutation.isPending}
            >
              <Trash2 className="w-4 h-4 mr-2" />
              {categoryMutation.isPending
                ? "Deletando..."
                : "Deletar Categoria"}
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Tem certeza que deseja excluir esta categoria?
              </AlertDialogTitle>
              <AlertDialogDescription>
                Esta ação não poderá ser desfeita.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="cursor-pointer">
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                variant={"destructive"}
                className="cursor-pointer"
                onClick={handleRemoveCategory}
                disabled={categoryMutation.isPending}
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Remover
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardContent>
    </Card>
  );
}
