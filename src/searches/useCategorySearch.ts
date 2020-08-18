import gql from "graphql-tag";

import makeTopLevelSearch from "@saleor/hooks/makeTopLevelSearch";
import { pageInfoFragment } from "@saleor/queries";
import {
  SearchCategories,
  SearchCategoriesVariables
} from "./types/SearchCategories";

export const searchCategories = gql`
  ${pageInfoFragment}
  query SearchCategories($after: String, $first: Int!, $query: String!, $store: ID) {
    search: categories(
      after: $after
      first: $first
      filter: { search: $query, store: $store }
    ) {
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

export default makeTopLevelSearch<SearchCategories, SearchCategoriesVariables>(
  searchCategories
);
