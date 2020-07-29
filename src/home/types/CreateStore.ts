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
  // message: string;
  store: {
    id: string;
    name: string;
  }
  // businessErrors: ClaimBusiness_claimBusiness_BusinessErrors[];
  errors: ClaimBusiness_claimBusiness_errors[];
}

export interface CreateStore {
  storeCreate: ClaimBusiness_claimBusiness;
}

export interface CreateStoreVariables {
  input: {
    address?: {
      city: string,
      country: string,
      latitude: any,
      longitude: any,
      postalCode: string,
      streetAddress: string,
    },
    business: string,
    category: string,
    description: string,
    facebookUrl: string,
    instagramUrl: string,
    maxPrice: any;
    minPrice: any;
    name: string,
    rating: any;
    twitterUrl: string,
    totalReviews: any;
    websiteUrl: string,
  };
}
