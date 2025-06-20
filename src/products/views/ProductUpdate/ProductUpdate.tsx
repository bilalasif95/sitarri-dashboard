import Button from "@material-ui/core/Button";
import DialogContentText from "@material-ui/core/DialogContentText";
// import IconButton from "@material-ui/core/IconButton";
// import DeleteIcon from "@material-ui/icons/Delete";
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";

import placeholderImg from "@assets/images/placeholder255x255.png";
import ActionDialog from "@saleor/components/ActionDialog";
import AssignProductDialog from "@saleor/components/AssignStoreDialog";
import { WindowTitle } from "@saleor/components/WindowTitle";
import { DEFAULT_INITIAL_SEARCH_DATA, PAGINATE_BY } from "@saleor/config";
import useBulkActions from "@saleor/hooks/useBulkActions";
import useNavigator from "@saleor/hooks/useNavigator";
import useNotifier from "@saleor/hooks/useNotifier";
import usePaginator, { createPaginationState } from "@saleor/hooks/usePaginator";
import { commonMessages } from "@saleor/intl";
import useProductSearch from "@saleor/searches/useStoreSearch";
import useCategorySearch from "@saleor/searches/useCategorySearch";
import useCollectionSearch from "@saleor/searches/useCollectionSearch";
import createDialogActionHandlers from "@saleor/utils/handlers/dialogActionHandlers";
import NotFoundPage from "@saleor/components/NotFoundPage";
import { useWarehouseList } from "@saleor/warehouses/queries";
import { getMutationState, maybe } from "../../../misc";
import ProductUpdatePage from "../../components/ProductUpdatePage";
import ProductUpdateOperations from "../../containers/ProductUpdateOperations";
import { TypedProductDetailsQuery } from "../../queries";
import { CollectionAssignProduct } from "../../types/CollectionAssignProduct";
import {
  ProductImageCreate,
  ProductImageCreateVariables
} from "../../types/ProductImageCreate";
import { ProductUpdate as ProductUpdateMutationResult } from "../../types/ProductUpdate";
import { ProductVariantBulkDelete } from "../../types/ProductVariantBulkDelete";
import { UnassignCollectionProduct } from "../../types/UnassignCollectionProduct";
import {
  productImageUrl,
  productListUrl,
  productUrl,
  ProductUrlQueryParams,
  productVariantAddUrl,
  productVariantEditUrl,
  ProductUrlDialog,
  productVariantCreatorUrl
} from "../../urls";
import {
  createImageReorderHandler,
  createImageUploadHandler,
  createUpdateHandler
} from "./handlers";

interface ProductUpdateProps {
  id: string;
  params: any;
}

