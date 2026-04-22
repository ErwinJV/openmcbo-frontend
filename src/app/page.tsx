import Pad from "@/components/Pad";
import WhatWeDo from "@/components/WhatWeDo";
import AvailableOptions from "@/containers/AvailableOptions";
import LastPosts from "@/containers/LastPosts";
import MainHero from "@/containers/MainHero";
import OurServices from "@/containers/OurServices";

import { getClient } from "@/graphql/client";
import { GetPropertiesQuery } from "@/graphql/queries";
import { gql } from "@apollo/client";

const lastProperties = async () => {
  const { data } = await getClient().query<GetPropertiesQuery>({
    query: gql`
        query {
          properties(paginationDto: { limit:${50}, offset: 0, order: "DESC" }) {
            properties {
              id
              title
              price
              slug
              description
              main_picture_url
              images {
                id
                url
              }
            }
            
          }
        }
      `,
  });

  return data;
};

export default async function Home() {
  const { properties } = await lastProperties();
  return (
    <>
      <MainHero />
      <Pad amt={30} />
      <LastPosts />
      <Pad amt={70} />
      <AvailableOptions properties={properties.properties} />
      <Pad amt={70} />
      <OurServices />
      <Pad amt={50} />
      <WhatWeDo />
    </>
  );
}
