import gql from "graphql-tag";

import makeQuery from "@saleor/hooks/makeQuery";
import { pageInfoFragment } from "../queries";
import {
  CategoryDetails,
  CategoryDetailsVariables
} from "./types/CategoryDetails";
import { RootCategories } from "./types/RootCategories";

// export const categoryFragment = gql`
//   fragment BusinessCategoryFragment on BusinessCategory {
//     id
//     name
//     children {
//       totalCount
//     }
//     products {
//       totalCount
//     }
//   }
// `;
export const categoryDetailsFragment = gql`
  fragment BusinessCategoryFragment on BusinessCategory {
    id
    backgroundImage {
      alt
      url
    }
    name
    description
    seoDescription
    seoTitle
  }
`;

// $filter: CategoryFilterInput
// $sort: CategorySortingInput

// filter: $filter
// sortBy: $sort

export const rootCategories = gql`
  ${categoryDetailsFragment}
  ${pageInfoFragment}
  query BusinessCategories(
    $first: Int
    $after: String
    $last: Int
    $before: String
    $search: String
  ) {
    businessCategories(
      first: $first
      after: $after
      last: $last
      before: $before
      search: $search
    ) {
      edges {
        node {
          ...BusinessCategoryFragment
        }
      }
      pageInfo {
        ...PageInfoFragment
      }
    }
  }
`;
export const useRootCategoriesQuery = makeQuery<RootCategories, {}>(
  rootCategories
);

export const categoryDetails = gql`
  ${categoryDetailsFragment}
  query BusinessCategoryDetails(
    $id: ID!
  ) {
    businessCategoriesDetails(id: $id) {
      ...BusinessCategoryFragment
    }
  }
`;
export const useCategoryDetailsQuery = makeQuery<
  CategoryDetails,
  CategoryDetailsVariables
>(categoryDetails);
