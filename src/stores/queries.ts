import gql from "graphql-tag";

import makeQuery from "@saleor/hooks/makeQuery";
import { pageInfoFragment, TypedQuery } from "../queries";
import {
  CategoryDetails,
  CategoryDetailsVariables
} from "./types/CategoryDetails";
import { RootCategories } from "./types/RootCategories";
import {
  ProductImageById,
  ProductImageByIdVariables
} from "./types/ProductImageById";

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
  fragment StoreDetailsFragment on Store {
      id
      name
      description
      address {
        streetAddress
        city
        postalCode
        country {
          code
          country
        }
      }
      category
      status
      mondayOpeningTime
      mondayOpeningStatus
      mondayClosingTime
      tuesdayOpeningStatus
      tuesdayOpeningTime
      tuesdayClosingTime
      wednesdayOpeningStatus
      wednesdayOpeningTime
      wednesdayClosingTime
      thursdayOpeningStatus
      thursdayOpeningTime
      thursdayClosingTime
      fridayOpeningStatus
      fridayOpeningTime
      fridayClosingTime
      saturdayOpeningStatus
      saturdayOpeningTime
      saturdayClosingTime
      sundayOpeningStatus
      sundayOpeningTime
      sundayClosingTime
      business {
        id
        name
      }
      logo
      phone
      images {
        url
        id
        alt
      }
      tags {
        name
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
    $search: String
    $sort: StoreOrder
  ) {
    stores(
      first: $first
      after: $after
      last: $last
      before: $before
      sortBy: $sort
      search: $search
    ) {
      edges {
        node {
          id
          name
          address {
            streetAddress
            streetAddress2
            city
            country{
              code
            }
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
      seoTitle
      seoDescription
      rating
      address {
        streetAddress
        streetAddress2
        city
        postalCode
        country {
          code
          country
        }
      }
      business {
        id
        name
        logo
        businesscategory{
          id
          name
        }
        websiteUrl
        facebookUrl
        twitterUrl
        instagramUrl
        deliverooUrl
        uberEatsUrl
      }
      status
      mondayOpeningTime
      mondayOpeningStatus
      mondayClosingTime
      tuesdayOpeningStatus
      tuesdayOpeningTime
      tuesdayClosingTime
      wednesdayOpeningStatus
      wednesdayOpeningTime
      wednesdayClosingTime
      thursdayOpeningStatus
      thursdayOpeningTime
      thursdayClosingTime
      fridayOpeningStatus
      fridayOpeningTime
      fridayClosingTime
      saturdayOpeningStatus
      saturdayOpeningTime
      saturdayClosingTime
      sundayOpeningStatus
      sundayOpeningTime
      sundayClosingTime
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
      productss(first: $first, after: $after, last: $last, before: $before) {
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
          }
        }
      }
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

const productImageQuery = gql`
  query StoreImageById($productId: ID!, $imageId: ID!) {
    store(id: $productId) {
      id
      name
      mainImage: imageById(id: $imageId) {
        id
        alt
        url
      }
      images {
        id
        url(size: 48)
      }
    }
  }
`;
export const TypedProductImageQuery = TypedQuery<
  ProductImageById,
  ProductImageByIdVariables
>(productImageQuery);
