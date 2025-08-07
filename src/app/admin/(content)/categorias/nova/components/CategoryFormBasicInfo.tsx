import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ErrorInputForm } from "@/components/ui/error-message";

import { UseFormRegister, FieldErrors } from "react-hook-form";
import { CategoryFormData } from "./CategoryForm";

interface CategoryFormBasicInfoProps {
  register: UseFormRegister<CategoryFormData>;
  errors: FieldErrors<CategoryFormData>;
  isEditing: boolean;
  isLoading: boolean;
}

export function CategoryFormBasicInfo({
  register,
  errors,
  isEditing,
  isLoading,
}: CategoryFormBasicInfoProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Informações Básicas</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="title">Nome da Categoria</Label>
          <Input
            {...register("title")}
            disabled={isEditing && isLoading}
            placeholder="Ex: Eletrônicos"
          />
          {errors.title?.message && (
            <ErrorInputForm message={errors.title?.message} />
          )}
        </div>
        <div>
          <Label htmlFor="description">Descrição</Label>
          <Textarea
            {...register("description")}
            disabled={isEditing && isLoading}
            placeholder="Descreva a categoria..."
            rows={4}
          />
          {errors.description?.message && (
            <ErrorInputForm message={errors.description?.message} />
          )}
        </div>
      </CardContent>
    </Card>
  );
}
