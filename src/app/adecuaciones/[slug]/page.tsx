import Pad from "@/components/Pad";
import AdecuacionGallery from "@/containers/AdecuacionGallery";
import AdecuacionInfo from "@/containers/AdecuacionInfo";
import ProviderInfo from "@/containers/ProviderInfo";
import RelatedAdecuaciones from "@/containers/RelatedAdecuaciones";
import { getClient } from "@/graphql/client";
import { Product } from "@/graphql/generated-types";
import { gql } from "@apollo/client";
import { Metadata } from "next";
import { notFound } from "next/navigation";

interface AdecuacionPageProps {
  params: Promise<{ slug: string }>;
}

const getAllAdecuacionSlugs = async () => {
  if (!process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT) {
    return [];
  }

  try {
    const { data } = await getClient().query<{
      products: { items: { slug?: string | null }[] };
    }>({
      query: gql`
        query GetAdecuacionSlugs($pagination: PaginationDto) {
          products(pagination: $pagination) {
            items {
              slug
            }
          }
        }
      `,
      variables: {
        pagination: { limit: 100, offset: 0 },
      },
    });

    return data.products.items
      .filter((item) => item.slug)
      .map((item) => ({ slug: item.slug as string }));
  } catch (error) {
    console.error("Error fetching adecuacion slugs:", error);
    return [];
  }
};

export async function generateStaticParams() {
  const slugs = await getAllAdecuacionSlugs();
  if (slugs.length === 0) {
    return [{ slug: "placeholder" }];
  }
  return slugs;
}

const getAdecuacion = async (slug: string) => {
  if (!process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT) {
    return null;
  }

  try {
    const { data } = await getClient().query<{
      productBySlug: Product;
    }>({
      query: gql`
        query GetAdecuacionBySlug($slug: String!) {
          productBySlug(slug: $slug) {
            id
            name
            slug
            description
            details
            status
            mainImageUrl
            brand {
              id
              name
              logoUrl
              slug
            }
            images {
              url
              alt
              filename
            }
            created_at
            updated_at
          }
        }
      `,
      variables: { slug },
    });

    return data.productBySlug;
  } catch (error) {
    console.error(`Error fetching adecuacion ${slug}:`, error);
    return null;
  }
};

const getRelatedAdecuaciones = async (brandId: string, excludeSlug: string) => {
  if (!process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT) {
    return [];
  }

  try {
    const { data } = await getClient().query<{
      products: { items: Product[] };
    }>({
      query: gql`
        query GetRelatedAdecuaciones($filters: ProductFiltersInput, $pagination: PaginationDto) {
          products(filters: $filters, pagination: $pagination) {
            items {
              id
              name
              slug
              mainImageUrl
              brand {
                name
              }
              tenant {
                name
              }
            }
          }
        }
      `,
      variables: {
        filters: { brandId },
        pagination: { limit: 4, offset: 0 },
      },
    });

    return data.products.items.filter((item) => item.slug !== excludeSlug);
  } catch (error) {
    console.error("Error fetching related adecuaciones:", error);
    return [];
  }
};

export async function generateMetadata({
  params,
}: AdecuacionPageProps): Promise<Metadata> {
  const { slug } = await params;
  const adecuacion = await getAdecuacion(slug);

  if (!adecuacion) {
    return {
      title: "Adecuación no encontrada | OpenMCBO",
    };
  }

  return {
    title: `${adecuacion.name} | OpenMCBO`,
    description: adecuacion.description || `Encuentra ${adecuacion.name} en OpenMCBO`,
  };
}

export default async function AdecuacionPage({ params }: AdecuacionPageProps) {
  const { slug } = await params;
  const adecuacion = await getAdecuacion(slug);

  if (!adecuacion) {
    notFound();
  }

  const relatedAdecuaciones = adecuacion.brand?.id
    ? await getRelatedAdecuaciones(adecuacion.brand.id, slug)
    : [];

  return (
    <main className="w-full min-h-screen bg-white">
      <section className="w-9/10 md:w-170 xl:w-282 mx-auto pt-8 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          <div>
            <AdecuacionGallery
              images={adecuacion.images || []}
              mainImageUrl={adecuacion.mainImageUrl}
              adecuacionName={adecuacion.name}
            />
          </div>
          <div className="flex flex-col gap-6">
            <AdecuacionInfo
              name={adecuacion.name}
              description={adecuacion.description}
              details={adecuacion.details as Record<string, any> | null}
              brandName={adecuacion.brand?.name}
              brandLogoUrl={adecuacion.brand?.logoUrl}
            />
            <ProviderInfo
              tenantName={null}
              tenantLogo={null}
              productName={adecuacion.name}
              tenantWebsite={null}
            />
          </div>
        </div>

        <Pad amt={50} />
        <RelatedAdecuaciones products={relatedAdecuaciones} />
      </section>
    </main>
  );
}
