import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

import { Control, FieldErrors } from "react-hook-form";
import { CategoryFormData } from "./CategoryForm";

import { Controller } from "react-hook-form";
import ImageUpload from "../../../components/ImageUpload";
import { ErrorInputForm } from "@/components/ui/error-message";

interface CategoryFormImageProps {
  control: Control<CategoryFormData>;
  errors: FieldErrors<CategoryFormData>;
  isEditing: boolean;
  isLoading: boolean;
}
export function CategoryFormImage({
  control,
  errors,
  isEditing,
  isLoading,
}: CategoryFormImageProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Imagem da Categoria</CardTitle>
      </CardHeader>
      <CardContent>
        <Controller
          name="image"
          control={control}
          render={({ field }) => (
            <ImageUpload
              value={field.value}
              onChange={(file) => field.onChange(file)}
              onRemove={() => field.onChange(undefined)}
              disabled={isEditing && isLoading}
            />
          )}
        />
        {errors.image?.message && (
          <ErrorInputForm message={errors.image?.message} />
        )}
      </CardContent>
    </Card>
  );
}
