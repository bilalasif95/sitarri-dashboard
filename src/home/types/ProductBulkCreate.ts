/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: AttributeCreate
// ====================================================

export interface ClaimBusiness_claimBusiness_BusinessErrors {
  field: string;
  message: string;
  code: any;
}

export interface ClaimBusiness_claimBusiness_errors {
  // __typename: "ProductError";
  // code: ProductErrorCode;
  field: string | null;
  message: string | null;
}

export interface ClaimBusiness_claimBusiness {
  // __typename: "AttributeCreate";
  message: string;
  productErrors: ClaimBusiness_claimBusiness_BusinessErrors[];
  // errors: ClaimBusiness_claimBusiness_errors[];
}

export interface ProductBulkCreate {
  productBulkCreate: ClaimBusiness_claimBusiness;
}

export interface ProductBulkCreateVariables {
  input: {
    platform: string;
    url: string;
    accessToken: string;
    store: string;
  };
}
