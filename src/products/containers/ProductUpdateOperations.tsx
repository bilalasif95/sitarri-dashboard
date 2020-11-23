import React from "react";

import { getMutationProviderData, maybe } from "../../misc";
import { PartialMutationProviderOutput } from "../../types";
import {
  TypedCollectionAssignProductMutation,
  TypedProductDeleteMutation,
  TypedProductImageCreateMutation,
  TypedProductImageDeleteMutation,
  TypedProductUpdateMutation,
  TypedProductVariantBulkDeleteMutation,
  TypedSimpleProductUpdateMutation,
  TypedUnassignCollectionProductMutation
} from "../mutations";
import {
  CollectionAssignProduct,
  CollectionAssignProductVariables
} from "../types/CollectionAssignProduct";
import { ProductDelete, ProductDeleteVariables } from "../types/ProductDelete";
import { ProductDetails_product } from "../types/ProductDetails";
import {
  ProductImageCreate,
  ProductImageCreateVariables
} from "../types/ProductImageCreate";
import {
  ProductImageDelete,
  ProductImageDeleteVariables
} from "../types/ProductImageDelete";
import {
  ProductImageReorder,
  ProductImageReorderVariables
} from "../types/ProductImageReorder";
import { ProductUpdate, ProductUpdateVariables } from "../types/ProductUpdate";
import {
  ProductVariantBulkDelete,
  ProductVariantBulkDeleteVariables
} from "../types/ProductVariantBulkDelete";
import {
  SimpleProductUpdate,
  SimpleProductUpdateVariables
} from "../types/SimpleProductUpdate";
import {
  UnassignCollectionProduct,
  UnassignCollectionProductVariables
} from "../types/UnassignCollectionProduct";
import ProductImagesReorderProvider from "./ProductImagesReorder";

interface ProductUpdateOperationsProps {
  product: ProductDetails_product;
  children: (props: {
    bulkProductVariantDelete: PartialMutationProviderOutput<
      ProductVariantBulkDelete,
      ProductVariantBulkDeleteVariables
    >;
    createProductImage: PartialMutationProviderOutput<
      ProductImageCreate,
      ProductImageCreateVariables
    >;
    deleteProduct: PartialMutationProviderOutput<
      ProductDelete,
      ProductDeleteVariables
    >;
    deleteProductImage: PartialMutationProviderOutput<
      ProductImageDelete,
      ProductImageDeleteVariables
    >;
    reorderProductImages: PartialMutationProviderOutput<
      ProductImageReorder,
      ProductImageReorderVariables
    >;
    updateProduct: PartialMutationProviderOutput<
      ProductUpdate,
      ProductUpdateVariables
    >;
    updateSimpleProduct: PartialMutationProviderOutput<
      SimpleProductUpdate,
      SimpleProductUpdateVariables
    >;
    assignProduct: PartialMutationProviderOutput<
      CollectionAssignProduct,
      CollectionAssignProductVariables
    >;
    unassignProduct: PartialMutationProviderOutput<
      UnassignCollectionProduct,
      UnassignCollectionProductVariables
    >;
  }) => React.ReactNode;
  onBulkProductVariantDelete?: (data: ProductVariantBulkDelete) => void;
  onDelete?: (data: ProductDelete) => void;
  onImageCreate?: (data: ProductImageCreate) => void;
  onImageDelete?: (data: ProductImageDelete) => void;
  onImageReorder?: (data: ProductImageReorder) => void;
  onUpdate?: (data: ProductUpdate) => void;
  onProductAssign: (data: CollectionAssignProduct) => void;
  onProductUnassign: (data: UnassignCollectionProduct) => void;
}

const ProductUpdateOperations: React.FC<ProductUpdateOperationsProps> = ({
  product,
  children,
  onBulkProductVariantDelete,
  onDelete,
  onImageDelete,
  onImageCreate,
  onImageReorder,
  onUpdate,
  onProductAssign,
  onProductUnassign,
}) => {
  const productId = product ? product.id : "";
  return (
    <TypedProductUpdateMutation onCompleted={onUpdate}>
      {(...updateProduct) => (
        <ProductImagesReorderProvider
          productId={productId}
          productImages={maybe(() => product.images, [])}
          onCompleted={onImageReorder}
        >
          {(...reorderProductImages) => (
            <TypedProductImageCreateMutation onCompleted={onImageCreate}>
              {(...createProductImage) => (
                <TypedProductDeleteMutation onCompleted={onDelete}>
                  {(...deleteProduct) => (
                    <TypedProductImageDeleteMutation
                      onCompleted={onImageDelete}
                    >
                      {(...deleteProductImage) => (
                        <TypedCollectionAssignProductMutation onCompleted={onProductAssign}>
                          {(...assignProduct) => (
                            <TypedUnassignCollectionProductMutation
                              onCompleted={onProductUnassign}
                            >
                              {(...unassignProduct) => (
                                <TypedSimpleProductUpdateMutation
                                  onCompleted={onUpdate}
                                >
                                  {(...updateSimpleProduct) => (
                                    <TypedProductVariantBulkDeleteMutation
                                      onCompleted={onBulkProductVariantDelete}
                                    >
                                      {(...bulkProductVariantDelete) =>
                                        children({
                                          assignProduct: getMutationProviderData(
                                            ...assignProduct
                                          ),
                                          bulkProductVariantDelete: getMutationProviderData(
                                            ...bulkProductVariantDelete
                                          ),
                                          createProductImage: getMutationProviderData(
                                            ...createProductImage
                                          ),
                                          deleteProduct: getMutationProviderData(
                                            ...deleteProduct
                                          ),
                                          deleteProductImage: getMutationProviderData(
                                            ...deleteProductImage
                                          ),
                                          reorderProductImages: getMutationProviderData(
                                            ...reorderProductImages
                                          ),
                                          unassignProduct: getMutationProviderData(
                                            ...unassignProduct
                                          ),
                                          updateProduct: getMutationProviderData(
                                            ...updateProduct
                                          ),
                                          updateSimpleProduct: getMutationProviderData(
                                            ...updateSimpleProduct
                                          ),
                                        })
                                      }
                                    </TypedProductVariantBulkDeleteMutation>
                                  )}
                                </TypedSimpleProductUpdateMutation>
                              )}
                            </TypedUnassignCollectionProductMutation>
                          )}
                        </TypedCollectionAssignProductMutation>
                      )}
                    </TypedProductImageDeleteMutation>
                  )}
                </TypedProductDeleteMutation>
              )}
            </TypedProductImageCreateMutation>
          )}
        </ProductImagesReorderProvider>
      )}
    </TypedProductUpdateMutation>
  );
};
export default ProductUpdateOperations;
