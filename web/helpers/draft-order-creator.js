import { Shopify } from "@shopify/shopify-api";

const CREATE_ORDER_MUTATION = `
  mutation CREATE_ORDER_MUTATION($input: DraftOrderInput!) {
    draftOrderCreate(input: $input) {
      draftOrder {
        id
      }
    }
  }
`;

export default async function draftOrderCreator(session, info) {
  const client = new Shopify.Clients.Graphql(session.shop, session.accessToken);

  try {
    const rs = await client.query({
      data: {
        query: CREATE_ORDER_MUTATION,
        variables: {
          input: info,
        },
      },
    });

    return rs;
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
