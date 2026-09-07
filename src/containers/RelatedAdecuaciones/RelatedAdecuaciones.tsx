import AdecuacionCard from "@/components/AdecuacionCard";
import { Product } from "@/graphql/generated-types";

interface RelatedAdecuacionesProps {
  products: Product[];
}

export default function RelatedAdecuaciones({ products }: RelatedAdecuacionesProps) {
  if (!products || products.length === 0) {
    return null;
  }

  return (
    <section className="w-full py-8">
      <h2 className="text-2xl md:text-3xl font-bold text-[#003593] mb-6">
        Adecuaciones relacionadas
      </h2>
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
    </section>
  );
}
