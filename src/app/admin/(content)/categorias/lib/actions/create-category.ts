"use server";
import { UnauthorizedError } from "@/lib/errors/unauthorized-error";
import { api } from "../../../../config/api";
import { CategoryFormData } from "../../components/CategoryForm";

export async function createCategory({
  title,
  description,
  isActive,
}: CategoryFormData) {
  try {
    await api.post("/categories", {
      title,
      description,
      isActive,
    });
  } catch (error: any) {
    if (error?.response?.data?.statusCode === 401) {
      throw new UnauthorizedError();
    }
    throw error;
  }
}
