/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { ProductErrorCode } from "./../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: CategoryDelete
// ====================================================

export interface CategoryDelete_categoryDelete_errors {
  __typename: "ProductError";
  code: ProductErrorCode;
  field: string | null;
}

export interface CategoryDelete_categoryDelete {
  __typename: "BusinessCategoryDelete";
  businessCategoryErrors: CategoryDelete_categoryDelete_errors[];
}

export interface CategoryDelete {
  businesscategoryDelete: CategoryDelete_categoryDelete | null;
}

export interface CategoryDeleteVariables {
  id: string;
}
