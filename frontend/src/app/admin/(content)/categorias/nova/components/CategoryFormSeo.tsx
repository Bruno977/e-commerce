import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ErrorInputForm } from "@/components/ui/error-message";

import { UseFormRegister, FieldErrors } from "react-hook-form";
import { CategoryFormData } from "./CategoryForm";

interface CategoryFormSeoProps {
  register: UseFormRegister<CategoryFormData>;
  errors: FieldErrors<CategoryFormData>;
  isEditing: boolean;
  isLoading: boolean;
}

export function CategoryFormSeo({
  register,
  errors,
  isEditing,
  isLoading,
}: CategoryFormSeoProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>SEO</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="metaTitle">Título SEO</Label>
          <Input
            {...register("metaTitle")}
            disabled={isEditing && isLoading}
            placeholder="Título para mecanismos de busca"
          />
          {errors.metaTitle?.message && (
            <ErrorInputForm message={errors.metaTitle?.message} />
          )}
          <p className="text-sm text-gray-500 mt-1">
            Recomendado: 50-60 caracteres
          </p>
        </div>
        <div>
          <Label htmlFor="metaDescription">Descrição SEO</Label>
          <Textarea
            {...register("metaDescription")}
            disabled={isEditing && isLoading}
            placeholder="Descrição para mecanismos de busca"
            rows={3}
          />
          {errors.metaDescription?.message && (
            <ErrorInputForm message={errors.metaDescription?.message} />
          )}
          <p className="text-sm text-gray-500 mt-1">
            Recomendado: 150-160 caracteres
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
