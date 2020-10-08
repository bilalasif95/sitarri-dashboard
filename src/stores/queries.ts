import gql from "graphql-tag";

import makeQuery from "@saleor/hooks/makeQuery";
import { pageInfoFragment } from "../queries";
import {
  CategoryDetails,
  CategoryDetailsVariables
} from "./types/CategoryDetails";
import { RootCategories } from "./types/RootCategories";

export const categoryFragment = gql`
  fragment CategoryFragment on Category {
    id
    name
    children {
      totalCount
    }
    products {
      totalCount
    }
  }
`;
export const categoryDetailsFragment = gql`
  fragment CategoryDetailsFragment on Category {
    id
    backgroundImage {
      alt
      url
    }
    name
    descriptionJson
    seoDescription
    seoTitle
    parent {
      id
    }
  }
`;

export const rootCategories = gql`
  ${pageInfoFragment}
  query Stores(
    $first: Int
    $after: String
    $last: Int
    $before: String
    $sort: StoreOrder
  ) {
    stores(
      first: $first
      after: $after
      last: $last
      before: $before
      sortBy: $sort
    ) {
      edges {
        node {
          id
          name
          address {
            streetAddress
            city
          }
          business {
            id
            name
          }
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
  ${pageInfoFragment}
  query StoreDetails(
    $id: ID!
    $first: Int
    $after: String
    $last: Int
    $before: String
  ) {
    store(id: $id) {
      id
      name
      description
      address {
        streetAddress
        city
        postalCode
        country
      }
      category
      business {
        id
        name
      }
      logo
      websiteUrl
      facebookUrl
      twitterUrl
      instagramUrl
      deliverooUrl
      uberEatsUrl
      phone
      images {
        url
        id
      }
      tags {
        name
        id
      }
      openingHours
      closingHours
      storeProduct(first: $first, after: $after, last: $last, before: $before) {
        pageInfo {
          ...PageInfoFragment
        }
        edges {
          cursor
          node {
            id
            name
            basePrice {
              amount
              currency
            }
            isAvailable
            thumbnail {
              url
            }
            category {
              name
            }
            productType {
              id
              name
            }
          }
        }
      }
    }
  }
`;
export const useCategoryDetailsQuery = makeQuery<
  CategoryDetails,
  CategoryDetailsVariables
>(categoryDetails);
