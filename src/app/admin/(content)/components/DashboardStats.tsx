import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, TrendingDown, DollarSign, ShoppingCart, Users, Package } from "lucide-react"

const stats = [
  {
    title: "Receita Total",
    value: "R$ 45.231,89",
    change: "+20.1%",
    trend: "up",
    icon: DollarSign,
  },
  {
    title: "Pedidos",
    value: "1.234",
    change: "+15.3%",
    trend: "up",
    icon: ShoppingCart,
  },
  {
    title: "Clientes",
    value: "2.456",
    change: "+8.2%",
    trend: "up",
    icon: Users,
  },
  {
    title: "Produtos",
    value: "567",
    change: "-2.4%",
    trend: "down",
    icon: Package,
  },
]

export default function DashboardStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => {
        const Icon = stat.icon
        const TrendIcon = stat.trend === "up" ? TrendingUp : TrendingDown

        return (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">{stat.title}</CardTitle>
              <Icon className="w-4 h-4 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className={`flex items-center text-xs ${stat.trend === "up" ? "text-green-600" : "text-red-600"}`}>
                <TrendIcon className="w-3 h-3 mr-1" />
                {stat.change} em relação ao mês anterior
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
