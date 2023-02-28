import { Shopify } from "@shopify/shopify-api";

const CREATE_CUSTOMER_MUTATION = `
  mutation CREATE_CUSTOMER_MUTATION($input: CustomerInput!) {
    customerCreate(input: $input) {
      customer {
        email
      }
    }
  }
`;

export default async function customerCreator(session, info) {
  const client = new Shopify.Clients.Graphql(session.shop, session.accessToken);

  try {
    const rs = await client.query({
      data: {
        query: CREATE_CUSTOMER_MUTATION,
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
