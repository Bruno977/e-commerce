import ProductGrid from "@/app/(user)/components/ProductGrid";
import ProductFilters from "@/app/(user)/components/ProductFilters";

export default function ProductsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Todos os Produtos
        </h1>
        <p className="text-gray-600">Descubra nossa coleção completa</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <aside className="lg:w-64">
          <ProductFilters />
        </aside>
        <main className="flex-1">
          <ProductGrid />
        </main>
      </div>
    </div>
  );
}
