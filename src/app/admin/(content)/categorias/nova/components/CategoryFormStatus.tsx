import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

import { Control } from "react-hook-form";
import { CategoryFormData } from "./CategoryForm";

import { Controller } from "react-hook-form";
import { Switch } from "@/components/ui/switch";

interface CategoryFormStatusProps {
  control: Control<CategoryFormData>;
  isEditing: boolean;
  isLoading: boolean;
}

export function CategoryFormStatus({
  control,
  isEditing,
  isLoading,
}: CategoryFormStatusProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Status</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-2">
          <Controller
            name="isActive"
            control={control}
            render={({ field }) => (
              <Switch
                checked={field.value}
                disabled={isEditing && isLoading}
                onCheckedChange={field.onChange}
              />
            )}
          />
          <Label htmlFor="isActive">Categoria ativa</Label>
        </div>
        <p className="text-sm text-gray-500 mt-2">
          Categorias inativas não aparecem na loja
        </p>
      </CardContent>
    </Card>
  );
}
