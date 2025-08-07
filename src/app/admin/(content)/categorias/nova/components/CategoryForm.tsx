"use client";

import type React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { toast } from "sonner";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createCategory } from "../../lib/actions/create-category";
import { CategoryFormSchema } from "../../lib/definitions";
import { ErrorMessage } from "@/components/ui/error-message";
import { getCategory } from "../../lib/actions/get-category";

import { useEffect } from "react";
import { CategoryProps } from "@/types/category";
import { ProductCardSkeleton } from "@/components/ui/skeleton";
import { updateCategory } from "../../lib/actions/update-category";
import { useRouter } from "next/navigation";
import { CategoryFormBasicInfo } from "./CategoryFormBasicInfo";
import { CategoryFormSeo } from "./CategoryFormSeo";
import { CategoryFormStatus } from "./CategoryFormStatus";
import { CategoryFormImage } from "./CategoryFormImage";
import { CategoryFormActions } from "./CategoryFormActions";

export type CategoryFormData = z.infer<typeof CategoryFormSchema>;

interface CategoryFormProps {
  categoryId?: string;
}

export default function CategoryForm({ categoryId }: CategoryFormProps) {
  const router = useRouter();
  const isEditing = Boolean(categoryId);
  const queryClient = useQueryClient();

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CategoryFormData>({
    resolver: zodResolver(CategoryFormSchema),
    defaultValues: {
      isActive: true,
      image: undefined,
    },
  });

  const { data, isLoading, error, refetch } = useQuery<CategoryProps>({
    queryKey: ["category", categoryId],
    queryFn: () => getCategory({ categoryId }),
    enabled: isEditing,
  });

  const categoryMutation = useMutation({
    mutationFn: isEditing ? updateCategory : createCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      const messageToast = isEditing
        ? "Categoria atualizada com sucesso!"
        : "Categoria criada com sucesso!";

      toast.success(messageToast);
      if (isEditing) {
        router.push("/admin/categorias");
        return;
      }
      reset();
    },
    onError: (error: any) => {
      const messageToast = isEditing
        ? "Erro ao atualizar categoria: "
        : "Erro ao criar categoria: ";
      toast.error(`${messageToast} ${error?.message}`);
    },
  });

  const onSubmit = (data: CategoryFormData) => {
    const payload = {
      categoryId,
      ...data,
    };
    categoryMutation.mutate(payload);
  };

  useEffect(() => {
    if (data && isEditing) {
      reset({
        title: data.title,
        description: data.description,
        isActive: data.is_active,
      });
    }
  }, [data, isEditing, reset]);

  if (isEditing && isLoading) {
    return <ProductCardSkeleton />;
  }

  if (error) {
    return <ErrorMessage message={error.message} onRetry={refetch} />;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <CategoryFormBasicInfo
            register={register}
            errors={errors}
            isEditing={isEditing}
            isLoading={isLoading}
          />
          <CategoryFormSeo
            register={register}
            errors={errors}
            isEditing={isEditing}
            isLoading={isLoading}
          />
        </div>

        <div className="space-y-6">
          <CategoryFormStatus
            control={control}
            isEditing={isEditing}
            isLoading={isLoading}
          />

          <CategoryFormImage
            errors={errors}
            control={control}
            isEditing={isEditing}
            isLoading={isLoading}
          />
          <CategoryFormActions
            isEditing={isEditing}
            isLoading={isLoading}
            isPending={categoryMutation.isPending}
          />
        </div>
      </div>
    </form>
  );
}
