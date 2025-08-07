"use server";
import { api } from "@/app/admin/config/api";
import { NotFoundError } from "@/lib/errors/not-found-error";
import { UnauthorizedError } from "@/lib/errors/unauthorized-error";
import { UnexpectedError } from "@/lib/errors/unexpected-error";
import { CategoryFormData } from "../../components/CategoryForm";

interface GetCategoryParams extends CategoryFormData {
  categoryId: string | undefined;
}

export async function updateCategory({
  categoryId,
  title,
  description,
  isActive,
}: GetCategoryParams) {
  try {
    const payload = {
      title,
      description,
      isActive,
    };
    await api.put(`/categories/${categoryId}`, payload);
  } catch (error: any) {
    if (error.response?.status === 401) {
      throw new UnauthorizedError();
    }
    if (error.response?.status === 404) {
      throw new NotFoundError(`Categoria com ID ${categoryId} não encontrada`);
    }
    throw new UnexpectedError();
  }
}
