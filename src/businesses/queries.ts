import gql from "graphql-tag";

import makeQuery from "@saleor/hooks/makeQuery";
import { warehouseFragment } from "@saleor/warehouses/queries";
import { pageInfoFragment, TypedQuery } from "../queries";
import {
  AvailableInGridAttributes,
  AvailableInGridAttributesVariables
} from "./types/AvailableInGridAttributes";
import {
  ProductDetails,
  ProductDetailsVariables
} from "./types/ProductDetails";
import {
  ProductImageById,
  ProductImageByIdVariables
} from "./types/ProductImageById";
import { ProductList, ProductListVariables } from "./types/ProductList";
import {
  ProductVariantCreateData,
  ProductVariantCreateDataVariables
} from "./types/ProductVariantCreateData";
import {
  ProductVariantDetails,
  ProductVariantDetailsVariables
} from "./types/ProductVariantDetails";
import {
  InitialProductFilterData,
  InitialProductFilterDataVariables
} from "./types/InitialProductFilterData";
import {
  CreateMultipleVariantsData,
  CreateMultipleVariantsDataVariables
} from "./types/CreateMultipleVariantsData";

export const stockFragment = gql`
  fragment StockFragment on Stock {
    id
    quantity
    quantityAllocated
    warehouse {
      id
      name
    }
  }
`;

export const fragmentMoney = gql`
  fragment Money on Money {
    amount
    currency
  }
`;

export const fragmentProductImage = gql`
  fragment ProductImageFragment on ProductImage {
    id
    alt
    sortOrder
    url
  }
`;

export const productFragment = gql`
  ${fragmentMoney}
  fragment ProductFragment on Product {
    id
    name
    thumbnail {
      url
    }
    isAvailable
    isPublished
    basePrice {
      ...Money
    }
    productType {
      id
      name
    }
  }
`;

const productVariantAttributesFragment = gql`
  fragment ProductVariantAttributesFragment on Product {
    id
    attributes {
      attribute {
        id
        slug
        name
        inputType
        valueRequired
        values {
          id
          name
          slug
        }
      }
      values {
        id
        name
        slug
      }
    }
    productType {
      id
      variantAttributes {
        id
        name
        values {
          id
          name
          slug
        }
      }
    }
  }
`;

export const productFragmentDetails = gql`
  fragment Business on Business {
    name
    logo
    websiteUrl
    facebookUrl
    twitterUrl
    instagramUrl
    deliverooUrl
    uberEatsUrl
  }
`;

export const fragmentVariant = gql`
  ${fragmentMoney}
  ${fragmentProductImage}
  ${stockFragment}
  fragment ProductVariant on ProductVariant {
    id
    attributes {
      attribute {
        id
        name
        slug
        valueRequired
        values {
          id
          name
          slug
        }
      }
      values {
        id
        name
        slug
      }
    }
    costPrice {
      ...Money
    }
    images {
      id
      url
    }
    name
    priceOverride {
      ...Money
    }
    product {
      id
      images {
        ...ProductImageFragment
      }
      name
      thumbnail {
        url
      }
      variants {
        id
        name
        sku
        images {
          id
          url
        }
      }
    }
    sku
    stocks {
      ...StockFragment
    }
    trackInventory
  }
`;

const initialProductFilterDataQuery = gql`
  query InitialProductFilterData(
    $categories: [ID!]
    $collections: [ID!]
    $productTypes: [ID!]
  ) {
    attributes(first: 100, filter: { filterableInDashboard: true }) {
      edges {
        node {
          id
          name
          slug
          values {
            id
            name
            slug
          }
        }
      }
    }
    categories(first: 100, filter: { ids: $categories }) {
      edges {
        node {
          id
          name
        }
      }
    }
    businessCategories(first: 100) {
      edges {
        node {
          id
          name
        }
      }
    }
    collections(first: 100, filter: { ids: $collections }) {
      edges {
        node {
          id
          name
        }
      }
    }
    productTypes(first: 100, filter: { ids: $productTypes }) {
      edges {
        node {
          id
          name
        }
      }
    }
  }
`;
export const useInitialProductFilterDataQuery = makeQuery<
  InitialProductFilterData,
  InitialProductFilterDataVariables
