import gql from "graphql-tag";

import makeMutation from "@saleor/hooks/makeMutation";
import { TypedMutation } from "../mutations";
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
import {
  ProductImageCreate,
  ProductImageCreateVariables
} from "./types/ProductImageCreate";
import {
  ProductImageDelete,
  ProductImageDeleteVariables
} from "./types/ProductImageDelete";
import {
  ProductImageReorder,
  ProductImageReorderVariables
} from "./types/ProductImageReorder";
import {
  ProductImageUpdate,
  ProductImageUpdateVariables
} from "./types/ProductImageUpdate";

export const categoryDeleteMutation = gql`
  mutation StoreDelete($id: ID!) {
    storeDelete(id: $id) {
      storeErrors {
        code
        field
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
  mutation StoreCreate($input: StoreCreateInput!) {
    storeCreate(input: $input) {
      store {
        ...StoreDetailsFragment
      }
      storeErrors {
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

export const storeImageCreateMutation = gql`
  ${categoryDetailsFragment}
  mutation StoreImageCreate($input: StoreImageCreateInput!) {
    storeImagecreate(input: $input) {
      store {
        ...StoreDetailsFragment
      }
      storeErrors{
        code
        field
      }
    }
  }
`;
export const useStoreImageCreateMutation = makeMutation<
  ProductImageCreate,
  ProductImageCreateVariables
>(storeImageCreateMutation);

export const storeImageDeleteMutation = gql`
  ${categoryDetailsFragment}
  mutation StoreImageDelete($id: ID!) {
    storeImagedelete(id: $id) {
      store {
        ...StoreDetailsFragment
      }
      storeErrors{
        code
        field
      }
    }
  }
`;
export const useStoreImageDeleteMutation = makeMutation<
  ProductImageDelete,
  ProductImageDeleteVariables
>(storeImageDeleteMutation);

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
          country{
            country
            code
          }
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
  mutation StoreBulkDelete($ids: [ID]!) {
    storeBulkdelete(ids: $ids) {
      storeErrors{
        code
        field
      }
    }
  }
`;
export const useCategoryBulkDeleteMutation = makeMutation<
  CategoryBulkDelete,
  CategoryBulkDeleteVariables
>(categoryBulkDeleteMutation);

// sortOrder

export const productImagesReorder = gql`
  mutation StoreImageReorder($productId: ID!, $imagesIds: [ID]!) {
    storeImagereorder(storeId: $productId, imagesIds: $imagesIds) {
      storeErrors{
        code
        field
      }
      store {
        id
        images {
          id
          alt
          url
        }
      }
    }
  }
`;
export const TypedProductImagesReorder = TypedMutation<
  ProductImageReorder,
  ProductImageReorderVariables
>(productImagesReorder);

export const productImageDeleteMutation = gql`
  ${categoryDetailsFragment}
  mutation StoreImageDelete($id: ID!) {
    storeImagedelete(id: $id) {
      store {
        ...StoreDetailsFragment
      }
      storeErrors{
        code
        field
      }
    }
  }
`;
export const TypedProductImageDeleteMutation = TypedMutation<
  ProductImageDelete,
  ProductImageDeleteVariables
>(productImageDeleteMutation);

export const productImageUpdateMutation = gql`
${categoryDetailsFragment}
  mutation StoreImageUpdate($id: ID!, $alt: String!) {
    storeImageupdate(id: $id, input: { alt: $alt }) {
      storeErrors{
        code
        field
      }
      store {
        ...StoreDetailsFragment
      }
    }
  }
`;
export const TypedProductImageUpdateMutation = TypedMutation<
  ProductImageUpdate,
  ProductImageUpdateVariables
>(productImageUpdateMutation);