import Pad from "@/components/Pad";
import AdecuacionCard from "@/components/AdecuacionCard";
import ProviderCategoryBanner from "@/containers/ProviderCategoryBanner";
import { getClient } from "@/graphql/client";
import { Product } from "@/graphql/generated-types";
import { gql } from "@apollo/client";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Adecuaciones para el Hogar | OpenMCBO",
  description:
    "Encuentra materiales, muebles, decoración y servicios para tu hogar en tiendas verificadas de Maracaibo",
};

interface ProviderGroup {
  tenantId: string;
  tenantName: string;
  tenantLogo?: string | null;
  products: Product[];
}

function groupByProvider(products: Product[]): ProviderGroup[] {
  const groups = new Map<string, ProviderGroup>();

  for (const product of products) {
    const tenant = product.tenant;
    if (!tenant) continue;

    const key = tenant.id;
    if (!groups.has(key)) {
      groups.set(key, {
        tenantId: tenant.id,
        tenantName: tenant.name,
        tenantLogo: tenant.logo,
        products: [],
      });
    }
    groups.get(key)!.products.push(product);
  }

  return Array.from(groups.values());
}

const getAdecuaciones = async () => {
  if (!process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT) {
    return { products: { items: [] as Product[], total: 0 } };
  }

  try {
    const { data } = await getClient().query<{
      products: { items: Product[]; total: number };
    }>({
      query: gql`
        query GetAdecuaciones($pagination: PaginationDto) {
          products(pagination: $pagination) {
            items {
              id
              name
              slug

              mainImageUrl
              brand {
                id
                name
                logoUrl
                slug
              }
              tenant {
                id
                name
                logo
                website
              }
              images {
                url
                alt
                filename
              }
            }
            total
          }
        }
      `,
      variables: {
        pagination: { limit: 48, offset: 0, order: "DESC" },
      },
    });

    return data;
  } catch (error) {
    console.error("Error fetching adecuaciones:", error);
    return { products: { items: [] as Product[], total: 0 } };
  }
};

export default async function AdecuacionesPage() {
  const { products } = await getAdecuaciones();
  const groups = groupByProvider(products.items);

  return (
    <main className="w-full min-h-screen bg-white">
      <section className="w-9/10 md:w-170 xl:w-282 mx-auto pt-8 pb-12">
        <h1 className="text-[#D9A300] text-center text-lg md:text-xl uppercase mb-2">
          Catálogo de adecuaciones
        </h1>
        <h2 className="text-3xl md:text-5xl xl:text-6xl font-extrabold text-[#003593] text-center mb-4">
          Todo para tu hogar
        </h2>
        <p className="text-[#8F909A] text-xl md:text-2xl text-center mb-10">
          Materiales, muebles, decoración y más de tiendas verificadas
        </p>

        {groups.length === 0 && (
          <div className="w-full flex flex-col items-center justify-center py-20">
            <p className="text-[#8F909A] text-xl text-center">
              No se encontraron adecuaciones.
            </p>
          </div>
        )}

        {groups.map((group) => (
          <div key={group.tenantId} className="mb-12">
            <ProviderCategoryBanner
              tenantName={group.tenantName}
              tenantLogo={group.tenantLogo}
              categoryName="Adecuaciones"
            />
            <Pad amt={20} />
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
              {group.products.map((product) => (
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
          </div>
        ))}
      </section>
    </main>
  );
}
