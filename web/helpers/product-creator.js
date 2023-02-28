import { Shopify } from "@shopify/shopify-api";

export const DEFAULT_PRODUCTS_COUNT = 5;
const CREATE_PRODUCTS_MUTATION = `
  mutation populateProduct($input: ProductInput!) {
    productCreate(input: $input) {
      product {
        id
      }
    }
  }
`;

export default async function productCreator(session, input) {
  const client = new Shopify.Clients.Graphql(session.shop, session.accessToken);

  try {
    return await client.query({
      data: {
        query: CREATE_PRODUCTS_MUTATION,
        variables: {
          input,
        },
      },
    });
  } catch (error) {
    if (error instanceof Shopify.Errors.GraphqlQueryError) {
      throw new Error(
        `${error.message}\n${JSON.stringify(error.response, null, 2)}`
      );
    } else {
      throw error;
    }
  }
}
