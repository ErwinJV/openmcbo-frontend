import AdecuacionCard from "@/components/AdecuacionCard";
import ProviderCategoryBanner from "@/containers/ProviderCategoryBanner";
import { getClient } from "@/graphql/client";
import { Product } from "@/graphql/generated-types";
import { gql } from "@apollo/client";
import Link from "next/link";
import { IoArrowForward } from "react-icons/io5";

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

const getFeaturedAdecuaciones = async () => {
  if (!process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT) {
    return { products: { items: [], total: 0 } };
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
                name
              }
              tenant {
                id
                name
                logo
              }
            }
            total
          }
        }
      `,
      variables: {
        pagination: { limit: 12, offset: 0, order: "DESC" },
      },
    });

    return data;
  } catch (error) {
    console.error("Error fetching featured adecuaciones:", error);
    return { products: { items: [], total: 0 } };
  }
};

export default async function HomeAdecuacionesSection() {
  const { products } = await getFeaturedAdecuaciones();

  if (!products.items || products.items.length === 0) {
    return null;
  }

  const groups = groupByProvider(products.items);
  const displayGroups = groups.slice(0, 2);

  return (
    <section className="w-full py-12 md:py-16 bg-white">
      <div className="w-9/10 md:w-170 xl:w-282 mx-auto">
        <h2 className="text-[#D9A300] text-center text-lg md:text-xl uppercase">
          Adecuaciones para el hogar
        </h2>
        <h3 className="text-3xl md:text-5xl xl:text-6xl font-extrabold text-[#003593] text-center mt-2">
          Todo para mejorar tu hogar
        </h3>
        <p className="text-[#8F909A] text-xl md:text-2xl text-center mt-4 mb-10">
          Encuentra materiales, muebles y servicios en tiendas verificadas
        </p>

        {displayGroups.map((group) => (
          <div key={group.tenantId} className="mb-10">
            <ProviderCategoryBanner
              tenantName={group.tenantName}
              tenantLogo={group.tenantLogo}
              categoryName="Adecuaciones"
            />
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 mt-4">
              {group.products.slice(0, 4).map((product) => (
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

        <div className="flex justify-center mt-10">
          <Link
            href="/adecuaciones"
            className="inline-flex items-center gap-2 bg-[#D9A300] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#c49100] transition-colors"
          >
            Ver todas las adecuaciones
            <IoArrowForward />
          </Link>
        </div>
      </div>
    </section>
  );
}
