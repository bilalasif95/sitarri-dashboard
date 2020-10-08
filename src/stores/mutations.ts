import gql from "graphql-tag";

import makeMutation from "@saleor/hooks/makeMutation";
import { productErrorFragment } from "@saleor/attributes/mutations";
import { categoryDetailsFragment } from "./queries";
import {
  CategoryBulkDelete,
  CategoryBulkDeleteVariables
} from "./types/CategoryBulkDelete";
import {
  CategoryCreate,
  CategoryCreateVariables
} from "./types/CategoryCreate";
import {
  CategoryDelete,
  CategoryDeleteVariables
} from "./types/CategoryDelete";
import {
  CategoryUpdate,
  CategoryUpdateVariables
} from "./types/CategoryUpdate";

export const categoryDeleteMutation = gql`
  ${productErrorFragment}
  mutation CategoryDelete($id: ID!) {
    categoryDelete(id: $id) {
      errors: productErrors {
        ...ProductErrorFragment
      }
    }
  }
`;
export const useCategoryDeleteMutation = makeMutation<
  CategoryDelete,
  CategoryDeleteVariables
>(categoryDeleteMutation);

export const categoryCreateMutation = gql`
  ${categoryDetailsFragment}
  ${productErrorFragment}
  mutation CategoryCreate($parent: ID, $input: CategoryInput!) {
    categoryCreate(parent: $parent, input: $input) {
      category {
        ...CategoryDetailsFragment
      }
      errors: productErrors {
        ...ProductErrorFragment
      }
    }
  }
`;
export const useCategoryCreateMutation = makeMutation<
  CategoryCreate,
  CategoryCreateVariables
>(categoryCreateMutation);

export const categoryUpdateMutation = gql`
  mutation StoreUpdate($id: ID!, $input: StoreCreateInput!) {
    storeUpdate(id: $id, input: $input) {
      store {
        id
        name
        description
        category
        address {
          streetAddress
          postalCode
          city
          country
        }
        logo
        websiteUrl
        facebookUrl
        twitterUrl
        instagramUrl
        deliverooUrl
        uberEatsUrl
        phone
        images {
          url
          id
        }
        tags {
          id
          name
        }
        openingHours
        closingHours
      }
      errors {
        field
        message
      }
    }
  }
`;
export const useCategoryUpdateMutation = makeMutation<
  CategoryUpdate,
  CategoryUpdateVariables
>(categoryUpdateMutation);

export const categoryBulkDeleteMutation = gql`
  ${productErrorFragment}
  mutation CategoryBulkDelete($ids: [ID]!) {
    categoryBulkDelete(ids: $ids) {
      errors: productErrors {
        ...ProductErrorFragment
      }
    }
  }
`;
export const useCategoryBulkDeleteMutation = makeMutation<
  CategoryBulkDelete,
  CategoryBulkDeleteVariables
>(categoryBulkDeleteMutation);
