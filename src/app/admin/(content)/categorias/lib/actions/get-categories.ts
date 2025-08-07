"use server";
import { api } from "@/app/admin/config/api";

interface CategoryProps {
  page: number;
  perPage: number;
}

export async function getCategories({ page, perPage }: CategoryProps) {
  const response = await api.get(`/categories`, {
    params: {
      page,
      perPage,
    },
  });

  return response.data;
}
