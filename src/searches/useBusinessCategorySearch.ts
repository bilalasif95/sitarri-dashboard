import gql from "graphql-tag";

import makeTopLevelBusinessCategorySearch from "@saleor/hooks/makeTopLevelBusinessCategorySearch";
import { pageInfoFragment } from "@saleor/queries";
import {
  SearchBusinessCategories,
  SearchBusinessCategoriesVariables
} from "./types/SearchBusinessCategories";

export const searchCategories = gql`
  ${pageInfoFragment}
  query SearchBusinessCategories($after: String, $first: Int!, $query: String!) {
    businessCategories(
      after: $after
      first: $first
      search: $query
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

export default makeTopLevelBusinessCategorySearch<SearchBusinessCategories, SearchBusinessCategoriesVariables>(
  searchCategories
);
