import { CodegenConfig } from "@graphql-codegen/cli";
import dotenv from "dotenv";
dotenv.config({ path: ".env" });

const config: CodegenConfig = {
  schema: `${process.env["NEXT_PUBLIC_GRAPHQL_ENDPOINT"]}`,
  documents: ["src/graphql/**/*.ts"],
  ignoreNoDocuments: true,
  generates: {
    "./src/graphql/generated-types.ts": {
      plugins: ["typescript", "typescript-operations"],
      config: {
        skipTypename: true,
        withHooks: true,
      },
    },
  },
};

export default config;
