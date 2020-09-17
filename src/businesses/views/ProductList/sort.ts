import { CategoryListUrlSortField } from "@saleor/categories/urls";
import {
  ProductListUrlQueryParams,
  ProductListUrlSortField
} from "@saleor/products/urls";
import { CategorySortField, ProductOrder, ProductOrderField } from "@saleor/types/globalTypes";
import { createGetSortQueryVariables,getOrderDirection } from "@saleor/utils/sort";

export function getSortQueryField(
  sort: ProductListUrlSortField
): ProductOrderField {
  switch (sort) {
    case ProductListUrlSortField.name:
      return ProductOrderField.NAME;
    case ProductListUrlSortField.price:
      return ProductOrderField.PRICE;
    case ProductListUrlSortField.productType:
      return ProductOrderField.TYPE;
    case ProductListUrlSortField.status:
      return ProductOrderField.PUBLISHED;
    default:
      return undefined;
  }
}

export function getSortQueryVariables(
  params: ProductListUrlQueryParams
): ProductOrder {
  if (params.sort === ProductListUrlSortField.attribute) {
    return {
      attributeId: params.attributeId,
      direction: getOrderDirection(params.asc)
    };
  }
  return {
    direction: getOrderDirection(params.asc),
    field: getSortQueryField(params.sort)
  };
}

export function getCategorySortQueryField(
  sort: CategoryListUrlSortField
): CategorySortField {
  switch (sort) {
    case CategoryListUrlSortField.name:
      return CategorySortField.NAME;
    case CategoryListUrlSortField.productCount:
      return CategorySortField.PRODUCT_COUNT;
    case CategoryListUrlSortField.subcategoryCount:
      return CategorySortField.SUBCATEGORY_COUNT;
    default:
      return undefined;
  }
}

export const getCategorySortQueryVariables = createGetSortQueryVariables(
  getCategorySortQueryField
);