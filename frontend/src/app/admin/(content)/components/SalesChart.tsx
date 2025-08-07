"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function SalesChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Vendas dos Últimos 7 Dias</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64 flex items-center justify-center text-gray-500">
          Gráfico de vendas será implementado aqui
        </div>
      </CardContent>
    </Card>
  )
}
