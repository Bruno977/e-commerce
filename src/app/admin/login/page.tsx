import type React from "react";

import Link from "next/link";

import { Card, CardContent } from "@/components/ui/card";
import { Shield } from "lucide-react";
import { FormLogin } from "./components/formLogin";

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 bg-blue-600 rounded-lg flex items-center justify-center">
            <Shield className="h-6 w-6 text-white" />
          </div>
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            Painel Administrativo
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Acesso restrito para administradores
          </p>
        </div>

        <Card className="shadow-xl">
          <CardContent className="p-6">
            <FormLogin />

            <div className="mt-6 text-center">
              <Link
                href="/"
                className="text-sm text-blue-600 hover:text-blue-500"
              >
                ← Voltar para a loja
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
