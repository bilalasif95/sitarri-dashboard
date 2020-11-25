import Button from "@material-ui/core/Button";
import DialogContentText from "@material-ui/core/DialogContentText";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { geocodeByAddress, getLatLng } from "react-places-autocomplete";

import placeholderImg from "@assets/images/placeholder255x255.png";
import ActionDialog from "@saleor/components/ActionDialog";
import AssignProductDialog from "@saleor/components/AssignProductDialog";
import { WindowTitle } from "@saleor/components/WindowTitle";
import useBulkActions from "@saleor/hooks/useBulkActions";
import useNavigator from "@saleor/hooks/useNavigator";
import useNotifier from "@saleor/hooks/useNotifier";
import usePaginator, {
  createPaginationState
} from "@saleor/hooks/usePaginator";
// import useUser from "@saleor/hooks/useUser";
import { commonMessages } from "@saleor/intl";
import useProductSearch from "@saleor/searches/useProductSearch";
import createDialogActionHandlers from "@saleor/utils/handlers/dialogActionHandlers";
import NotFoundPage from "@saleor/components/NotFoundPage";
import { DEFAULT_INITIAL_SEARCH_DATA, PAGINATE_BY } from "../../config";
import { maybe } from "../../misc";
import { TypedProductBulkDeleteMutation } from "../../products/mutations";
import { productBulkDelete } from "../../products/types/productBulkDelete";
import { CategoryInput } from "../../types/globalTypes";
import {
  CategoryPageTab,
  CategoryUpdatePage
} from "../components/CategoryUpdatePage/CategoryUpdatePage";
import {
  useCategoryBulkDeleteMutation,
  useCategoryDeleteMutation,
  useCategoryUpdateMutation,
  useStoreImageCreateMutation,
  useStoreImageDeleteMutation
} from "../mutations";
import { useCategoryDetailsQuery } from "../queries";
import { CategoryBulkDelete } from "../types/CategoryBulkDelete";
import { CategoryDelete } from "../types/CategoryDelete";
import { ProductImageCreate, ProductImageCreateVariables } from "../types/ProductImageCreate";
import { CollectionAssignProduct } from "../types/StoreAssignProduct";
import { UnassignCollectionProduct } from "../types/UnassignStoreProduct";
import {
  productImageUrl,
  storeAddUrl,
  storesUrl,
  CategoryUrlQueryParams,
  CategoryUrlDialog,
  storesListUrl
} from "../urls";
import { TypedProductUpdateMutation } from "../../businesses/mutations";
import { createImageReorderHandler } from "../../products/views/ProductUpdate/handlers";
import ProductUpdateOperations from "../containers/ProductUpdateOperations";
import { productUrl } from "../../products/urls";

export interface CategoryDetailsProps {
  params: CategoryUrlQueryParams;
  id: string;
}

export function getActiveTab(tabName: string): CategoryPageTab {
  return tabName === CategoryPageTab.products
    ? CategoryPageTab.products
    : CategoryPageTab.categories;
}

