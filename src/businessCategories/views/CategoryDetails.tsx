import DialogContentText from "@material-ui/core/DialogContentText";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";

import ActionDialog from "@saleor/components/ActionDialog";
import { WindowTitle } from "@saleor/components/WindowTitle";
import useBulkActions from "@saleor/hooks/useBulkActions";
import useNavigator from "@saleor/hooks/useNavigator";
import useNotifier from "@saleor/hooks/useNotifier";
import usePaginator, {
  createPaginationState
} from "@saleor/hooks/usePaginator";
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
  categoryListUrl,
  categoryUrl,
  CategoryUrlQueryParams,
  CategoryUrlDialog
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
  const { isSelected, listElements, reset, toggle, toggleAll } = useBulkActions(
    params.ids
  );
  const intl = useIntl();
  const paginationState = createPaginationState(PAGINATE_BY, params);
  const { data, loading, refetch } = useCategoryDetailsQuery({
    displayLoader: true,
    variables: { ...paginationState, id }
  });

  const category = data?.businessCategoriesDetails;

  if (category === null) {
    return <NotFoundPage onBack={() => navigate(categoryListUrl())} />;
  }

  const handleCategoryDelete = (data: CategoryDelete) => {
    if (data.businesscategoryDelete.businessCategoryErrors.length === 0) {
      notify({
        text: intl.formatMessage({
          defaultMessage: "Business Category deleted"
        })
      });
      navigate(categoryListUrl());
    }
  };

  const [deleteCategory, deleteResult] = useCategoryDeleteMutation({
    onCompleted: handleCategoryDelete
  });

  const handleCategoryUpdate = (data: CategoryUpdate) => {
    if (data.businesscategoryUpdate.businesscategoryErrors.length > 0) {
      const backgroundImageError = data.businesscategoryUpdate.businesscategoryErrors.find(
        error => error.field === ("backgroundImage" as keyof CategoryInput)
      );
      if (backgroundImageError) {
        notify({
          text: intl.formatMessage(commonMessages.somethingWentWrong)
        });
      }
    }
  };

  const [businesscategoryUpdate, updateResult] = useCategoryUpdateMutation({
    onCompleted: handleCategoryUpdate
  });

  const handleBulkCategoryDelete = (data: CategoryBulkDelete) => {
    if (data.businesscategoryBulkdelete.businessCategoryErrors.length === 0) {
      closeModal();
      notify({
        text: intl.formatMessage(commonMessages.savedChanges)
      });
      reset();
    }
  };

  const [
    businesscategoryBulkdelete,
    businesscategoryBulkdeleteOpts
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
      ? maybe(() => data.businessCategoriesDetails.children.pageInfo)
      : maybe(() => data.businessCategoriesDetails.products.pageInfo),
    paginationState,
    params
  );

  return (
    <>
      <WindowTitle title={maybe(() => data.businessCategoriesDetails.name)} />
      <TypedProductBulkDeleteMutation onCompleted={handleBulkProductDelete}>
        {(productBulkDelete, productBulkDeleteOpts) => (
          <>
            <CategoryUpdatePage
              changeTab={changeTab}
              currentTab={params.activeTab}
              category={maybe(() => data.businessCategoriesDetails)}
              disabled={loading}
              errors={updateResult.data?.businesscategoryUpdate.businesscategoryErrors || []}
              onAddCategory={() => navigate(categoryAddUrl(id))}
              onAddProduct={() => navigate(productAddUrl)}
              onBack={() =>
                navigate(
                  maybe(
                    () => categoryListUrl()
                  )
                )
              }
              onCategoryClick={id => () => navigate(categoryUrl(id))}
              onDelete={() => openModal("delete")}
              onImageDelete={() =>
                businesscategoryUpdate({
                  variables: {
                    id,
                    input: {
                      backgroundImage: null,
                    }
                  }
                })
              }
              onImageUpload={file =>
                businesscategoryUpdate({
                  variables: {
                    id,
                    input: {
                      backgroundImage: file,
                    }
                  }
                })
              }
              onNextPage={loadNextPage}
              onPreviousPage={loadPreviousPage}
              pageInfo={pageInfo}
              onProductClick={id => () => navigate(productUrl(id))}
              onSubmit={formData =>
                businesscategoryUpdate({
                  variables: {
                    id,
                    input: {
                      backgroundImageAlt: formData.backgroundImageAlt,
                      description: JSON.stringify(formData.description),
                      name: formData.name,
                      seoDescription: formData.seoDescription,
                      seoTitle: formData.seoTitle
                    }
                  }
                })
              }
              products={maybe(() =>
                data.businessCategoriesDetails.products.edges.map(edge => edge.node)
              )}
              saveButtonBarState={updateResult.status}
              subcategories={maybe(() =>
                data.businessCategoriesDetails.children.edges.map(edge => edge.node)
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
                defaultMessage: "Delete Business Category",
                description: "dialog title"
              })}
              variant="delete"
            >
              <DialogContentText>
                <FormattedMessage
                  defaultMessage="Are you sure you want to delete {categoryName}?"
                  values={{
                    categoryName: (
                      <strong>{maybe(() => data.businessCategoriesDetails.name, "...")}</strong>
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
              confirmButtonState={businesscategoryBulkdeleteOpts.status}
              onClose={closeModal}
              onConfirm={() =>
                businesscategoryBulkdelete({
                  variables: { ids: params.ids }
                }).then(() => refetch())
              }
              title={intl.formatMessage({
                defaultMessage: "Delete Business Categories",
                description: "dialog title"
              })}
              variant="delete"
            >
              <DialogContentText>
                <FormattedMessage
                  defaultMessage="{counter,plural,one{Are you sure you want to delete this business category?} other{Are you sure you want to delete {displayQuantity} business categories?}}"
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
