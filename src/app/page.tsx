import Button from "@/components/Button";
import Chip from "@/components/Chip";

import { getClient } from "@/graphql/client";
import { GetPropertiesQuery } from "@/graphql/queries";
import { gql } from "@apollo/client";
import { IoArrowBack, IoArrowForward } from "react-icons/io5";

const loadData = async () => {
  const { data } = await getClient().query<GetPropertiesQuery>({
    query: gql`
        query {
          properties(paginationDto: { limit:${10}, offset: 0, order: "DESC" }) {
            properties {
              id
              title
            }
            total
          }
        }
      `,
  });

  return data;
};

export default async function Home() {
  const data = await loadData();
  return (
    <div>
      <h1 className="text-2xl">Hola Mundo</h1>
      {JSON.stringify(data.properties.properties, null, 2)}

      <Button
        leftIcon={<IoArrowBack />}
        size="medium"
        variant="filled"
        text="Enabled"
        rightIcon={<IoArrowForward />}
      />
      <Chip label="Delete" />
    </div>
  );
}