>(initialProductFilterDataQuery);

const productListQuery = gql`
  query BusinessesList(
    $first: Int
    $search: String
    $sort: BusinessSortingInput
    $filter: BusinessFilterInput
  ) {
    businesses(first: $first,search: $search,sortBy: $sort, filter: $filter) {
      edges {
        node {
          id
          name
          logo
          isVerified
          websiteUrl
          user(first:100) {
            edges {
              node {
                isSuperuser
                email
              }
            }
          }
        }
      }
      pageInfo {
        hasPreviousPage
        hasNextPage
        startCursor
        endCursor
      }
    }
    businessCategories(first: 100) {
      edges {
        node {
          id
          name
        }
      }
    }
  }
`;
export const TypedProductListQuery = TypedQuery<
  ProductList,
  ProductListVariables
>(productListQuery);

const productDetailsQuery = gql`
  ${pageInfoFragment}
  ${fragmentMoney}
  query BusinessDetails($id: ID!) {
    business(id: $id) {
      id
      name
      description
      logo
      websiteUrl
      facebookUrl
      twitterUrl
      deliverooUrl
      isVerified
      uberEatsUrl
      instagramUrl
      businesscategory{
        id
        name
      }
      businessStore(first: 100) {
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
      productCategoryBusiness(first:100) {
        edges {
          node {
            id
            name
            products(first:100) {
              totalCount
            }
          }
        }
        pageInfo {
          ...PageInfoFragment
        }
      }
      businessProduct(first:100) {
        edges {
          node {
            id
            name
            isPublished
            basePrice {
              ...Money
            }
            category {
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
    businessCategories(first: 100) {
      edges {
        node {
          id
          name
        }
      }
    }
  }
`;
export const TypedProductDetailsQuery = TypedQuery<
  ProductDetails,
  ProductDetailsVariables
>(productDetailsQuery);

const productVariantQuery = gql`
  ${fragmentVariant}
  query ProductVariantDetails($id: ID!) {
    productVariant(id: $id) {
      ...ProductVariant
    }
  }
`;
export const TypedProductVariantQuery = TypedQuery<
  ProductVariantDetails,
  ProductVariantDetailsVariables
>(productVariantQuery);

const productVariantCreateQuery = gql`
  query ProductVariantCreateData($id: ID!) {
    product(id: $id) {
      id
      images {
        id
        sortOrder
        url
      }
      name
      productType {
        id
        variantAttributes {
          id
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
      thumbnail {
        url
      }
      variants {
        id
        name
        sku
        images {
          id
          url
        }
      }
    }
  }
`;
export const TypedProductVariantCreateQuery = TypedQuery<
  ProductVariantCreateData,
  ProductVariantCreateDataVariables
>(productVariantCreateQuery);

const productImageQuery = gql`
  query ProductImageById($productId: ID!, $imageId: ID!) {
    product(id: $productId) {
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

const availableInGridAttributes = gql`
  ${pageInfoFragment}
  query GridAttributes($first: Int!, $after: String, $ids: [ID!]!) {
    availableInGrid: attributes(
      first: $first
      after: $after
      filter: { availableInGrid: true, isVariantOnly: false }
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
      totalCount
    }

    grid: attributes(first: 25, filter: { ids: $ids }) {
      edges {
        node {
          id
          name
        }
      }
    }
  }
`;
export const AvailableInGridAttributesQuery = TypedQuery<
  AvailableInGridAttributes,
  AvailableInGridAttributesVariables
>(availableInGridAttributes);

const createMultipleVariantsData = gql`
  ${fragmentMoney}
  ${productVariantAttributesFragment}
  ${warehouseFragment}
  query CreateMultipleVariantsData($id: ID!) {
    product(id: $id) {
      ...ProductVariantAttributesFragment
      basePrice {
        ...Money
      }
    }
    warehouses(first: 20) {
      edges {
        node {
          ...WarehouseFragment
        }
      }
    }
  }
`;
export const useCreateMultipleVariantsData = makeQuery<
  CreateMultipleVariantsData,
  CreateMultipleVariantsDataVariables
>(createMultipleVariantsData);
