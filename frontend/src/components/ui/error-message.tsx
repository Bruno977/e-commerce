"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AlertTriangle, RefreshCw, WifiOff } from "lucide-react";

interface ErrorMessageProps {
  title?: string;
  message?: string;
  type?: "network" | "server" | "notFound" | "generic";
  onRetry?: () => void;
  showRetry?: boolean;
}

export function ErrorMessage({
  title,
  message,
  type = "generic",
  onRetry,
  showRetry = true,
}: ErrorMessageProps) {
  const getErrorConfig = () => {
    switch (type) {
      case "network":
        return {
          icon: WifiOff,
          title: title || "Problema de Conexão",
          message:
            message ||
            "Verifique sua conexão com a internet e tente novamente.",
          color: "text-orange-600",
          bgColor: "bg-orange-100",
        };
      case "server":
        return {
          icon: AlertTriangle,
          title: title || "Erro do Servidor",
          message:
            message ||
            "Nossos servidores estão temporariamente indisponíveis. Tente novamente em alguns minutos.",
          color: "text-red-600",
          bgColor: "bg-red-100",
        };
      case "notFound":
        return {
          icon: AlertTriangle,
          title: title || "Não Encontrado",
          message:
            message ||
            "O conteúdo que você está procurando não foi encontrado.",
          color: "text-gray-600",
          bgColor: "bg-gray-100",
        };
      default:
        return {
          icon: AlertTriangle,
          title: title || "Algo deu errado",
          message: message || "Ocorreu um erro inesperado. Tente novamente.",
          color: "text-red-600",
          bgColor: "bg-red-100",
        };
    }
  };

  const config = getErrorConfig();
  const Icon = config.icon;

  return (
    <div className="flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div
            className={`mx-auto w-12 h-12 ${config.bgColor} rounded-full flex items-center justify-center mb-4`}
          >
            <Icon className={`w-6 h-6 ${config.color}`} />
          </div>
          <CardTitle className={config.color}>{config.title}</CardTitle>
          <CardDescription>{config.message}</CardDescription>
        </CardHeader>
        {showRetry && onRetry && (
          <CardContent>
            <Button
              onClick={onRetry}
              className="w-full bg-transparent cursor-pointer"
              variant="outline"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Tentar novamente
            </Button>
          </CardContent>
        )}
      </Card>
    </div>
  );
}

export function InlineError({
  message,
  onRetry,
}: {
  message: string;
  onRetry?: () => void;
}) {
  return (
    <div className="flex items-center justify-center p-4 border border-red-200 bg-red-50 rounded-lg">
      <div className="flex items-center space-x-3">
        <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0" />
        <div className="flex-1">
          <p className="text-sm text-red-800">{message}</p>
        </div>
        {onRetry && (
          <Button
            size="sm"
            variant="outline"
            onClick={onRetry}
            className="flex-shrink-0 bg-transparent"
          >
            <RefreshCw className="w-3 h-3 mr-1" />
            Tentar
          </Button>
        )}
      </div>
    </div>
  );
}

export function ErrorInputForm({ message }: { message: string }) {
  return <p className="text-red-600 pt-0.5 text-xs">{message}</p>;
}
