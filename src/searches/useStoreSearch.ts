import gql from "graphql-tag";

import makeTopLevelSearch from "@saleor/hooks/makeTopLevelSearch";
import { pageInfoFragment } from "@saleor/queries";
import {
  SearchProducts,
  SearchProductsVariables
} from "./types/SearchProducts";

export const searchProducts = gql`
  ${pageInfoFragment}
  query SearchStores($after: String, $first: Int!, $query: String!) {
    stores(after: $after, first: $first, search: $query) {
      edges {
        node {
          id
          name
        }
      }
      pageInfo {
        ...PageInfoFragment
      }
    }
  }
`;

export default makeTopLevelSearch<SearchProducts, SearchProductsVariables>(
  searchProducts
);
