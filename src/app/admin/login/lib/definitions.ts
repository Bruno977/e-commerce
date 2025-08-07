import { z } from "zod";

export const SessionFormSchema = z.object({
  email: z.string().email({ message: "Informe um e-mail válido" }).trim(),
  password: z
    .string()
    .min(8, { message: "Senha deve conter no minimo 8 caracteres" })
    .trim(),
});

export type FormState =
  | {
      errors?: {
        email?: string[];
        password?: string[];
        general?: string[];
      };
      message?: string;
    }
  | undefined;
