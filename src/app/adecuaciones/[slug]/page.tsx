import ProductDetails from "@/components/ProductDetails";
import ProductGallery from "@/components/ProductGallery";

import { getClient } from "@/graphql/client";
import { Product } from "@/graphql/generated-types";
import { gql } from "@apollo/client";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { MdCheck } from "react-icons/md";

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
            tenant {
              id
              name
              website
            }
            details
            status
            mainImageUrl
            brand {
              id
              name
              logoUrl
              slug
            }
            subcategory {
              id
              name
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
        query GetRelatedAdecuaciones(
          $filters: ProductFiltersInput
          $pagination: PaginationDto
        ) {
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
    description:
      adecuacion.description || `Encuentra ${adecuacion.name} en OpenMCBO`,
  };
}

export default async function AdecuacionPage({ params }: AdecuacionPageProps) {
  const { slug } = await params;
  const adecuacion = await getAdecuacion(slug);

  if (!adecuacion) {
    notFound();
  }
  const mainImage = { src: adecuacion.mainImageUrl!, alt: adecuacion.name };
  const galleryImages = adecuacion.images?.map((image) => ({
    src: image.url,
    alt: image.url!,
  }));

  if (!galleryImages) {
    notFound();
  }

  const specs = Object.keys(adecuacion.details || {}).map((key) => ({
    label: key,
    value: adecuacion.details[key],
    icon: <MdCheck />,
  }));
  const relatedAdecuaciones = adecuacion.brand?.id
    ? await getRelatedAdecuaciones(adecuacion.brand.id, slug)
    : [];

  console.log({ tenant: adecuacion.tenant });

  return (
    <main className="flex-grow flex flex-col justify-center py-8 lg:py-12">
      <div className="max-w-[1320px] w-full mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center ">
          <ProductGallery images={[mainImage, ...galleryImages]} />
          <ProductDetails
            brand={adecuacion.brand.name}
            category={adecuacion.subcategory.name}
            title={adecuacion.name}
            specs={specs}
            storeUrl={adecuacion.tenant.website || ""}
          />
        </div>
      </div>
    </main>
  );
}
