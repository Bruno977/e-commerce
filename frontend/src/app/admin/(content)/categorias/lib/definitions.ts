import { z } from "zod";

export const CategoryFormSchema = z.object({
  title: z
    .string()
    .min(3, { message: "Deve conter no minimo 3 caracteres" })
    .trim(),
  description: z
    .string()
    .min(5, { message: "Deve conter no minimo 5 caracteres" })
    .trim(),
  isActive: z.boolean(),
  image: z.instanceof(File).optional(),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
});
