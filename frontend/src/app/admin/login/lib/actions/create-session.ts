"use server";
import { cookies } from "next/headers";
import { api } from "../../../config/api";
import { encrypt } from "../../../../../lib/actions/encrypt";

import { SessionFormData } from "../../components/formLogin";
import { UnauthorizedError } from "@/lib/errors/unauthorized-error";

export async function createSession(formData: SessionFormData) {
  const { email, password } = formData;

  try {
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    const response = await api.post("/sessions", {
      email,
      password,
    });
    const { access_token } = response.data;
    const session = await encrypt({ access_token, expiresAt });
    const cookieStore = await cookies();
    cookieStore.set("session", session, {
      httpOnly: true,
      secure: true,
      expires: expiresAt,
      sameSite: "lax",
      path: "/",
    });
  } catch (error: any) {
    if (error.response?.data?.statusCode === 401) {
      throw new UnauthorizedError("Email ou senha inválidos");
    }
    throw error;
  }
}
