import Pad from "@/components/Pad";
import MapSection from "@/containers/MapSection";
import PropertySection from "@/containers/PropertySection";
import { getClient } from "@/graphql/client";
import { GetPropertyQuery } from "@/graphql/queries";
import { gql } from "@apollo/client";

interface PropertyPageProps {
  params: Promise<{ slug: string }>;
}

const getProperty = async (slug: string) => {
  const { data } = await getClient().query<GetPropertyQuery>({
    query: gql`
      query GetProperty($slug: String!) {
        propertyBySlug(slug: $slug) {
          # Use the variable here
          id
          title
          description
          place
          type
          status
          price
          lat
          long
          num_bedrooms
          images {
            id
            url
          }
        }
      }
    `,
    variables: {
      slug,
    },
  });

  return data;
};

export default async function PropertyPage({ params }: PropertyPageProps) {
  const { slug } = await params;
  console.log({ slug });
  const { propertyBySlug } = await getProperty(slug);
  console.log({ propertyBySlug });
  return (
    <>
      <PropertySection property={propertyBySlug} />
      <Pad amt={30} />
      <MapSection
        lat={propertyBySlug.lat || 0}
        long={propertyBySlug.long || 0}
      />
    </>
  );
}
