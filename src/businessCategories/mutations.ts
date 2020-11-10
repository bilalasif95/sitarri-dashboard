import gql from "graphql-tag";

import makeMutation from "@saleor/hooks/makeMutation";
// import { productErrorFragment } from "@saleor/attributes/mutations";
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
  mutation BusinessCategoryDelete($id: ID!) {
    businesscategoryDelete(id: $id) {
      businessCategoryErrors {
        field
        code
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
  mutation BusinessCategoryCreate($input: BusinessCategoryCreateInput!) {
    businesscategoryCreate(input: $input) {
      businessCategory {
        ...BusinessCategoryFragment
      }
      businesscategoryErrors {
        field
        code
      }
    }
  }
`;
export const useCategoryCreateMutation = makeMutation<
  CategoryCreate,
  CategoryCreateVariables
>(categoryCreateMutation);

export const categoryUpdateMutation = gql`
  ${categoryDetailsFragment}
  mutation BusinessCategoryUpdate($id: ID!, $input: BusinessCategoryCreateInput!) {
    businesscategoryUpdate(id: $id, input: $input) {
      businessCategory {
        ...BusinessCategoryFragment
      }
      businesscategoryErrors {
        field
        code
      }
    }
  }
`;
export const useCategoryUpdateMutation = makeMutation<
  CategoryUpdate,
  CategoryUpdateVariables
>(categoryUpdateMutation);

export const categoryBulkDeleteMutation = gql`
  mutation BusinessCategoryBulkDelete($ids: [ID]!) {
    businesscategoryBulkdelete(ids: $ids) {
      businessCategoryErrors {
        field
        code
      }
    }
  }
`;
export const useCategoryBulkDeleteMutation = makeMutation<
  CategoryBulkDelete,
  CategoryBulkDeleteVariables
>(categoryBulkDeleteMutation);
