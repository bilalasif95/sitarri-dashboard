import DialogContentText from "@material-ui/core/DialogContentText";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";

import placeholderImg from "@assets/images/placeholder255x255.png";
import ActionDialog from "@saleor/components/ActionDialog";
import { WindowTitle } from "@saleor/components/WindowTitle";
import { defaultListSettings, ProductListColumns, DEFAULT_INITIAL_SEARCH_DATA } from "@saleor/config";
import useBulkActions from "@saleor/hooks/useBulkActions";
import useListSettings from "@saleor/hooks/useListSettings";
import useNavigator from "@saleor/hooks/useNavigator";
import useNotifier from "@saleor/hooks/useNotifier";
import useShop from "@saleor/hooks/useShop";
import { commonMessages } from "@saleor/intl";
import useCategorySearch from "@saleor/searches/useCategorySearch";
import useCollectionSearch from "@saleor/searches/useCollectionSearch";
import { ListViews } from "@saleor/types";
import createDialogActionHandlers from "@saleor/utils/handlers/dialogActionHandlers";
import createFilterHandlers from "@saleor/utils/handlers/filterHandlers";
import useProductTypeSearch from "@saleor/searches/useProductTypeSearch";
import NotFoundPage from "@saleor/components/NotFoundPage";
import { useWarehouseList } from "@saleor/warehouses/queries";
import { getMutationState, maybe } from "../../../misc";
import ProductUpdatePage from "../../components/ProductUpdatePage";
import {
  getAttributeIdFromColumnValue,
  isAttributeColumnValue
} from "../../components/ProductListPage/utils";
import ProductUpdateOperations from "../../containers/ProductUpdateOperations";
import { AvailableInGridAttributesQuery, TypedProductDetailsQuery, useInitialProductFilterDataQuery } from "../../queries";
import {
  ProductImageCreate,
  ProductImageCreateVariables
} from "../../types/ProductImageCreate";
import { ProductUpdate as ProductUpdateMutationResult } from "../../types/ProductUpdate";
import { ProductVariantBulkDelete } from "../../types/ProductVariantBulkDelete";
import {
  businessesListUrl,
  productImageUrl,
  ProductListUrlDialog,
  ProductListUrlQueryParams,
  productUrl,
  ProductUrlQueryParams,
  productVariantAddUrl,
  productVariantEditUrl,
  ProductUrlDialog,
  productVariantCreatorUrl
} from "../../urls";
import { productAddUrl } from "../../../products/urls";
import {
  areFiltersApplied,
  getFilterTabs,
  getFilterOpts,
  getFilterQueryParam
} from "../ProductList/filters";
import {
  createImageReorderHandler,
  createImageUploadHandler,
  createUpdateHandler
} from "./handlers";

interface ProductUpdateProps {
  id: string;
  params: ProductUrlQueryParams;
  listParams: ProductListUrlQueryParams;
}

