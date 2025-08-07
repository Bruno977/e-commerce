"use server";

import { api } from "@/app/admin/config/api";
import { NotFoundError } from "@/lib/errors/not-found-error";
import { UnauthorizedError } from "@/lib/errors/unauthorized-error";
import { UnexpectedError } from "@/lib/errors/unexpected-error";

interface RemoveCategoryProps {
  categoryId?: string;
}

export async function removeCategory({ categoryId }: RemoveCategoryProps) {
  try {
    await api.delete(`/categories/${categoryId}`);
  } catch (error: any) {
    if (error?.response?.data?.statusCode === 401) {
      throw new UnauthorizedError(
        "Você não tem permissão para remover esta categoria."
      );
    }
    if (error?.response?.data?.statusCode === 404) {
      throw new NotFoundError(`Categoria com ID ${categoryId} não encontrada.`);
    }
    throw new UnexpectedError();
  }
}
