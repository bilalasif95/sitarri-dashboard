/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { CategoryFilterInput, CategorySortingInput } from "./../../types/globalTypes";

// ====================================================
// GraphQL query operation: RootCategories
// ====================================================

export interface RootCategories_categories_edges_node_children {
  __typename: "CategoryCountableConnection";
  totalCount: number | null;
}

export interface RootCategories_categories_edges_node_products {
  __typename: "ProductCountableConnection";
  totalCount: number | null;
}

export interface RootCategories_categories_edges_node {
  __typename: "BusinessCategory";
  id: string;
  name: string;
  backgroundImage: string;
  description: string;
  seoDescription: string;
  seoTitle: string;
  // children: RootCategories_categories_edges_node_children | null;
  // products: RootCategories_categories_edges_node_products | null;
}

export interface RootCategories_categories_edges {
  __typename: "BusinessCategoryCountableEdge";
  node: RootCategories_categories_edges_node;
}

export interface RootCategories_categories_pageInfo {
  __typename: "PageInfo";
  endCursor: string | null;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  startCursor: string | null;
}

export interface RootCategories_categories {
  __typename: "BusinessCategoryCountableConnection";
  edges: RootCategories_categories_edges[];
  pageInfo: RootCategories_categories_pageInfo;
}

export interface RootCategories {
  businessCategories: RootCategories_categories | null;
}

export interface RootCategoriesVariables {
  first?: number | null;
  after?: string | null;
  last?: number | null;
  before?: string | null;
  filter?: CategoryFilterInput | null;
  sort?: CategorySortingInput | null;
}