export const ProductUpdate: React.FC<ProductUpdateProps> = ({ id, params, listParams }) => {
  const navigate = useNavigator();
  const notify = useNotifier();
  const { isSelected, listElements, reset, toggle, toggleAll } = useBulkActions(
    params.ids
  );
  const intl = useIntl();
  const shop = useShop();
  const currencySymbol = maybe(() => shop.defaultCurrency, "USD");
  const {
    loadMore: loadMoreCategories,
    // search: searchCategories,
    result: searchCategoriesOpts
  } = useCategorySearch({
    variables: DEFAULT_INITIAL_SEARCH_DATA
  });
  const {
    loadMore: loadMoreCollections,
    // search: searchCollections,
    result: searchCollectionsOpts
  } = useCollectionSearch({
    variables: DEFAULT_INITIAL_SEARCH_DATA
  });
  const warehouses = useWarehouseList({
    displayLoader: true,
    variables: {
      first: 50
    }
  });

  const [openModal, closeModal] = createDialogActionHandlers<
    ProductUrlDialog,
    ProductUrlQueryParams
  >(navigate, params => productUrl(id, params), params);


  const [openListModal] = createDialogActionHandlers<
    ProductListUrlDialog,
    ProductListUrlQueryParams
  >(navigate, businessesListUrl, listParams);

  const handleBack = () => navigate(businessesListUrl());

  function filterColumnIds(columns: ProductListColumns[]) {
    return columns
      .filter(isAttributeColumnValue)
      .map(getAttributeIdFromColumnValue);
  }

  const { updateListSettings, settings } = useListSettings<ProductListColumns>(
    ListViews.PRODUCT_LIST
  );

  const tabs = getFilterTabs();

  const handleTabChange = (tab: number) => {
    reset();
    navigate(
      businessesListUrl({
        activeTab: tab.toString(),
        ...getFilterTabs()[tab - 1].data
      })
    );
  };

  const { data: initialFilterData } = useInitialProductFilterDataQuery({
    variables: {
      categories: listParams.categories,
      collections: listParams.collections,
      productTypes: listParams.productTypes
    }
  });

  const searchCategories = useCategorySearch({
    variables: {
      ...DEFAULT_INITIAL_SEARCH_DATA,
      first: 5
    }
  });
  const searchCollections = useCollectionSearch({
    variables: {
      ...DEFAULT_INITIAL_SEARCH_DATA,
      first: 5
    }
  });
  const searchProductTypes = useProductTypeSearch({
    variables: {
      ...DEFAULT_INITIAL_SEARCH_DATA,
      first: 5
    }
  });

  const filterOpts = getFilterOpts(
    listParams,
    maybe(() => initialFilterData.attributes.edges.map(edge => edge.node), []),
    {
      initial: maybe(
        () => initialFilterData.businessCategories.edges.map(edge => edge.node),
        []
      ),
      search: searchCategories
    },
    {
      initial: maybe(
        () => initialFilterData.categories.edges.map(edge => edge.node),
        []
      ),
      search: searchCategories
    },
    {
      initial: maybe(
        () => initialFilterData.collections.edges.map(edge => edge.node),
        []
      ),
      search: searchCollections
    },
    {
      initial: maybe(
        () => initialFilterData.productTypes.edges.map(edge => edge.node),
        []
      ),
      search: searchProductTypes
    }
  );

  const currentTab =
    listParams.activeTab === undefined
      ? areFiltersApplied(listParams)
        ? tabs.length + 1
        : 0
      : parseInt(listParams.activeTab, 0);

  const [
    changeFilters,
    resetFilters,
    handleSearchChange
  ] = createFilterHandlers({
    cleanupFn: reset,
    createUrl: businessesListUrl,
    getFilterQueryParam,
    navigate,
    params: listParams
  });
  return (
    <AvailableInGridAttributesQuery
      variables={{ first: 6, ids: filterColumnIds(settings.columns) }}
    >
      {attributes => (
        <TypedProductDetailsQuery displayLoader variables={{ id }}>
          {({ data, loading, refetch }) => {
            const product = data?.business;

            if (product === null) {
              return <NotFoundPage onBack={handleBack} />;
            }

            const handleDelete = () => {
              notify({
                text: intl.formatMessage({
                  defaultMessage: "Business removed"
                })
              });
              navigate(businessesListUrl());
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

            return (
              <ProductUpdateOperations
                product={product}
                onBulkProductVariantDelete={handleBulkProductVariantDelete}
                onDelete={handleDelete}
                onImageCreate={handleImageCreate}
                onImageDelete={handleImageDeleteSuccess}
                onUpdate={handleUpdate}
              >
                {({
                  bulkProductVariantDelete,
                  createProductImage,
                  deleteProduct,
                  deleteProductImage,
                  reorderProductImages,
                  updateProduct,
                  updateSimpleProduct
                }) => {
                  const handleImageDelete = (id: string) => () =>
                    deleteProductImage.mutate({ id });
                  const handleImageEdit = (imageId: string) => () =>
                    navigate(productImageUrl(id, imageId));
                  const handleSubmit = createUpdateHandler(
                    product,
                    updateProduct.mutate,
                    data && data.businessCategories && data.businessCategories.edges,
                    updateSimpleProduct.mutate,
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
                    // maybe(
                    //   () =>
                    //     updateSimpleProduct.opts.data.productVariantUpdate.errors
                    // )
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

                  return (
                    <>
                      <WindowTitle title={maybe(() => data.business.name)} />
                      <ProductUpdatePage
                        categories={categories}
                        collections={collections}
                        disabled={disableFormSave}
                        errors={errors}
                        fetchCategories={() => null}
                        fetchCollections={() => null}
                        saveButtonBarState={formTransitionState}
                        images={maybe(() => data.business.images)}
                        header={maybe(() => product.name)}
                        filterOpts={filterOpts}
                        params={listParams}
                        initialSearch={listParams.query || ""}
                        onTabChange={handleTabChange}
                        onTabDelete={() => openListModal("delete-search")}
                        onTabSave={() => openListModal("save-search")}
                        tabs={getFilterTabs().map(tab => tab.name)}
                        currentTab={currentTab}
                        onAll={resetFilters}
                        gridAttributes={maybe(
                          () =>
                            attributes.data.grid.edges.map(edge => edge.node),
                          []
                        )}
                        onSearchChange={handleSearchChange}
                        onFilterChange={changeFilters}
                        currencySymbol={currencySymbol}
                        placeholderImage={placeholderImg}
                        product={product}
                        onAdd={() => { localStorage.setItem("businessID", product.id); localStorage.setItem("businessCategoryID", product.businesscategory.id); navigate(productAddUrl) }}
                        onUpdateListSettings={updateListSettings}
                        warehouses={
                          warehouses.data?.warehouses.edges.map(
                            edge => edge.node
                          ) || []
                        }
                        onFetchMore={() =>
                          attributes.loadMore(
                            (prev, next) => {
                              if (
                                prev.availableInGrid.pageInfo.endCursor ===
                                next.availableInGrid.pageInfo.endCursor
                              ) {
                                return prev;
                              }
                              return {
                                ...prev,
                                availableInGrid: {
                                  ...prev.availableInGrid,
                                  edges: [
                                    ...prev.availableInGrid.edges,
                                    ...next.availableInGrid.edges
                                  ],
                                  pageInfo: next.availableInGrid.pageInfo
                                }
                              };
                            },
                            {
                              after:
                                attributes.data.availableInGrid.pageInfo
                                  .endCursor
                            }
                          )
                        }
                        totalGridAttributes={maybe(
                          () => attributes.data.availableInGrid.totalCount,
                          0
                        )}
                        settings={settings}
                        loading={attributes.loading}
                        hasMore={maybe(
                          () =>
                            attributes.data.availableInGrid.pageInfo
                              .hasNextPage,
                          false
                        )}
                        variants={maybe(() => product.variants)}
                        onBack={handleBack}
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
                        defaultSettings={
                          defaultListSettings[ListViews.PRODUCT_LIST]
                        }
                        availableInGridAttributes={maybe(
                          () =>
                            attributes.data.availableInGrid.edges.map(
                              edge => edge.node
                            ),
                          []
                        )}
                        toolbar={
                          <IconButton
                            color="primary"
                            onClick={() =>
                              openModal("remove-variants", {
                                ids: listElements
                              })
                            }
                          >
                            <DeleteIcon />
                          </IconButton>
                        }
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
                      <ActionDialog
                        open={params.action === "remove"}
                        onClose={closeModal}
                        confirmButtonState={deleteProduct.opts.status}
                        onConfirm={() => deleteProduct.mutate({ id })}
                        variant="delete"
                        title={intl.formatMessage({
                          defaultMessage: "Delete Business",
                          description: "dialog header"
                        })}
                      >
                        <DialogContentText>
                          <FormattedMessage
                            defaultMessage="Are you sure you want to delete {name}?"
                            description="delete business"
                            values={{
                              name: product ? product.name : undefined
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
                          defaultMessage: "Delete Business Variants",
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
      )}
    </AvailableInGridAttributesQuery>
  );
};
export default ProductUpdate;
