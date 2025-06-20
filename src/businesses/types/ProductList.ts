/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { ProductFilterInput, ProductOrder } from "./../../types/globalTypes";

// ====================================================
// GraphQL query operation: ProductList
// ====================================================

export interface ProductList_products_edges_node_thumbnail {
  __typename: "Image";
  url: string;
}

export interface ProductList_products_edges_node_basePrice {
  __typename: "Money";
  amount: number;
  currency: string;
}

export interface ProductList_products_edges_node_productType {
  __typename: "ProductType";
  id: string;
  name: string;
}

export interface ProductList_products_edges_node_attributes_attribute {
  __typename: "Attribute";
  id: string;
}

export interface ProductList_products_edges_node_attributes_values {
  __typename: "AttributeValue";
  id: string;
  name: string | null;
}

export interface ProductList_products_edges_node_attributes {
  __typename: "SelectedAttribute";
  attribute: ProductList_products_edges_node_attributes_attribute;
  values: (ProductList_products_edges_node_attributes_values | null)[];
}

export interface ProductList_products_edges_node {
  __typename: "Product";
  id: string;
  name: string;
  thumbnail: ProductList_products_edges_node_thumbnail | null;
  isAvailable: boolean | null;
  isPublished: boolean;
  isVerified?: boolean;
  basePrice: ProductList_products_edges_node_basePrice | null;
  productType: ProductList_products_edges_node_productType;
  attributes: ProductList_products_edges_node_attributes[];
}

export interface ProductList_products_edges {
  __typename: "ProductCountableEdge";
  node: ProductList_products_edges_node;
}

export interface ProductList_products_pageInfo {
  __typename: "PageInfo";
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  startCursor: string | null;
  endCursor: string | null;
}

export interface ProductList_products {
  __typename: "ProductCountableConnection";
  edges: ProductList_products_edges[];
  pageInfo: ProductList_products_pageInfo;
}

export interface ProductList {
  businessCategories: any;
  businesses: any;
  products: ProductList_products | null;
}

export interface ProductListVariables {
  first?: number | null;
  after?: string | null;
  last?: number | null;
  before?: string | null;
  filter?: ProductFilterInput | null;
  sort?: ProductOrder | null;
}
