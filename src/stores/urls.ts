import { stringify as stringifyQs } from "qs";
import urlJoin from "url-join";

import {
  ActiveTab,
  BulkAction,
  Dialog,
  Filters,
  Pagination,
  TabActionDialog,
  Sort
} from "../types";
import { CategoryPageTab } from "./components/CategoryUpdatePage";

const categorySectionUrl = "/stores/";

export const categoryListPath = categorySectionUrl;
export enum CategoryListUrlFiltersEnum {
  query = "query"
}
export type StoreListUrlFilters = Filters<CategoryListUrlFiltersEnum>;
export type StoreListUrlDialog = "delete" | TabActionDialog;
export enum CategoryListUrlSortField {
  name = "name",
  productCount = "products",
  subcategoryCount = "subcategories"
}
export type CategoryListUrlSort = Sort<CategoryListUrlSortField>;
export type StoreListUrlQueryParams = ActiveTab &
  BulkAction &
  StoreListUrlFilters &
  CategoryListUrlSort &
  Dialog<StoreListUrlDialog> &
  Pagination;
export const storesListUrl = (params?: StoreListUrlQueryParams) =>
  categorySectionUrl + "?" + stringifyQs(params);

export const categoryPath = (id: string) => urlJoin(categorySectionUrl, id);
export type CategoryUrlDialog =
  | "delete"
  | "delete-categories"
  | "delete-products"
  | "assign" | "unassign";
export type CategoryUrlQueryParams = BulkAction &
  Dialog<CategoryUrlDialog> &
  Pagination &
  ActiveTab<CategoryPageTab>;
export const storesUrl = (id: string, params?: CategoryUrlQueryParams) =>
  categoryPath(encodeURIComponent(id)) + "?" + stringifyQs(params);

export const categoryAddPath = (parentId?: string) => {
  if (parentId) {
    return urlJoin(categoryPath(parentId), "add");
  }
  return urlJoin(categorySectionUrl, "add");
};
export const storeAddUrl = (parentId?: string) =>
  categoryAddPath(parentId ? encodeURIComponent(parentId) : undefined);

export const productImagePath = (productId: string, imageId: string) =>
  urlJoin(categorySectionUrl, productId, "image", imageId);
export type ProductImageUrlDialog = "remove";
export type ProductImageUrlQueryParams = Dialog<"remove">;
export const productImageUrl = (
  productId: string,
  imageId: string,
  params?: ProductImageUrlQueryParams
) =>
  productImagePath(encodeURIComponent(productId), encodeURIComponent(imageId)) +
  "?" +
  stringifyQs(params);