import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface CategoryFormActionsProps {
  isEditing: boolean;
  isLoading: boolean;
  isPending: boolean;
}
export function CategoryFormActions({
  isEditing,
  isLoading,
  isPending,
}: CategoryFormActionsProps) {
  const labelButton = isPending
    ? "Salvando..."
    : isEditing
    ? "Atualizar Categoria"
    : "Criar Categoria";
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="space-y-2">
          <Button
            type="submit"
            className="w-full cursor-pointer"
            disabled={isPending || (isEditing && isLoading)}
          >
            {labelButton}
          </Button>
          <Button
            type="button"
            variant="outline"
            className="w-full"
            disabled={isPending || (isEditing && isLoading)}
          >
            Cancelar
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
