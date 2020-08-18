import gql from "graphql-tag";

import makeTopLevelSearch from "@saleor/hooks/makeTopLevelSearch";
import { pageInfoFragment } from "@saleor/queries";
import {
  SearchProductTypes,
  SearchProductTypesVariables
} from "./types/SearchProductTypes";

export const searchProductTypes = gql`
  ${pageInfoFragment}
  query SearchProductTypes($after: String, $first: Int!, $query: String!, $store: ID) {
    search: productTypes(
      after: $after
      first: $first
      filter: { search: $query, store: $store }
    ) {
      edges {
        node {
          id
          name
          hasVariants
          productAttributes {
            id
            inputType
            slug
            name
            valueRequired
            values {
              id
              name
              slug
            }
          }
        }
      }
      pageInfo {
        ...PageInfoFragment
      }
    }
  }
`;

export default makeTopLevelSearch<
  SearchProductTypes,
  SearchProductTypesVariables
>(searchProductTypes);
