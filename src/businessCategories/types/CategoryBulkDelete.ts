/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { ProductErrorCode } from "./../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: CategoryBulkDelete
// ====================================================

export interface CategoryBulkDelete_categoryBulkDelete_errors {
  __typename: "ProductError";
  code: ProductErrorCode;
  field: string | null;
}

export interface CategoryBulkDelete_categoryBulkDelete {
  __typename: "BusinessCategoryBulkDelete";
  businessCategoryErrors: CategoryBulkDelete_categoryBulkDelete_errors[];
}

export interface CategoryBulkDelete {
  businesscategoryBulkdelete: CategoryBulkDelete_categoryBulkDelete | null;
}

export interface CategoryBulkDeleteVariables {
  ids: (string | null)[];
}