export const CategoryDetails: React.FC<CategoryDetailsProps> = ({
  id,
  params
}) => {
  const navigate = useNavigator();
  const notify = useNotifier();
  const paginate = usePaginator();
  const [latlngError, setlatLngError] = React.useState("");
  const [latLngLoading, setlatLngLoading] = React.useState(false);
  const { isSelected, listElements, reset, toggle, toggleAll } = useBulkActions(
    params.ids
  );
  const intl = useIntl();
  // const { user } = useUser();
  const paginationState = createPaginationState(PAGINATE_BY, params);
  const { data, loading, refetch } = useCategoryDetailsQuery({
    displayLoader: true,
    variables: { ...paginationState, id }
  });

  const category = data?.store;

  if (category === null) {
    return <NotFoundPage onBack={() => navigate(storesListUrl())} />;
  }

  const handleCategoryDelete = (data: CategoryDelete) => {
    if (data.storeDelete.storeErrors.length === 0) {
      notify({
        text: intl.formatMessage({
          defaultMessage: "Store deleted"
        })
      });
      navigate(storesListUrl());
    }
  };

  const handleStoreImageCreate = (data: ProductImageCreate) => {
    const imageError = data.storeImagecreate.storeErrors.find(
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

  const [deleteCategory, deleteResult] = useCategoryDeleteMutation({
    onCompleted: handleCategoryDelete
  });

  const [storeImagecreate] = useStoreImageCreateMutation({
    onCompleted: handleStoreImageCreate
  });

  const [storeImagedelete] = useStoreImageDeleteMutation({
    onCompleted: handleImageDeleteSuccess
  });

  const handleCategoryUpdate = (data: any) => {
    if (data.storeUpdate.errors.length > 0 || data.businessUpdate.businessErrors.length > 0) {
      const backgroundImageError = data.storeUpdate.errors.find(
        error => error.field === ("backgroundImage" as keyof CategoryInput)
      );
      if (backgroundImageError) {
        notify({
          text: intl.formatMessage(commonMessages.somethingWentWrong)
        });
      }
    }
  };

  const [updateCategory, updateResult] = useCategoryUpdateMutation({
    onCompleted: handleCategoryUpdate
  });

  const handleBulkCategoryDelete = (data: CategoryBulkDelete) => {
    if (data.storeBulkdelete.storeErrors.length === 0) {
      closeModal();
      notify({
        text: intl.formatMessage(commonMessages.savedChanges)
      });
      reset();
    }
  };

  const [
    categoryBulkDelete,
    categoryBulkDeleteOpts
  ] = useCategoryBulkDeleteMutation({
    onCompleted: handleBulkCategoryDelete
  });

  const changeTab = (tabName: CategoryPageTab) => {
    reset();
    navigate(
      storesUrl(id, {
        activeTab: tabName
      })
    );
  };

  const [openModal, closeModal] = createDialogActionHandlers<
    CategoryUrlDialog,
    CategoryUrlQueryParams
  >(navigate, params => storesUrl(id, params), params);

  const handleBulkProductDelete = (data: productBulkDelete) => {
    if (data.productBulkDelete.errors.length === 0) {
      closeModal();
      notify({
        text: intl.formatMessage(commonMessages.savedChanges)
      });
      refetch();
      reset();
    }
  };

  const { loadNextPage, loadPreviousPage, pageInfo } = paginate(
    params.activeTab === CategoryPageTab.categories
      ? maybe(() => data.store.productss.pageInfo)
      : maybe(() => data.store.productss.pageInfo),
    paginationState,
    params
  );

  const { search, result } = useProductSearch({
    variables: {
      business: maybe(() => category.business.id),
      ...DEFAULT_INITIAL_SEARCH_DATA
    }
  });

  const handleProductAssign = (data: CollectionAssignProduct) => {
    if (data.storeAddproducts.storeErrors.length === 0) {
      notify({
        text: intl.formatMessage({
          defaultMessage: "Added product to store"
        })
      });
      refetch();
      reset();
      navigate(storesUrl(id), true);
    }
  };

  const handleProductUnassign = (data: UnassignCollectionProduct) => {
    if (data.storeRemoveproducts.storeErrors.length === 0) {
      notify({
        text: intl.formatMessage({
          defaultMessage: "Deleted product from store"
        })
      });
      refetch();
      reset();
      closeModal();
    }
  };

  return (
    <>
      <WindowTitle title={maybe(() => data.store.name)} />
      <TypedProductBulkDeleteMutation onCompleted={handleBulkProductDelete}>
        {(productBulkDelete, productBulkDeleteOpts) => (
          <>
            <TypedProductUpdateMutation onCompleted={handleCategoryUpdate}>
              {(businessUpdate, businessUpdateOpts) => (
                <ProductUpdateOperations
                  product={category}
                  onProductAssign={handleProductAssign}
                  onProductUnassign={handleProductUnassign}
                >
                  {({ reorderProductImages,
                    assignProduct,
                    unassignProduct
                  }) => {
                    const handleImageReorder = createImageReorderHandler(
                      category,
                      reorderProductImages.mutate
                    );
                    const handleImageEdit = (imageId: string) => () =>
                      navigate(productImageUrl(id, imageId));
                    return (
                      <>
                        <CategoryUpdatePage
                          changeTab={changeTab}
                          currentTab={params.activeTab}
                          category={maybe(() => data.store)}
                          disabled={loading || latLngLoading || businessUpdateOpts.loading}
                          latlngError={latlngError}
                          errors={updateResult.data?.storeUpdate.errors || []}
                          onAddCategory={() => navigate(storeAddUrl(id))}
                          onAddProduct={() => openModal("assign")}
                          onBack={() =>
                            navigate(
                              maybe(
                                () => storesUrl(data.store.parent.id),
                                storesListUrl()
                              )
                            )
                          }
                          onProductUnassign={(productId, event) => {
                            event.stopPropagation();
                            unassignProduct.mutate({
                              productId: id,
                              stores: [productId],
                              ...paginationState
                            });
                          }}
                          images={maybe(() => data.store.images)}
                          onCategoryClick={id => () => navigate(productUrl(id))}
                          onDelete={() => openModal("delete")}
                          onImageDelete={(id) => () =>
                            storeImagedelete({
                              variables: {
                                id
                              }
                            })
                          }
                          placeholderImage={placeholderImg}
                          onImageReorder={handleImageReorder}
                          onImageEdit={handleImageEdit}
                          paramsProps={params}
                          onImageUpload={file =>
                            storeImagecreate({
                              variables: {
                                input: {
                                  image: file,
                                  store: id,
                                }
                              }
                            })
                          }
                          onNextPage={loadNextPage}
                          onPreviousPage={loadPreviousPage}
                          pageInfo={pageInfo}
                          onProductClick={id => () => navigate(storesUrl(id))}
                          onSubmit={formData => {
                            setlatLngError("");
                            setlatLngLoading(true);
                            geocodeByAddress(
                              formData.streetAddress +
                              "," +
                              formData.streetAddress2 +
                              "," +
                              formData.city +
                              "," +
                              formData.country
                            )
                              .then(results => getLatLng(results[0]))
                              .then(latLng => {
                                setlatLngLoading(false);
                                updateCategory({
                                  variables: {
                                    id,
                                    input: {
                                      address: {
                                        city: formData.city,
                                        country: formData.country,
                                        latitude: latLng.lat,
                                        longitude: latLng.lng,
                                        postalCode: formData.postalCode,
                                        streetAddress: formData.streetAddress,
                                        streetAddress2: formData.streetAddress2,
                                      },
                                      // backgroundImageAlt: formData.backgroundImageAlt,
                                      business: maybe(() => data.store.business.id),
                                      businesscategory: maybe(() => data.store.business.businesscategory.id),
                                      // category: formData.businessCategory,
                                      // deliverooUrl: "https://www." + formData.delivery,
                                      description: formData.description,
                                      // facebookUrl: "https://www.facebook.com/" + formData.facebook,
                                      // instagramUrl: "https://www.instagram.com/" + formData.instagram,
                                      fridayClosingTime: formData.fridayClosingTime,
                                      fridayOpeningStatus: formData.fridayOpenClose,
                                      fridayOpeningTime: formData.fridayOpeningTime,
                                      mondayClosingTime: formData.mondayClosingTime,
                                      mondayOpeningStatus: formData.mondayOpenClose,
                                      mondayOpeningTime: formData.mondayOpeningTime,
                                      // logo: formData.logo,
                                      name: formData.name,
                                      phone: formData.phone,
                                      rating: formData.rating,
                                      saturdayClosingTime: formData.saturdayClosingTime,
                                      saturdayOpeningStatus: formData.saturdayOpenClose,
                                      saturdayOpeningTime: formData.saturdayOpeningTime,
                                      seoDescription: formData.seoDescription,
                                      seoTitle: formData.seoTitle,
                                      status: formData.status,
                                      sundayClosingTime: formData.sundayClosingTime,
                                      sundayOpeningStatus: formData.sundayOpenClose,
                                      sundayOpeningTime: formData.sundayOpeningTime,
                                      tags: formData.tags,
                                      thursdayClosingTime: formData.thursdayClosingTime,
                                      thursdayOpeningStatus: formData.thursdayOpenClose,
                                      thursdayOpeningTime: formData.thursdayOpeningTime,
                                      tuesdayClosingTime: formData.tuesdayClosingTime,
                                      tuesdayOpeningStatus: formData.tuesdayOpenClose,
                                      tuesdayOpeningTime: formData.tuesdayOpeningTime,
                                      wednesdayClosingTime: formData.wednesdayClosingTime,
                                      wednesdayOpeningStatus: formData.wednesdayOpenClose,
                                      wednesdayOpeningTime: formData.wednesdayOpeningTime,
                                      // twitterUrl: "https://www.twitter.com/" + formData.twitter,
                                      // uberEatsUrl: "https://www." + formData.reservationSystem,
                                      // websiteUrl: "https://www." + formData.website,
                                      // seo: {
                                      //   description: formData.seoDescription,
                                      //   title: formData.seoTitle
                                      // },
                                    }
                                  }
                                })
                                businessUpdate({
                                  variables: {
                                    businesscategory: formData.businessCategory.id,
                                    deliverooUrl: formData.delivery ? "https://www." + formData.delivery : "",
                                    facebookUrl: formData.facebook ? "https://www.facebook.com/" + formData.facebook : "",
                                    id: maybe(() => data.store.business.id),
                                    instagramUrl: formData.instagram ? "https://www.instagram.com/" + formData.instagram : "",
                                    logo: formData.logo ? formData.logo : maybe(() => data.store.business.logo),
                                    twitterUrl: formData.twitter ? "https://www.twitter.com/" + formData.twitter : "",
                                    uberEatsUrl: formData.reservationSystem ? "https://www." + formData.reservationSystem : "",
                                    websiteUrl: formData.website ? "https://www." + formData.website : "",
                                  }
                                })
                              })
                              .catch(error => {
                                setlatLngLoading(false);
                                setlatLngError(error);
                              });
                          }}
                          products={maybe(() =>
                            category.productss.edges.map(edge => edge.node)
                          )}
                          saveButtonBarState={updateResult.status}
                          subcategories={maybe(() =>
                            category.productss.edges.map(edge => edge.node)
                          )}
                          subcategoryListToolbar={
                            <IconButton
                              color="primary"
                              onClick={() =>
                                openModal("delete-categories", {
                                  ids: listElements
                                })
                              }
                            >
                              <DeleteIcon />
                            </IconButton>
                          }
                          productListToolbar={
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
                                description="unassign product from store, button"
                              />
                            </Button>
                            // <IconButton
                            //   color="primary"
                            //   onClick={() =>
                            //     openModal("delete-products", {
                            //       ids: listElements
                            //     })
                            //   }
                            // >
                            //   <DeleteIcon />
                            // </IconButton>
                          }
                          isChecked={isSelected}
                          selected={listElements.length}
                          toggle={toggle}
                          toggleAll={toggleAll}
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
                          // products={maybe(() =>
                          //   product.business.businessStore.edges
                          //     .map(edge => edge.node)
                          // )}
                          products={maybe(() =>
                            result.data.search.edges
                              .map(edge => edge.node)
                              .filter(suggestedProduct => suggestedProduct.id)
                          )}
                        />
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
                            defaultMessage: "Unassign products from store",
                            description: "dialog title"
                          })}
                        >
                          <DialogContentText>
                            <FormattedMessage
                              defaultMessage="{counter,plural,one{Are you sure you want to unassign this product?} other{Are you sure you want to unassign {displayQuantity} products?}}"
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
                    )
                  }}
                </ProductUpdateOperations>
              )
              }
            </TypedProductUpdateMutation>
            <ActionDialog
              confirmButtonState={deleteResult.status}
              onClose={closeModal}
              onConfirm={() => deleteCategory({ variables: { id } })}
              open={params.action === "delete"}
              title={intl.formatMessage({
                defaultMessage: "Delete Store",
                description: "dialog title"
              })}
              variant="delete"
            >
              <DialogContentText>
                <FormattedMessage
                  defaultMessage="Are you sure you want to delete {categoryName}?"
                  values={{
                    categoryName: (
                      <strong>{maybe(() => data.store.name, "...")}</strong>
                    )
                  }}
                />
              </DialogContentText>
              {/* <DialogContentText>
                <FormattedMessage defaultMessage="Remember this will also delete all products assigned to this category." />
              </DialogContentText> */}
            </ActionDialog>
            <ActionDialog
              open={
                params.action === "delete-categories" &&
                maybe(() => params.ids.length > 0)
              }
              confirmButtonState={categoryBulkDeleteOpts.status}
              onClose={closeModal}
              onConfirm={() =>
                categoryBulkDelete({
                  variables: { ids: params.ids }
                }).then(() => refetch())
              }
              title={intl.formatMessage({
                defaultMessage: "Delete stores",
                description: "dialog title"
              })}
              variant="delete"
            >
              <DialogContentText>
                <FormattedMessage
                  defaultMessage="{counter,plural,one{Are you sure you want to delete this store?} other{Are you sure you want to delete {displayQuantity} stores?}}"
                  values={{
                    counter: maybe(() => params.ids.length),
                    displayQuantity: (
                      <strong>{maybe(() => params.ids.length)}</strong>
                    )
                  }}
                />
              </DialogContentText>
              {/* <DialogContentText>
                <FormattedMessage defaultMessage="Remember this will also delete all products assigned to this category." />
              </DialogContentText> */}
            </ActionDialog>
            <ActionDialog
              open={params.action === "delete-products"}
              confirmButtonState={productBulkDeleteOpts.status}
              onClose={closeModal}
              onConfirm={() =>
                productBulkDelete({
                  variables: { ids: params.ids }
                }).then(() => refetch())
              }
              title={intl.formatMessage({
                defaultMessage: "Delete products",
                description: "dialog title"
              })}
              variant="delete"
            >
              <DialogContentText>
                <FormattedMessage
                  defaultMessage="{counter,plural,one{Are you sure you want to delete this product?} other{Are you sure you want to delete {displayQuantity} products?}}"
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
        )}
      </TypedProductBulkDeleteMutation>
    </>
  );
};
export default CategoryDetails;
