import DialogContentText from "@material-ui/core/DialogContentText";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { geocodeByAddress, getLatLng } from "react-places-autocomplete";

import ActionDialog from "@saleor/components/ActionDialog";
import { WindowTitle } from "@saleor/components/WindowTitle";
import useBulkActions from "@saleor/hooks/useBulkActions";
import useNavigator from "@saleor/hooks/useNavigator";
import useNotifier from "@saleor/hooks/useNotifier";
import usePaginator, {
  createPaginationState
} from "@saleor/hooks/usePaginator";
// import useUser from "@saleor/hooks/useUser";
import { commonMessages } from "@saleor/intl";
import createDialogActionHandlers from "@saleor/utils/handlers/dialogActionHandlers";
import NotFoundPage from "@saleor/components/NotFoundPage";
import { PAGINATE_BY } from "../../config";
import { maybe } from "../../misc";
import { TypedProductBulkDeleteMutation } from "../../products/mutations";
import { productBulkDelete } from "../../products/types/productBulkDelete";
import { productAddUrl, productUrl } from "../../products/urls";
import { CategoryInput } from "../../types/globalTypes";
import {
  CategoryPageTab,
  CategoryUpdatePage
} from "../components/CategoryUpdatePage/CategoryUpdatePage";
import {
  useCategoryBulkDeleteMutation,
  useCategoryDeleteMutation,
  useCategoryUpdateMutation
} from "../mutations";
import { useCategoryDetailsQuery } from "../queries";
import { CategoryBulkDelete } from "../types/CategoryBulkDelete";
import { CategoryDelete } from "../types/CategoryDelete";
import { CategoryUpdate } from "../types/CategoryUpdate";
import {
  categoryAddUrl,
  categoryUrl,
  CategoryUrlQueryParams,
  CategoryUrlDialog,
  storesListUrl
} from "../urls";

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
    if (data.categoryDelete.errors.length === 0) {
      notify({
        text: intl.formatMessage({
          defaultMessage: "Category deleted"
        })
      });
      navigate(storesListUrl());
    }
  };

  const [deleteCategory, deleteResult] = useCategoryDeleteMutation({
    onCompleted: handleCategoryDelete
  });

  const handleCategoryUpdate = (data: CategoryUpdate) => {
    if (data.storeUpdate.errors.length > 0) {
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
    if (data.categoryBulkDelete.errors.length === 0) {
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
      categoryUrl(id, {
        activeTab: tabName
      })
    );
  };

  const [openModal, closeModal] = createDialogActionHandlers<
    CategoryUrlDialog,
    CategoryUrlQueryParams
  >(navigate, params => categoryUrl(id, params), params);

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
      ? maybe(() => data.store.storeProduct.pageInfo)
      : maybe(() => data.store.storeProduct.pageInfo),
    paginationState,
    params
  );

  return (
    <>
      <WindowTitle title={maybe(() => data.store.name)} />
      <TypedProductBulkDeleteMutation onCompleted={handleBulkProductDelete}>
        {(productBulkDelete, productBulkDeleteOpts) => (
          <>
            <CategoryUpdatePage
              changeTab={changeTab}
              currentTab={params.activeTab}
              category={maybe(() => data.store)}
              disabled={loading || latLngLoading}
              latlngError={latlngError}
              errors={updateResult.data?.storeUpdate.errors || []}
              onAddCategory={() => navigate(categoryAddUrl(id))}
              onAddProduct={() => navigate(productAddUrl)}
              onBack={() =>
                navigate(
                  maybe(
                    () => categoryUrl(data.store.parent.id),
                    storesListUrl()
                  )
                )
              }
              images={maybe(() => data.store.images)}
              onCategoryClick={id => () => navigate(categoryUrl(id))}
              onDelete={() => openModal("delete")}
              onImageDelete={() => () =>
                updateCategory({
                  variables: {
                    id,
                    input: {
                      business: category.business.id,
                      images: null,
                    }
                  }
                })
              }
              paramsProps={params}
              onImageUpload={file =>
                updateCategory({
                  variables: {
                    id,
                    input: {
                      business: category.business.id,
                      images: file,
                    }
                  }
                })
              }
              onNextPage={loadNextPage}
              onPreviousPage={loadPreviousPage}
              pageInfo={pageInfo}
              onProductClick={id => () => navigate(productUrl(id))}
              onSubmit={formData => {
                setlatLngError("");
                setlatLngLoading(true);
                geocodeByAddress(
                  formData.streetAddress +
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
                          },
                          // backgroundImageAlt: formData.backgroundImageAlt,
                          business: data.store.business.id,
                          category: formData.businessCategory,
                          deliverooUrl: "https://www." + formData.delivery,
                          description: formData.description,
                          facebookUrl: "https://www.facebook.com/" + formData.facebook,
                          instagramUrl: "https://www.instagram.com/" + formData.instagram,
                          logo: formData.logo,
                          name: formData.name,
                          phone: formData.phone,
                          tags: formData.tags,
                          twitterUrl: "https://www.twitter.com/" + formData.twitter,
                          uberEatsUrl: "https://www." + formData.reservationSystem,
                          websiteUrl: "https://www." + formData.website,
                          // seo: {
                          //   description: formData.seoDescription,
                          //   title: formData.seoTitle
                          // },
                        }
                      }
                    })
                  })
                  .catch(error => {
                    setlatLngLoading(false);
                    setlatLngError(error);
                  });
              }}
              products={maybe(() =>
                data.store.storeProduct.edges.map(edge => edge.node)
              )}
              saveButtonBarState={updateResult.status}
              subcategories={maybe(() =>
                data.store.storeProduct.edges.map(edge => edge.node)
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
                <IconButton
                  color="primary"
                  onClick={() =>
                    openModal("delete-products", {
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
            />
            <ActionDialog
              confirmButtonState={deleteResult.status}
              onClose={closeModal}
              onConfirm={() => deleteCategory({ variables: { id } })}
              open={params.action === "delete"}
              title={intl.formatMessage({
                defaultMessage: "Delete category",
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
              <DialogContentText>
                <FormattedMessage defaultMessage="Remember this will also delete all products assigned to this category." />
              </DialogContentText>
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
                defaultMessage: "Delete categories",
                description: "dialog title"
              })}
              variant="delete"
            >
              <DialogContentText>
                <FormattedMessage
                  defaultMessage="{counter,plural,one{Are you sure you want to delete this category?} other{Are you sure you want to delete {displayQuantity} categories?}}"
                  values={{
                    counter: maybe(() => params.ids.length),
                    displayQuantity: (
                      <strong>{maybe(() => params.ids.length)}</strong>
                    )
                  }}
                />
              </DialogContentText>
              <DialogContentText>
                <FormattedMessage defaultMessage="Remember this will also delete all products assigned to this category." />
              </DialogContentText>
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
