import AdecuacionCard from "@/components/AdecuacionCard";
import { Product } from "@/graphql/generated-types";

interface AdecuacionesGridProps {
  products: Product[];
}

export default function AdecuacionesGrid({ products }: AdecuacionesGridProps) {
  if (!products || products.length === 0) {
    return (
      <div className="w-full flex flex-col items-center justify-center py-20">
        <p className="text-[#8F909A] text-xl text-center">
          No se encontraron adecuaciones.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
      {products.map((product) => (
        <AdecuacionCard
          key={product.id}
          id={product.id}
          name={product.name}
          slug={product.slug}
          mainImageUrl={product.mainImageUrl}
          brandName={product.brand?.name}
          tenantName={product.tenant?.name}
        />
      ))}
    </div>
  );
}
