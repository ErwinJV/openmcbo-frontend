import Button from "@/components/Button";
import Card from "@/components/Card";
import Chip from "@/components/Chip";

import { getClient } from "@/graphql/client";
import { GetPropertiesQuery } from "@/graphql/queries";
import { gql } from "@apollo/client";
import { IoArrowBack, IoArrowForward } from "react-icons/io5";

const loadData = async () => {
  const { data } = await getClient().query<GetPropertiesQuery>({
    query: gql`
        query {
          properties(paginationDto: { limit:${50}, offset: 0, order: "DESC" }) {
            properties {
              id
              title
              images {
                url
              }
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
    <div className="p-12">
      <h1 className="text-2xl">Hola Mundo</h1>
      {JSON.stringify(data.properties.properties, null, 2)}

      <Button
        // leftIcon={<IoArrowBack />}
        size="medium"
        variant="text"
        text="Enabled"
        rightIcon={<IoArrowForward />}
      />
      <Chip label="Delete" />
      <Card
        description="Lorem ipsum sit amet aes hum nases dheuas dhcn hks jdj k jdnhjak aklaeifh j hj hj hj hj h jh jkj hk jh jh jh j jh j hj hj h jh j hj hj h jh "
        price={5500}
        srcImg="https://images.unsplash.com/photo-1756302637887-1c00e98fd0cc?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        title="Lorem Ipsum amet jhj hjh jh"
        url="#"
      />
    </div>
  );
}
