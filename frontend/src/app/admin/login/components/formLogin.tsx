"use client";
import { useState } from "react";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Eye, EyeOff, Mail, Lock, Loader2Icon } from "lucide-react";
import { createSession } from "../lib/actions/create-session";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SessionFormSchema } from "../lib/definitions";
import { useMutation } from "@tanstack/react-query";
import { ErrorInputForm } from "@/components/ui/error-message";
import { useRouter } from "next/navigation";

export type SessionFormData = z.infer<typeof SessionFormSchema>;

export function FormLogin() {
  const [showPassword, setShowPassword] = useState(false);
  const [generalError, setGeneralError] = useState<string | null>(null);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(SessionFormSchema),
  });

  const sessionMutation = useMutation({
    mutationFn: createSession,
    onSuccess: () => {
      router.push("/admin/dashboard");
    },
    onError: (error: any) => {
      setGeneralError(error.message || "Tente novamente mais tarde.");
    },
  });

  const onSubmit = (data: SessionFormData) => {
    sessionMutation.mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <Label htmlFor="email">Email</Label>
        <div className="relative mt-1">
          <Mail
            className={`absolute left-3 top-1/2 transform -translate-y-1/2  w-4 h-4 ${
              errors?.email ? "text-red-800" : "text-gray-400"
            }`}
          />
          <Input
            {...register("email")}
            className={`pl-10 ${
              errors?.email ? "border-red-300 placeholder:text-red-800" : ""
            }`}
            placeholder="exemplo@exemplo.com.br"
          />
        </div>
        {errors.email?.message && (
          <ErrorInputForm message={errors.email?.message} />
        )}
      </div>

      <div>
        <Label htmlFor="password">Senha</Label>
        <div className="relative mt-1">
          <Lock
            className={`absolute left-3 top-1/2 transform -translate-y-1/2  w-4 h-4 ${
              errors?.password ? "text-red-800" : "text-gray-400"
            }`}
          />
          <Input
            {...register("password")}
            type={showPassword ? "text" : "password"}
            className={`pl-10 pr-10 ${
              errors?.password ? "border-red-300 placeholder:text-red-800" : ""
            }`}
            placeholder="Sua senha de administrador"
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <EyeOff className="w-4 h-4" />
            ) : (
              <Eye className="w-4 h-4" />
            )}
          </button>
        </div>
        {errors.password?.message && (
          <ErrorInputForm message={errors.password?.message} />
        )}
        {generalError && (
          <div className="text-red-600 text-sm mt-2 mb-4">{generalError}</div>
        )}
      </div>

      <Button
        disabled={sessionMutation.isPending}
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 cursor-pointer"
      >
        {sessionMutation.isPending && <Loader2Icon className="animate-spin" />}
        Acessar Painel
      </Button>
    </form>
  );
}