export const ProductUpdate: React.FC<ProductUpdateProps> = ({ id, params }) => {
  const navigate = useNavigator();
  const notify = useNotifier();
  const { isSelected, listElements, reset, toggle, toggleAll } = useBulkActions(
    params.ids
  );

  const intl = useIntl();
  const paginate = usePaginator();

  const {
    loadMore: loadMoreCollections,
    search: searchCollections,
    result: searchCollectionsOpts
  } = useCollectionSearch({
    variables: DEFAULT_INITIAL_SEARCH_DATA
  });
  const paginationState = createPaginationState(PAGINATE_BY, params);
  const warehouses = useWarehouseList({
    displayLoader: true,
    variables: {
      first: 50
    }
  });
  const { search, result } = useProductSearch({
    variables: DEFAULT_INITIAL_SEARCH_DATA
  });
  const [openModal, closeModal] = createDialogActionHandlers<
    ProductUrlDialog,
    ProductUrlQueryParams
  >(navigate, params => productUrl(id, params), params);

  const handleBack = () => navigate(productListUrl());

  return (
    <TypedProductDetailsQuery displayLoader variables={{ id }}>
      {({ data, loading, refetch }) => {
        const product = data?.product;

        if (product === null) {
          return <NotFoundPage onBack={handleBack} />;
        }

        const {
          loadMore: loadMoreCategories,
          search: searchCategories,
          result: searchCategoriesOpts
        } = useCategorySearch({
          variables: {
            business: maybe(() => product.business.id),
            ...DEFAULT_INITIAL_SEARCH_DATA
          }
        });

        const handleDelete = () => {
          notify({
            text: intl.formatMessage({
              defaultMessage: "Product removed"
            })
          });
          navigate(productListUrl());
        };
        const handleUpdate = (data: ProductUpdateMutationResult) => {
          if (data.productUpdate.errors.length === 0) {
            notify({
              text: intl.formatMessage(commonMessages.savedChanges)
            });
          }
        };

        const handleImageCreate = (data: ProductImageCreate) => {
          const imageError = data.productImageCreate.errors.find(
            error =>
              error.field === ("image" as keyof ProductImageCreateVariables)
          );
          if (imageError) {
            notify({
              text: intl.formatMessage(commonMessages.somethingWentWrong)
            });
          }
        };
        const handleImageDeleteSuccess = () =>
          notify({
            text: intl.formatMessage(commonMessages.savedChanges)
          });
        const handleVariantAdd = () => navigate(productVariantAddUrl(id));

        const handleBulkProductVariantDelete = (
          data: ProductVariantBulkDelete
        ) => {
          if (data.productVariantBulkDelete.errors.length === 0) {
            closeModal();
            reset();
            refetch();
          }
        };

        const handleProductAssign = (data: CollectionAssignProduct) => {
          if (data.productAddStores.errors.length === 0) {
            notify({
              text: intl.formatMessage({
                defaultMessage: "Added store to product"
              })
            });
            navigate(productUrl(id), true);
          }
        };

        const handleProductUnassign = (data: UnassignCollectionProduct) => {
          if (data.productRemoveStores.errors.length === 0) {
            notify({
              text: intl.formatMessage({
                defaultMessage: "Deleted store from product"
              })
            });
            refetch();
            reset();
            closeModal();
          }
        };

        return (
          <ProductUpdateOperations
            product={product}
            onBulkProductVariantDelete={handleBulkProductVariantDelete}
            onDelete={handleDelete}
            onImageCreate={handleImageCreate}
            onImageDelete={handleImageDeleteSuccess}
            onUpdate={handleUpdate}
            onProductAssign={handleProductAssign}
            onProductUnassign={handleProductUnassign}
          >
            {({
              bulkProductVariantDelete,
              createProductImage,
              deleteProduct,
              deleteProductImage,
              reorderProductImages,
              updateProduct,
              updateSimpleProduct,
              assignProduct,
              unassignProduct
            }) => {
              const handleImageDelete = (id: string) => () =>
                deleteProductImage.mutate({ id });
              const handleImageEdit = (imageId: string) => () =>
                navigate(productImageUrl(id, imageId));
              const handleSubmit = createUpdateHandler(
                product,
                // updateProduct.mutate,
                updateSimpleProduct.mutate
              );
              const handleImageUpload = createImageUploadHandler(
                id,
                createProductImage.mutate
              );
              const handleImageReorder = createImageReorderHandler(
                product,
                reorderProductImages.mutate
              );

              const disableFormSave =
                createProductImage.opts.loading ||
                deleteProduct.opts.loading ||
                reorderProductImages.opts.loading ||
                updateProduct.opts.loading ||
                loading;
              const formTransitionState = getMutationState(
                updateProduct.opts.called || updateSimpleProduct.opts.called,
                updateProduct.opts.loading || updateSimpleProduct.opts.loading,
                maybe(() => updateProduct.opts.data.productUpdate.errors),
                maybe(() => updateSimpleProduct.opts.data.productUpdate.errors),
                maybe(
                  () =>
                    updateSimpleProduct.opts.data.productVariantUpdate.errors
                )
              );

              const categories = maybe(
                () => searchCategoriesOpts.data.search.edges,
                []
              ).map(edge => edge.node);
              const collections = maybe(
                () => searchCollectionsOpts.data.search.edges,
                []
              ).map(edge => edge.node);
              const errors = [
                ...maybe(
                  () => updateProduct.opts.data.productUpdate.errors,
                  []
                ),
                ...maybe(
                  () => updateSimpleProduct.opts.data.productUpdate.errors,
                  []
                )
              ];

              const { loadNextPage, loadPreviousPage, pageInfo } = paginate(
                maybe(() => product.business.businessStore.pageInfo),
                paginationState,
                params
              );

              return (
                <>
                  <WindowTitle title={maybe(() => data.product.name)} />
                  <ProductUpdatePage
                    categories={categories}
                    collections={collections}
                    disabled={disableFormSave}
                    errors={errors}
                    fetchCategories={searchCategories}
                    fetchCollections={searchCollections}
                    saveButtonBarState={formTransitionState}
                    images={maybe(() => data.product.images)}
                    header={maybe(() => product.name)}
                    placeholderImage={placeholderImg}
                    product={product}
                    warehouses={
                      warehouses.data?.warehouses.edges.map(
                        edge => edge.node
                      ) || []
                    }
                    variants={maybe(() => product.variants)}
                    onBack={handleBack}
                    loadNextPage={loadNextPage}
                    onProductUnassign={(productId, event) => {
                      event.stopPropagation();
                      unassignProduct.mutate({
                        productId: id,
                        stores: [productId],
                        ...paginationState
                      });
                    }}
                    pageInfo={pageInfo}
                    loadPreviousPage={loadPreviousPage}
                    onAdd={() => openModal("assign")}
                    onDelete={() => openModal("remove")}
                    onImageReorder={handleImageReorder}
                    onSubmit={handleSubmit}
                    onVariantAdd={handleVariantAdd}
                    onVariantsAdd={() => navigate(productVariantCreatorUrl(id))}
                    onVariantShow={variantId => () =>
                      navigate(productVariantEditUrl(product.id, variantId))}
                    onImageUpload={handleImageUpload}
                    onImageEdit={handleImageEdit}
                    onImageDelete={handleImageDelete}
                    toolbar={
                      <Button
                        color="primary"
                        onClick={() =>
                          openModal("unassign", {
                            ids: listElements
                          })
                        }
                      >
                        <FormattedMessage
                          defaultMessage="Unassign"
                          description="unassign store from product, button"
                        />
                      </Button>
                    }
                    // toolbar={
                    //   <IconButton
                    //     color="primary"
                    //     onClick={() =>
                    //       openModal("remove-variants", {
                    //         ids: listElements
                    //       })
                    //     }
                    //   >
                    //     <DeleteIcon />
                    //   </IconButton>
                    // }
                    isChecked={isSelected}
                    selected={listElements.length}
                    toggle={toggle}
                    toggleAll={toggleAll}
                    fetchMoreCategories={{
                      hasMore: maybe(
                        () =>
                          searchCategoriesOpts.data.search.pageInfo.hasNextPage
                      ),
                      loading: searchCategoriesOpts.loading,
                      onFetchMore: loadMoreCategories
                    }}
                    fetchMoreCollections={{
                      hasMore: maybe(
                        () =>
                          searchCollectionsOpts.data.search.pageInfo.hasNextPage
                      ),
                      loading: searchCollectionsOpts.loading,
                      onFetchMore: loadMoreCollections
                    }}
                  />
                  <AssignProductDialog
                    confirmButtonState={assignProduct.opts.status}
                    open={params.action === "assign"}
                    onFetch={search}
                    loading={result.loading}
                    onClose={closeModal}
                    onSubmit={products =>
                      assignProduct.mutate({
                        ...paginationState,
                        productId: id,
                        stores: products.map(product => product.id)
                      })
                    }
                    products={maybe(() =>
                      product.business.businessStore.edges
                        .map(edge => edge.node)
                    )}
                  // products={maybe(() =>
                  //   result.data.search.edges
                  //     .map(edge => edge.node)
                  //     .filter(suggestedProduct => suggestedProduct.id)
                  // )}
                  />
                  <ActionDialog
                    open={params.action === "remove"}
                    onClose={closeModal}
                    confirmButtonState={deleteProduct.opts.status}
                    onConfirm={() => deleteProduct.mutate({ id })}
                    variant="delete"
                    title={intl.formatMessage({
                      defaultMessage: "Delete Product",
                      description: "dialog header"
                    })}
                  >
                    <DialogContentText>
                      <FormattedMessage
                        defaultMessage="Are you sure you want to delete {name}?"
                        description="delete product"
                        values={{
                          name: product ? product.name : undefined
                        }}
                      />
                    </DialogContentText>
                  </ActionDialog>
                  <ActionDialog
                    confirmButtonState={unassignProduct.opts.status}
                    onClose={closeModal}
                    onConfirm={() =>
                      unassignProduct.mutate({
                        ...paginationState,
                        productId: id,
                        stores: params.ids
                      })
                    }
                    open={params.action === "unassign"}
                    title={intl.formatMessage({
                      defaultMessage: "Unassign stores from product",
                      description: "dialog title"
                    })}
                  >
                    <DialogContentText>
                      <FormattedMessage
                        defaultMessage="{counter,plural,one{Are you sure you want to unassign this store?} other{Are you sure you want to unassign {displayQuantity} stores?}}"
                        values={{
                          counter: maybe(() => params.ids.length),
                          displayQuantity: (
                            <strong>{maybe(() => params.ids.length)}</strong>
                          )
                        }}
                      />
                    </DialogContentText>
                  </ActionDialog>
                  <ActionDialog
                    open={params.action === "remove-variants"}
                    onClose={closeModal}
                    confirmButtonState={bulkProductVariantDelete.opts.status}
                    onConfirm={() =>
                      bulkProductVariantDelete.mutate({
                        ids: params.ids
                      })
                    }
                    variant="delete"
                    title={intl.formatMessage({
                      defaultMessage: "Delete Product Variants",
                      description: "dialog header"
                    })}
                  >
                    <DialogContentText>
                      <FormattedMessage
                        defaultMessage="{counter,plural,one{Are you sure you want to delete this variant?} other{Are you sure you want to delete {displayQuantity} variants?}}"
                        description="dialog content"
                        values={{
                          counter: maybe(() => params.ids.length),
                          displayQuantity: (
                            <strong>{maybe(() => params.ids.length)}</strong>
                          )
                        }}
                      />
                    </DialogContentText>
                  </ActionDialog>
                </>
              );
            }}
          </ProductUpdateOperations>
        );
      }}
    </TypedProductDetailsQuery>
  );
};
export default ProductUpdate;
