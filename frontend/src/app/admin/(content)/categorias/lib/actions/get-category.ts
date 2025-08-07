"use server";

import { api } from "@/app/admin/config/api";
import { NotFoundError } from "@/lib/errors/not-found-error";
import { CategoryProps } from "@/types/category";

interface GetCategoryParams {
  categoryId: string | undefined;
}
export interface CategoryDataProps {
  category: CategoryProps;
}

export async function getCategory({
  categoryId,
}: GetCategoryParams): Promise<CategoryProps> {
  try {
    const response = await api.get(`/categories/${categoryId}`);
    return response.data?.category;
  } catch (error: any) {
    if (error.response?.status === 404) {
      throw new NotFoundError(`Categoria com ID ${categoryId} não encontrada`);
    }
    throw error;
  }
}
