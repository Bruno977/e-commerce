import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const recentOrders = [
  {
    id: "#1234",
    customer: "João Silva",
    total: 299.99,
    status: "Pendente",
  },
  {
    id: "#1235",
    customer: "Maria Santos",
    total: 1299.99,
    status: "Enviado",
  },
  {
    id: "#1236",
    customer: "Pedro Costa",
    total: 599.99,
    status: "Entregue",
  },
  {
    id: "#1237",
    customer: "Ana Oliveira",
    total: 89.99,
    status: "Processando",
  },
]

export default function RecentOrders() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Pedidos Recentes</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentOrders.map((order) => (
            <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <div className="font-medium">{order.id}</div>
                <div className="text-sm text-gray-600">{order.customer}</div>
              </div>
              <div className="text-right">
                <div className="font-medium">R$ {order.total.toFixed(2)}</div>
                <Badge
                  variant={
                    order.status === "Entregue"
                      ? "default"
                      : order.status === "Enviado"
                        ? "secondary"
                        : order.status === "Processando"
                          ? "outline"
                          : "destructive"
                  }
                >
                  {order.status}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
