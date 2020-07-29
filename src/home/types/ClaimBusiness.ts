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
  businessErrors: ClaimBusiness_claimBusiness_BusinessErrors[];
  // errors: ClaimBusiness_claimBusiness_errors[];
}

export interface ClaimBusiness {
  requestClaimBusiness: ClaimBusiness_claimBusiness;
}

export interface ClaimBusinessVariables {
  input: {
    email: string;
    business: string;
    redirectUrl: string;
  };
}
